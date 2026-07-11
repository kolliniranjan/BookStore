const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {

    try {

        const { book, quantity } = req.body;

        const cart = await Cart.create({
            user: req.user._id,
            book,
            quantity
        });

        res.status(201).json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// Get User Cart
exports.getCart = async (req, res) => {
    try {

        const cart = await Cart.find({ user: req.user._id })
            .populate("book");

        res.json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
// Update Cart Quantity
exports.updateCart = async (req, res) => {

    try {

        const cart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                quantity: req.body.quantity
            },
            {
                new: true
            }
        );

        if (!cart) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        res.json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// Remove Cart Item
exports.deleteCart = async (req, res) => {

    try {

        const cart = await Cart.findByIdAndDelete(req.params.id);

        if (!cart) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        res.json({
            message: "Item removed from cart"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};