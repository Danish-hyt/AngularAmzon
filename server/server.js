const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./congif');
const userRoutes = require('./routes/account');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(morgan('dev'));
app.use(cors());
app.use('/api/accounts', userRoutes);

app.listen(config.port, err => {
    console.log(`Server running on port ${config.port}`);
})
