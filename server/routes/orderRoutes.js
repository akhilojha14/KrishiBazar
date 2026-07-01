const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  placeOrder,
  getBuyerOrders,
  getFarmerOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", protect, placeOrder);
router.get("/buyer", protect, getBuyerOrders);
router.get("/farmer", protect, getFarmerOrders);
router.put("/:id", protect, updateOrderStatus);

module.exports = router;