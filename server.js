process.env.NODE_ENV = 'test';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const models = require('./models');
const initializePassportLogin = require('./controllers/login');
const signUpValidate = require('./controllers/signup');

// require('dotenv').config();

// Initializing Passport
initializePassportLogin(passport)


// SET MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json())

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

app.get('/users/register', checkAuthenticated,  (req, res) => {
    res.render('register')
});
app.get('/users/login', checkAuthenticated, (req, res) => {
    res.render('login')
});



app.post('/users/register', (req, res) => {
    signUpValidate(req.body.email, req.body.password, res);
})



app.post('/users/login', passport.authenticate('local',{failureRedirect: '/users/login', failureFlash: true}),
  function(req, res) {
    jwt.sign({user : req.user}, 'secretkey', (err, token) => {
        res.json({session: token})
    });
  });


function checkAuthenticated(req, res, next) {
if(req.isAuthenticated()){
    return res.json({message: "You are already logged in"});
    // return res.redirect('/users/dashboard');
}
next();
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


module.exports = app;