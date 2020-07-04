process.env.NODE_ENV = "test";
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("./models");
const cors = require("cors");
const initializePassportLogin = require("./controllers/login");
// const signUpValidate = require("./controllers/signup");

// require('dotenv').config();

// Initializing Passport
initializePassportLogin(passport);

// SET MIDDLEWARE
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// app.get("/", checkAuthenticated, (req, res) => {
//   res.render("index");
// });

app.get("/users/register", checkAuthenticated, (req, res) => {
  res.render("register");
});
// app.get("/users/login", checkAuthenticated, (req, res) => {
//   res.render("login");
// });

app.post("/users/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name)
    res.json({ message: "Fields cannot be blank" });

  // Sequelize querying the database while registering
  models.User.findAll({
    where: {
      email,
    },
  })
    .then((user) => {
      if (!user[0]) {
        bcrypt.hash(password, 10, (err, hash) => {
          let newUser = {
            name,
            email,
            password: hash,
          };
          models.User.create(newUser)
            .then((user) => {
              res.json({ status: user.name + "registered" });
            })
            .catch((err) => {
              res.send(err.message);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("error:" + err.message);
    });
});

app.post("/users/login", function (req, res) {
  console.log(req.body.email);
  passport.authenticate("local", function (err, user) {
    if (err) {
      return err;
    }
    if (!user) {
      return res.json({ error: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) {
        throw err;
      }
      console.log(user);
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(user, "secretkey", {
          expiresIn: 1440,
        });
        res.send({ userToken: token });
      } else {
        return res.json({ message: "Password not correct" });
      }
    });
  })(req, res);
});

// app.post(
//   "/users/login",
//   passport.authenticate("local", {
//     failureRedirect: "/users/login",
//     failureFlash: true,
//   }),
//   (req, res) => {
//     jwt.sign({ user: req.user }, "secretkey", (err, token) => {
//       res.send(token);
//     });
//   }
// );

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.json({ message: "You are already logged in" });
    // return res.redirect('/users/dashboard');
  }
  next();
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
