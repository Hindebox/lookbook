import { Routes, Route, useLocation } from "react-router-dom";
import "./assets/style/global.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import MyAccount from "./pages/MyAccount";
MyAccount;
import useAuth from "./hooks/useAuth.js";

function App() {
  const location = useLocation();

  //if user not logged in
  useAuth();

  return (
    <div>
      {location.pathname !== "/auth" && <Navbar />}
      <Routes>
        <Route path="/" element={location.pathname !== "/auth" && <Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes>
      {location.pathname !== "/auth" && <Footer />}
    </div>
  );
}

export default App;
