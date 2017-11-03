const User = require('../models/user');

module.exports = (router) => {

    router.post('/register', (req, res) => {

        if (!req.body.email){
            res.json({success: false, message: "You must provide an e-mail."});
        }else{
            if (!req.body.username) {
                res.json({success: false, message: "You must provide username."});
            } else {
                if (!req.body.password){
                    res.json({success: false, message: "You must provide password."});                    
                }
                else {
                    console.log(req.body);
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    user.save((err) =>{
                        if (err){
                            if (err.code === 11000){
                                res.json({success: false, message: "Username or E-mail is already exists"});   
                            }else {
                                if (err.errors){
                                    if (err.errors.email){
                                        res.json({success: false, message: err.errors.email.message });
                                    } else {
                                        if (err.errors.username){
                                            res.json({success: false, message: err.errors.username.message });
                                        } else {
                                            if (err.errors.password){
                                                res.json({success: false, message:  err.errors.password.message });
                                            } else {
                                                res.json({success: false, message:  err });
                                            }
                                        }
                                    }
                                } else {
                                    res.json({success: false, message: "Could not save user. Error:", err});    
                                }
                                
                            }
                            console.log("in if===="+err);
                        }else{
                            console.log("in else====");
                            res.json({success: true, message: "User saved."});
                        }
                        
                    });
                }
            }
        }
        
    });

    router.get('/checkEmail/:email', (req, res) => {
        if(!req.params.email){
            res.json({ success: false, message: 'E-mail was not provided'});
        } else {
            User.findOne({ email: req.params.email}, (err, user) => {
                if (err){
                    res.json({ success: false, message: err});
                } else {
                    if (user) {
                        res.json({ success: false, message: 'E-mail is already taken.'});
                    } else {
                        res.json({ success: true, message: 'E-mail is available'});                                                
                    }
                }
            });
        }
    });

    router.get('/checkUsername/:username', (req, res) => {
        if(!req.params.username){
            res.json({ success: false, message: 'Username was not provided'});
        } else {
            User.findOne({ username: req.params.username}, (err, user) => {
                if (err){
                    res.json({ success: false, message: err});
                } else {
                    if (user) {
                        res.json({ success: false, message: 'Username is already taken.'});
                    } else {
                        res.json({ success: true, message: 'Username is available'});                                                
                    }
                }
            });
        }
    });

    router.post('/login', (req, res) => {
        console.log("==username==="+req.body.username);
        console.log("==password==="+req.body.password);

        if (!req.body.username) {
            res.json({ success: false, message: 'No username was provided' });
        } else {
            if (!req.body.password) {
                res.json({ success: false, message: 'No password was provided' });
            } else {
                User.findOne({ username: req.body.username.toLowerCase()}, (err, user) => {
                    console.log("===user===="+JSON.stringify(user));
                    if (err){
                        res.json({ success: false, message: err});
                    } else {
                        if (!user) {
                            res.json({ success: false, message: 'Username not found.'});
                        } else {
                            console.log("===in else====");
                            const validPassword = user.comparePassword(req.body.password);
                            if (!validPassword){
                                res.json({ success: false, message: 'Password invalid.'});
                            } else {
                                res.json({ success: true, message: 'Success!'});
                            }
                        }
                    }
                });
                // res.send('test');
            }
        }

    });

    /* ========
  LOGIN ROUTE
  ======== */
//   router.post('/login', (req, res) => {
//     // Check if username was provided
//     if (!req.body.username) {
//       res.json({ success: false, message: 'No username was provided' }); // Return error
//     } else {
//       // Check if password was provided
//       if (!req.body.password) {
//         res.json({ success: false, message: 'No password was provided.' }); // Return error
//       } else {
//         // Check if username exists in database
//         User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
//           // Check if error was found
//           if (err) {
//             res.json({ success: false, message: err }); // Return error
//           } else {
//             // Check if username was found
//             if (!user) {
//               res.json({ success: false, message: 'Username not found.' }); // Return error
//             } else {
//               const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
//               // Check if password is a match
//               if (!validPassword) {
//                 res.json({ success: false, message: 'Password invalid' }); // Return error
//               } else {
//                 // const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
//                 // res.json({ success: true, message: 'Success!', token: token, user: { username: user.username } }); // Return success and token to frontend
//                 res.json({ success: true, message: 'Success!'});
//               }
//             }
//           }
//         });
//       }
//     }
//   });

    return router;
}