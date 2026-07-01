const Order = require("../models/Order");
const Crop = require("../models/Crop");

// Buyer places an order
const placeOrder = async (req, res) => {
  try {
    const { cropId, quantity } = req.body;

    const crop = await Crop.findById(cropId);

    if (!crop) {
      return res.status(404).json({
        message: "Crop not found",
      });
    }
    // Farmer apni crop khud order nahi kar sakta
if (crop.farmer.toString() === req.user.id) {
  return res.status(400).json({
    message: "You cannot order your own crop",
  });
}

// Available quantity check
if (quantity > crop.quantity) {
  return res.status(400).json({
    message: "Requested quantity is not available",
  });
}

// Crop quantity update
crop.quantity = crop.quantity - quantity;
await crop.save();

    const totalPrice = quantity * crop.price;

    const order = await Order.create({
      buyer: req.user.id,
      farmer: crop.farmer,
      crop: crop._id,
      quantity,
      totalPrice,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Buyer Orders
const getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      buyer: req.user.id,
    })
      .populate("crop")
      .populate("farmer", "name email");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Farmer Orders
const getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      farmer: req.user.id,
    })
      .populate("crop")
      .populate("buyer", "name email");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.farmer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getBuyerOrders,
  getFarmerOrders,
  updateOrderStatus,
};