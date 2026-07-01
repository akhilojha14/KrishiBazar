import { useEffect, useState } from "react";
import api from "../../services/api";

function BuyerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/buyer");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        📦 My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold">
            No Orders Yet
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                🌾 {order.crop?.cropName}
              </h2>

              <p className="mb-2">
                👨‍🌾 <b>Farmer:</b> {order.farmer?.name}
              </p>
              <p className="mb-2">
                 📞 <b>Contact:</b> {order.crop?.contactNumber}
              </p>

              <p className="mb-2">
                📦 <b>Quantity:</b> {order.quantity} Kg
              </p>

              <p className="mb-2">
                💰 <b>Total:</b> ₹{order.totalPrice}
              </p>

              <p className="mb-2">
                📅 <b>Date:</b>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

             <div
  className={`mt-4 text-center py-2 rounded-lg text-white font-bold ${
    order.status === "Pending"
      ? "bg-yellow-500"
      : order.status === "Accepted"
      ? "bg-green-600"
      : order.status === "Delivered"
      ? "bg-blue-600"
      : "bg-red-600"
  }`}
>
  {order.status === "Pending" && "🟡 Pending"}
  {order.status === "Accepted" && "🟢 Accepted"}
  {order.status === "Delivered" && "🚚 Delivered"}
  {order.status === "Rejected" && "🔴 Rejected"}
</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuyerOrders;