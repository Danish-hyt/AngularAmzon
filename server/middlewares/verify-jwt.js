const jwt = require('jsonwebtoken');
const config = require('../congif');

module.exports = function(req, res, next) {
    let token = req.headers['authorization'];
    console.log(req.headers);
    
    if(token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Failed to authenticate token'
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        res.status(403).json({
            success: false,
            message: 'No token provided'
        })
    }
}
