const express = require('express');
const cors = require('cors')
const app = express();

// Enable cors
app.use(cors())

// Database connection
const database = require('./database/connection');

// Body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Fixer.io rates
const fixer = require('./helpers/fixerRates');
//fixer.getRates;
setInterval(fixer.getRates, 1000 * parseFloat(process.env.TIME_REQUEST));

// Port of the API
const PORT = process.env.API_PORT || 10000;
app.listen(PORT, () => console.log(`Currency converter server has started on port ${PORT}`));

// Routes for the Rate Model
const ratesRoute = require('./routes/rates');
app.use('/', ratesRoute);