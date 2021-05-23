const express = require('express');

const BusinessController = require('./businessController');

const router = express.Router();

router
    .get('/orders/:orderID', BusinessController.getProfits)
    .post('/orders', OrdersController.placeOrder);

module.exports = router;