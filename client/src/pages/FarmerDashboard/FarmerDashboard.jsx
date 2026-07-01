import { useEffect, useState } from "react";
import api from "../../services/api";

function FarmerDashboard() {
  const [myCrops, setMyCrops] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchMyCrops();
    fetchOrders();
  }, []);

  const fetchMyCrops = async () => {
  try {
    const { data } = await api.get("/crops/my");
    console.log(data);
    setMyCrops(data);
  } catch (error) {
    console.log(error);
  }
};

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/farmer");

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, {
        status,
      });

      alert("Order Updated Successfully");

      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };
  
  const editCrop = async (crop) => {
  const price = prompt("Enter New Price", crop.price);

  if (!price) return;

  const quantity = prompt("Enter New Quantity", crop.quantity);

  if (!quantity) return;

  const location = prompt("Enter New Location", crop.location);

  if (!location) return;

  try {
    const { data } = await api.put(`/crops/${crop._id}`, {
      price,
      quantity,
      location,
    });

    alert(data.message);

    fetchMyCrops();
  } catch (error) {
    alert(error.response?.data?.message || "Update Failed");
  }
};
const deleteCrop = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this crop?"
  );

  if (!confirmDelete) return;

  try {
    const { data } = await api.delete(`/crops/${id}`);

    alert(data.message);

    fetchMyCrops();
  } catch (error) {
    alert(error.response?.data?.message || "Delete Failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
  👨‍🌾 Farmer Dashboard
</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">

  <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold">🌾 Total Crops</h3>
    <p className="text-4xl font-bold mt-2">
      {myCrops.length}
    </p>
  </div>

  <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold">📦 Total Orders</h3>
    <p className="text-4xl font-bold mt-2">
      {orders.length}
    </p>
  </div>

  <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold">💰 Revenue</h3>
    <p className="text-4xl font-bold mt-2">
      ₹{orders.reduce((sum, order) => sum + order.totalPrice, 0)}
    </p>
  </div>

</div>

      <hr />

      <h2>🌾 My Crops</h2>

      {myCrops.length === 0 ? (
        <p>No Crops Added</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
  {myCrops.map((crop) => (
    <div
      key={crop._id}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
    >
      <h3 className="text-2xl font-bold text-green-700">
        🌾 {crop.cropName}
      </h3>

      <p className="mt-3">
        <span className="font-semibold">💰 Price:</span> ₹{crop.price}
      </p>

      <p>
        <span className="font-semibold">📦 Quantity:</span> {crop.quantity} Kg
      </p>

      <p>
        <span className="font-semibold">📍 Location:</span> {crop.location}
      </p>

      <div className="flex gap-3 mt-5">
        <button
  onClick={() => editCrop(crop)}
  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
>
  ✏️ Edit
</button>

        <button
  onClick={() => deleteCrop(crop._id)}
  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
>
  Delete
</button>
      </div>
    </div>
  ))}
</div>
      )}

      <hr />

      <h2>📦 Incoming Orders</h2>

      {orders.length === 0 ? (
        <p>No Orders</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid green",
              padding: "15px",
              margin: "10px",
              borderRadius: "10px",
            }}
          >
            <h3>{order.crop?.cropName}</h3>

            <p>Buyer : {order.buyer?.name}</p>

            <p>Quantity : {order.quantity}</p>

            <p>Total : ₹{order.totalPrice}</p>

            <p>Status : {order.status}</p>

            <button
              onClick={() => updateStatus(order._id, "Accepted")}
            >
              Accept
            </button>

            <button
              onClick={() => updateStatus(order._id, "Rejected")}
              style={{ marginLeft: "10px" }}
            >
              Reject
             
              <button
  onClick={() => updateStatus(order._id, "Delivered")}
  style={{
    marginLeft: "10px",
    backgroundColor: "green",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
  }}
>
  Delivered
</button>
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default FarmerDashboard;