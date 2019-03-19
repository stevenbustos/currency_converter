const axios = require('axios');
const fixer_url = process.env.FIXER_API_URL;
const RateModel = require('../models/rates');

const getRates = async function getRatesFixer() {
    console.log("asd");
    
    var wea = await RateModel.findOne({}, {}, { sort: { '_id': -1 } }).exec();
    console.log("wea"+wea._id);
    
    // axios.get(fixer_url).then(response => {
    //     console.log(response.data);
    // }).catch(error => {
    //     console.log(error);
    // });
}

module.exports = {
    getRates
}

