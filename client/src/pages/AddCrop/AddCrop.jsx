import { useState } from "react";
import api from "../../services/api";

function AddCrop() {
  const [formData, setFormData] = useState({
    cropName: "",
    quantity: "",
    price: "",
    location: "",
    contactNumber: "",
  });
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const form = new FormData();

    form.append("cropName", formData.cropName);
    form.append("quantity", formData.quantity);
    form.append("price", formData.price);
    form.append("location", formData.location);
    form.append("contactNumber", formData.contactNumber);

    if (image) {
      form.append("image", image);
    }

    const { data } = await api.post("/crops/add", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert(data.message);

    setFormData({
      cropName: "",
      quantity: "",
      price: "",
      location: "",
      contactNumber: "",
    });

    setImage(null);
  } catch (error) {
    alert(error.response?.data?.message || "Failed to add crop");
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[450px]"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          🌾 Add New Crop
        </h1>

        <input
          type="text"
          name="cropName"
          placeholder="Crop Name"
          value={formData.cropName}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity (Kg)"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-6"
        />
                 <input
  type="file"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
  className="w-full border p-3 rounded mb-6"
/>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
        >
 
          Add Crop
        </button>
      </form>
    </div>
  );
}

export default AddCrop;