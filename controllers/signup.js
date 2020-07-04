const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");

signUpValidator = (name, email, password, res) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  let newUser = {
    name,
    email,
    password: hash,
  };
  // Sequelize querying the database while registering
  models.User.findAll({
    where: {
      email,
    },
  }).then(function (user) {
    if (user[0]) {
      res.json({ message: "User already registered!" });
    } else if (!user[0]) {
      models.User.create(newUser).then((result) => {
        console.log(result);
        jwt.sign({ user: result }, "secretkey", (err, token) => {
          if (err) {
            console.error(err.message);
          }
          res.json({ userToken: token });
        });
      });
    }
  });
};

module.exports = signUpValidator;
