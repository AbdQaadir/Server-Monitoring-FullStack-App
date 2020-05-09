const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./model/User')
const initializePassport = require('./passportConfig');
require('dotenv').config();

// Initializing Passport
initializePassport(passport)


// SET MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index')
});

app.get('/users/register', checkAuthenticated, (req, res) => {
    res.render('register')
});
app.get('/users/login', checkAuthenticated, (req, res) => {
    res.render('login')
});

app.get('/users/dashboard', checkNotAuthenticated, (req, res) => {
    const username = req.user.name
    res.render('dashboard', {user: username })
});

app.get('/users/logout', (req,res) =>{
    req.logOut();
    req.flash('success_msg', "You have logged out");
    res.redirect('/users/login')
})

app.post('/users/register', async(req, res) => {
    const { name, email, password, password2} = req.body;

    let errors = [];

    // Validation Check
    if (!name || !email || !password || !password2){
        errors.push({message: 'Please enter all fields'});
    }
    if(password.length< 6){
        errors.push({message: "Password should not be less than 6 characters"})
    }
    if(password !== password2){
        errors.push({ message: "Password does not match" })
    }
    if(errors.length > 0){
        // If there is an error
        res.render('register', {errors})
    } else{
        // If there is no error: Form Validation has passed
        let hashedPassword = await bcrypt.hash(password, 10);
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }
        // Sequelize querying the database while registering
        User.findAll({
            where: {
                email: req.body.email
            }      
        }).then(function(user) {
            if(user[0]){
                errors.push({ message: "User already registered!" });
                res.render('register', { errors })
            }
            else if(!user[0]){
                User.create(newUser).then(() =>{
                    let payload = {
                        email: req.body.email
                    }
                    // For now our secret is fine, but for future projects should protect
                    // your secret and not expose it like this.
                    jwt.sign(payload, 'secret', { expiresIn: '1h' }, (err, token) => {
                        // Here we send the token to the client.
                        res.json({ session: token })
                        // console.log({ session: token })
                    })
                    req.flash('success_msg', 'You are now registered, please log in');
                    res.redirect('/users/login');
                })
                
            }
            
        })
    }
})

app.post('/users/login', passport.authenticate('local', { 
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
}))

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return res.redirect('/users/dashboard');
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/users/login');
}

// Format token


app.listen(PORT, () => console.log("Server running on port " + PORT))


module.exports = app;