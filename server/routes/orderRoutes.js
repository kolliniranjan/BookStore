const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders
} = require("../controllers/orderController");

const admin = require("../middleware/adminMiddleware");

router.post("/", protect, placeOrder);
router.get("/", protect, getMyOrders);
router.get("/admin/all", protect, admin, getAllOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;