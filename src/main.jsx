import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Auth from "./pages/Auth.jsx";
import Products from "./pages/Products.jsx";
import Orders from "./pages/Orders.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = BrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  { path: "/auth", element: <Auth /> },
  { path: "/products", element: <Products /> },
  { path: "/orders", element: <Orders /> },
  { path: "/my-account", element: <MyAccount /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
