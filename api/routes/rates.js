const express = require('express');
const router = express.Router();
const RateController = require('../controllers/rate_controller');

// CRUD functions for the rates model
// Create
router.post('/rates', RateController.rate_create);
// Read
router.get('/rates', RateController.rate_read);
// Read by ID
router.get('/rates/:id', RateController.rate_read_id);
// Update by ID
router.put('/rates/:id', RateController.rate_update);
// Delete by ID
router.delete('/rates/:id', RateController.rate_delete);

// Convert function
router.get('/convert', RateController.convert);

module.exports = router;