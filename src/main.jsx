import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Auth from "./pages/Auth.jsx";
import Products from "./pages/Products.jsx";
import Orders from "./pages/Orders.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import NotFound from "./pages/NotFound.jsx";

const Root = () => (
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(<Root />, document.getElementById("root"));
