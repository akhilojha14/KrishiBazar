import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import BuyerDashboard from "./pages/BuyerDashboard/BuyerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard/FarmerDashboard";
import AddCrop from "./pages/AddCrop/AddCrop";
import Navbar from "./components/Navbar/Navbar";
import BuyerOrders from "./pages/BuyerOrders/BuyerOrders";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
      <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
      <Route path="/add-crop" element={<AddCrop />} />
      <Route path="/buyer-orders" element={<BuyerOrders />} />
    </Routes>
    </>
  );
}

export default App;