const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const models = require('../models')


function initialize (passport){
const authenticateUser = (email, password, done) => {
    // Sequelize querying the database while registering
    models.User.findAll({
        where: {
            email: email
        }
    }).then(function (userr) {
        if (userr[0] !== undefined) {
            const user = userr[0].dataValues
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    throw err
                }

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Password is not correct" });
                }
            })
        } else {
            return done(null, false, { message: "Email is  not registered" })
        }
        
    })
};

    


    passport.use(new localStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        }, 
        authenticateUser
    )
    );

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) =>{
        models.User.findAll({
            where: {
                id: id
            }
        }).then(function (userr) {
            return done(null, userr[0].dataValues);
        })
    })

}
module.exports = initialize