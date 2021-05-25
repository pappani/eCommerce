// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import asyncHandler from 'express-async-handler';   // to manage errors inside server.js
import Order from '../models/orderModel.js';

// create new order (private)
const newOrder = asyncHandler(async(req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('Nessun oggetto');
        return;
    } else {
        const order = new Order({ orderItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice })
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
})

// get order by id (private)
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Ordine non trovato');
    }
})

// pay order (private)
const payOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Ordine non trovato');
    }
})

// get my orders (private)
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
})

// get all orders (admin)
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ }).populate('user', 'id name');
    res.json(orders);
})

// deliver order (admin)
const deliverOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Ordine non trovato');
    }
})

export { newOrder, getOrderById, payOrder, getMyOrders, getOrders, deliverOrder };