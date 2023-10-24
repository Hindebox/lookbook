import {
  ReactDOM,
  BrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App.jsx";
import Auth from "./pages/Auth.jsx";
import Products from "./pages/Products.jsx";
import Orders from "./pages/Orders.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = (
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
);

ReactDOM.render(
  <React.StrictMode>{router}</React.StrictMode>,
  document.getElementById("root")
);
