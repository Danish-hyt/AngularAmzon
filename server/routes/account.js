const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const config = require('../congif');
const checkJwt = require('../middlewares/verify-jwt')


router.post('/signup', (req, res, next) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();
    user.isSeller = req.body.isSeller;
    
    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (existingUser) {
            res.json({
                success: true,
                message: 'Account with that email already exists'
            });
        } else {
            user.save();

            let token = jwt.sign({
                user: user
            }, config.secret, {
                expiresIn: '7d'
            });

            res.json({
                success: true,
                message: 'Your token',
                token: token
            });
        }
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed, User do not exist'
            });
        } else if (user) {
            let validPass = user.comparePassword(req.body.password);
            if(!validPass) {
                res.json({
                    success: false,
                    message: 'Authentication failed, Wrong Password'
                })
            } else {
                let token = jwt.sign({
                    user: user
                }, config.secret, {
                    expiresIn: '7d'
                });
    
                res.json({
                    success: true,
                    message: 'Your token',
                    token: token
                });
            }
        }
    });
});


router.route('/profile')
    .get(checkJwt, (req, res, next) => {
        User.findOne({ _id: req.decoded.user._id }, (err, user) => {
            res.json({
                success: true,
                user: user,
                message: 'Successful!'
            })
        })
    })
    .post()
 
module.exports = router;

