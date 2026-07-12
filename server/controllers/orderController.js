const Order = require("../models/Order");
const Cart = require("../models/Cart");
exports.placeOrder = async (req, res) => {

    try {

        const cartItems = await Cart.find({
            user: req.user._id
        }).populate("book");

        if (cartItems.length === 0) {

            return res.status(400).json({
                message: "Cart is empty"
            });

        }

        let total = 0;

        const items = cartItems.map(item => {

            total += item.book.price * item.quantity;

            return {
                book: item.book._id,
                quantity: item.quantity
            };

        });

        const order = await Order.create({

            user: req.user._id,

            items,

            totalPrice: total

        });

        await Cart.deleteMany({
            user: req.user._id
        });

        res.status(201).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
exports.getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user._id
        }).populate("items.book");

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
exports.getOrderById = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("items.book");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        res.json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
exports.updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.status = req.body.status;

        await order.save();

        res.json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
exports.getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.book", "title price");

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};