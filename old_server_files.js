// app.post('/users/login', passport.authenticate('local', {
//     successRedirect: '/users/dashboard',
//     failureRedirect: '/users/login',
//     failureFlash: true
// }));




// app.post('/users/login', passport.authenticate('local'), (req, res) => {
    
// 	models.User.findAll({
//         where: {
//             email: req.body.email
//         }
//     })
//     .then(userr => {
//         if (userr[0]) {
//             const user = userr[0].dataValues
//             bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
//                 if (err) {
//                     throw err
//                 }
//                 if (isMatch) {
//                     jwt.sign({user : user}, 'secretkey', (err, token) => {
//                         res.json({session: token})
//                     })
//                 } else {
//                     res.json({ message: "Password is not correct" });
//                 }
//             })
//         } 
//         else {
//             res.json({ message: "Email is  not registered" })
//         }
//     })
// })


