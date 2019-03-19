const RateModel = require('../models/rates');

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
    rate_delete
}