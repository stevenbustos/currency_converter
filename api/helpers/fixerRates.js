const axios = require('axios');
const fixer_url = process.env.FIXER_API_URL;
const RateModel = require('../models/rates');

const getRates = async function getRatesFixer() {
    // Find the latest rate in the DB
    var latest = await await RateModel.findOne({}, {}, { sort: { '_id': -1 } }).exec();

    if(!latest) {
        console.log("There is no rates in the DB");
        getFixerRates();
    } else {
        console.log("There is one rate in the DB");
        // Delete the latest rate
        RateModel.findByIdAndRemove(latest._id, (e) => {
            if (e) {
                console.log(e.message);
            } else {
                console.log("The latest rate has been deleted");
            }
        });
        getFixerRates();
    }   
}

function getFixerRates () {
    // Get the data from fixer.io and insert it in the DB
    axios.get(fixer_url).then(response => {
        console.log(response.data);
        var data = {};
        data["success"] = response.data.success;
        data["timestamp"] = response.data.timestamp;
        data["base"] = response.data.base;
        data["date"] = response.data.date;
        data["rates"] = response.data.rates;
        let model = new RateModel(data);
        model.save().then(doc => {
            if (!doc || doc.length === 0) {
                console.log("500 error");
            }
            console.log(doc);
        }).catch(err => {
            console.log(err);
        });
    }).catch(error => {
        console.log(error);
    });
}

module.exports = {
    getRates
}

