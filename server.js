const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const User = require('./dbConfig').User
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
    res.render('dashboard', {user: req.user.name})
});

app.get('/users/logout', (req,res) =>{
    req.logOut();
    req.flash('success_msg', "You have logged out");
    res.redirect('/users/login')
})

app.post('/users/register', async(req, res) => {
    let { name, email, password, password2} = req.body;
    console.log({ name, email, password, password2 });
    console.log(req.body);

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
        // If there is no error: Form Validation has passe
        let hashedPassword = await bcrypt.hash(password, 10);
        
        console.log(hashedPassword);
    
        // Sequelize querying the database while registering
        User.findAll({
            where: {
                email: req.body.email
            }      
        }).then(function(user) {
            if(user[0] !== undefined){
                errors.push({ message: "User already registered!" });
                res.render('register', { errors })
            }
            else if(user[0] === undefined){
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                })
                req.flash('success_msg', 'You are now registered, please log in');
                res.redirect('/users/login');
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



app.listen(PORT, () => console.log("Server running on port " + PORT))