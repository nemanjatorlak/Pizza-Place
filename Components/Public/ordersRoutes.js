const express = require('express');

const OrdersController = require('./ordersController');

const router = express.Router();

router
    .get('/orders/:orderID', OrdersController.getOrder)
    .get('/orders', OrdersController.getOrders)
    .get('/orders/recent', OrdersController.getRecentOrders)
    .put('/orders/:orderID', OrdersController.completeOrder)
    .post('/orders', OrdersController.placeOrder);

module.exports = router;