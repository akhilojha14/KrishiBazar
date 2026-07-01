import { useEffect, useState } from "react";
import api from "../../services/api";

function BuyerDashboard() {
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
      alert("Failed to load orders");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 My Orders</h1>mkdir -p src/pages/BuyerOrders

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>{order.crop?.cropName}</h3>

            <p>Quantity: {order.quantity} kg</p>

            <p>Total Price: ₹{order.totalPrice}</p>

            <p>Status: {order.status}</p>

            <p>Farmer: {order.farmer?.name}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default BuyerDashboard;