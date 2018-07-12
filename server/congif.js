const mongoose = require('mongoose');

mongoose.connect('mongodb://@ds119110.mlab.com:19110/amazonclonedb',
{ user: 'danish', pass: 'Motoslim@4650', useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to DB');
    }
});

module.exports = {
    port: 4400,
    secret: 'danny21'
}