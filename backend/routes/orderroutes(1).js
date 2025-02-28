const express = require('express');
const { createorder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } = require('../controllers/ordercontroller');

const routes = express.Router();

// Order Routes
routes.post('/orders/:userid', createorder);  // Create Order
routes.get('/orders', getAllOrders);         // Get All Orders
routes.get('/orders/:orderId', getOrderById); // Get Order by ID
routes.put('/orders/:orderId', updateOrderStatus); // Update Order Status
routes.delete('/orders/:orderId', deleteOrder); // Delete Order

module.exports = routes;
