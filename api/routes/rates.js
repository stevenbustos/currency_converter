const express = require('express');
const router = express.Router();
const RateModel = require('../models/rates');

// Create the rates
router.post('/rates', (req, res) => {
    
    if(!req.body) {
        return res.status(400).send('Request body is missing');
    }

    let model = new RateModel(req.body);
    model.save().then(doc => {
        if(!doc || doc.length === 0) {
            return res.status(500).send(doc);
        }
        res.status(201).send(doc);
    }).catch(err => {
        res.status(500).json(err);
    });
});


module.exports = router;