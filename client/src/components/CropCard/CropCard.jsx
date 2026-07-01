import api from "../../services/api";

function CropCard({ crop }) {
  const placeOrder = async () => {
    const quantity = prompt("Enter Quantity (Kg)");

    if (!quantity) return;

    try {
      const { data } = await api.post("/orders", {
        cropId: crop._id,
        quantity: Number(quantity),
      });

      alert(data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Order Failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
      {crop.image && (
  <img
    src={crop.image}
    alt={crop.cropName}
    className="w-full h-52 object-cover"
  />
)}

      <div className="bg-green-600 text-white p-4">
        <h2 className="text-2xl font-bold">{crop.cropName}</h2>
      </div>

      <div className="p-5 space-y-3">
        <p>
          <span className="font-semibold">📦 Quantity:</span>{" "}
          {crop.quantity} Kg
        </p>

        <p>
          <span className="font-semibold">💰 Price:</span>{" "}
          ₹{crop.price}/Kg
        </p>

        <p>
          <span className="font-semibold">📍 Location:</span>{" "}
          {crop.location}
        </p>

        <p>
          <span className="font-semibold">👨‍🌾 Farmer:</span>{" "}
          {crop.farmer?.name}
        </p>

        <button
          onClick={placeOrder}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}

export default CropCard;