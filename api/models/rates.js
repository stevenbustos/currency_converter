const mongoose = require('mongoose');

let RateSchema = new mongoose.Schema({
    success: Boolean,
    timestamp: String,
    base: String,
    date: String,
    rates: Object
});

module.exports = mongoose.model('Rate', RateSchema);