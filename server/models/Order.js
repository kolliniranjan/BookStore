const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            },

            quantity: Number
        }
    ],

    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Confirmed",
            "Packed",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],
        default: "Pending"
    }

},
{
    timestamps: true
}
);

module.exports = mongoose.model("Order", orderSchema);