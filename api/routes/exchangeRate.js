const express = require('express');
const router = express.Router();

router.get('/rate', (req, res) => {
    res.send('You requested a rate');
});

router.get('/error', (req, res) => {
    throw new Error('Forced error.');
});

module.exports = router;