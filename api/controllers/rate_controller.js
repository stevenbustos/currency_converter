const RateModel = require('../models/rates');

// Convert
// Params:
//  * String from_currency: ISO 4217 currency code
//  * String to_currency: ISO 4217 currency code
//  * Float money_amount: Amount of money A
convert = async function (req, res) {
    if (!req.query.from_currency || !req.query.to_currency || !req.query.money_amount){
        return res.status(400).send('Please send all the values');
    }

    // Some definitions
    var from = req.query.from_currency;
    var to = req.query.to_currency;
    var amount = req.query.money_amount;
    var in_eur = 0;
    var result = 0;

    // Get all the currency rates from the latest save in the DB
    var latest = await RateModel.findOne({}, {}, { sort: { '_id': -1 } }).exec();

    // Check if the from and to currency exist in the database
    if (!(from in latest.rates)) {
        // from check
        res.status(400).send(`The currency ${from} doesn't exist in the database`);
    } else if (!(to in latest.rates)) {
        // to check
        res.status(400).send(`The currency ${to} doesn't exist in the database`);
    } else {
        // Since the rates stored in the DB are in base of EUR
        // we need first to convert from the currency to EUR 

        // If from_currency is EUR don't convert to EUR
        if (from === latest.base) {
            in_eur = amount;
        } else {
            in_eur = (amount / latest.rates[from]);
            // res.send(`The amount in EUR is: ${in_eur}`);
        }

        // When we are already converted from the currency to EUR
        // we need to convert from EUR to to_currency
        if (to === 'EUR') {
            result = in_eur;
            res.status(200).send({
                msg: `The amount ${amount} from ${from} to ${to} is: ${Math.ceil(result)}`,
                data: {
                    result: Math.ceil(result)
                }
            });
        } else {
            result = (in_eur * latest.rates[to]);
            res.status(200).send({
                msg: `The amount ${amount} from ${from} to ${to} is: ${Math.ceil(result)}`,
                data: {
                    result: Math.ceil(result)
                }  
            });
        }
    }
}

// CRUD
// Create
rate_create = function (req, res) {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }
    let model = new RateModel(req.body);
    model.save().then(doc => {
        if (!doc || doc.length === 0) {
            return res.status(500).send(doc);
        }
        res.status(201).send(doc);
    }).catch(err => {
        res.status(500).json(err);
    });
}

// Read
rate_read = function (req, res) {
    let query = res.locals.query || {};
    RateModel.find(query, (e, result) => {
        if(e){
            res.status(500).send(e);
            console.log(e.message);
        } else {
            res.status(201).send(result);
        }
    });
}

// Read by ID
rate_read_id = function (req, res) {
    RateModel.findById(req.params.id, (e, result) => {
        if(e) {
            res.status(500).send(e);
            console.log(e.message);
        } else {
            res.status(201).send(result);
        }
    });
}

// Update by ID
rate_update = function (req, res) {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }
    RateModel.findByIdAndUpdate(req.params.id, req.body, (e) => {
        if (e) {
            res.status(500).send(e);
            console.log(e.message);
        } else {
            res.status(201).send("The rate has been updated");
        }
    });
}

// Delete by ID
rate_delete = function (req, res) {
    RateModel.findByIdAndRemove(req.params.id, (e) => {
        if (e) {
            res.status(500).send(e);
            console.log(e.message);
        } else {
            res.status(201).send("The rate has been deleted");
        }
    });
}

module.exports = {
    rate_create,
    rate_read,
    rate_read_id,
    rate_update,
    rate_delete,
    convert
}