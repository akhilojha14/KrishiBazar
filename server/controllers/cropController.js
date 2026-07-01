const Crop = require("../models/Crop");

const addCrop = async (req, res) => {
  try {
    const { cropName, quantity, price, location, contactNumber } = req.body;

    const crop = await Crop.create({
      farmer: req.user.id,
      cropName,
      quantity,
      price,
      location,
      contactNumber,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      message: "Crop Added Successfully",
      crop,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().populate("farmer", "name email");

    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyCrops = async (req, res) => {
  try {
    const crops = await Crop.find({
      farmer: req.user.id,
    });
  
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
 const searchCrop = async (req, res) => {
  try {
    const { name } = req.query;

    const crops = await Crop.find({
      cropName: { $regex: name, $options: "i" },
    }).populate("farmer", "name email");

    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        message: "Crop not found",
      });
    }

    if (crop.farmer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this crop",
      });
    }

    const updatedCrop = await Crop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Crop Updated Successfully",
      crop: updatedCrop,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        message: "Crop not found",
      });
    }

    if (crop.farmer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this crop",
      });
    }

    await Crop.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Crop Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addCrop,
  getAllCrops,
  getMyCrops,
  updateCrop,
  deleteCrop,
  searchCrop,
};