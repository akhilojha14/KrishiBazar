const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  addCrop,
  getAllCrops,
  getMyCrops,
  updateCrop,
  deleteCrop,
  searchCrop,
} = require("../controllers/cropController");


router.post("/add", protect, upload.single("image"), addCrop);
router.get("/search", searchCrop);
router.get("/", getAllCrops);
router.get("/my", protect, getMyCrops);
router.put("/:id",protect, updateCrop);
router.delete("/:id",protect, deleteCrop);

module.exports = router;