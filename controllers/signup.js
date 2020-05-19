const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

signUpValidator = (email, password, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    
    let newUser = {        
        email,
        password: hash
    }
        // Sequelize querying the database while registering
    models.User.findAll({
        where: {
            email
        }      
    }).then(function(user) {
        if(user[0]){
            return res.json({message: "User already registered!"})
        }
        else if(!user[0]){
            models.User.create(newUser)
            .then(result => {
                jwt.sign({user : result}, 'secretkey', (err, token) => {
                    if (err) {
                        return err
                    }
                    return res.json({session: token})
                })
            })
        }
    })
}


module.exports = signUpValidator;