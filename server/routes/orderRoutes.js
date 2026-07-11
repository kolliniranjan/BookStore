const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus
} = require("../controllers/orderController");

const admin = require("../middleware/adminMiddleware");

router.post("/", protect, placeOrder);
router.get("/", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;