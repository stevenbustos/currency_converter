const express = require('express');

const app = express();

// Routes for the Rate Model
const rateRoute = require('./routes/exchangeRate');

const path = require('path');

app.use(rateRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Handler for 404 - not found
app.use((req, res, next) => {
    res.status(404).send('You are lost');
});

// Handler for 500 - Server error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html'));
});

// Database connection
const database = require('../api/database/connection');

// Port of the API
const PORT = process.env.API_PORT || 10000;
app.listen(PORT, () => console.log(`Currency converter server has started on port ${PORT}`));
