const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
// const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./model/User')
// require('dotenv').config();



// SET MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/users/register', (req, res) => {
    res.render('register')
});
app.get('/users/login', (req, res) => {
    res.render('login')
});



app.post('/users/register',(req, res) => {
        
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    
    let newUser = {        
        email: req.body.email,
        password: hash
    }
        // Sequelize querying the database while registering
        User.findAll({
            where: {
                email: req.body.email
            }      
        }).then(function(user) {
            if(user[0]){
                res.json({message: "User already registered!"})
            }
            else if(!user[0]){
                User.create(newUser)
                .then(result => {
                    jwt.sign({user : result}, 'secretkey', (err, token) => {
                        if (err) {
                            return next(err)
                        }
                        res.json({session: token})
                        return;
                    })
                })
                
            }
            
        })
})

app.post('/users/login', (req, res) => {
    
	User.findAll({ where: { email: req.body.email }})
    .then(userr => {
        if (userr[0]) {
            const user = userr[0].dataValues
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    throw err
                }
                if (isMatch) {
                    jwt.sign({user : user}, 'secretkey', (err, token) => {
                        res.json({session: token})
                    })
                } else {
                    res.json({ message: "Password is not correct" });
                }
            })
        } 
        
        else {
            res.json({ message: "Email is  not registered" })
        }


    }) 

})



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


module.exports = app;