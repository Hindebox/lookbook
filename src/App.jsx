import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./assets/style/global.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import MyAccount from "./pages/MyAccount";
MyAccount;
import NotFound from "./pages/NotFound";
import useAuth from "./hooks/useAuth.js";

function App() {
  const location = useLocation();
  const isAuthenticated = useAuth(); //if user not logged in
  console.log(isAuthenticated);

  return (
    <div>
      {location.pathname !== "/auth" && isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/products"
          element={isAuthenticated ? <Products /> : <Navigate to="/auth" />}
        />
        <Route
          path="/orders"
          element={isAuthenticated ? <Orders /> : <Navigate to="/auth" />}
        />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/my-account"
          element={isAuthenticated ? <MyAccount /> : <Navigate to="/auth" />}
        />
        <Route
          path="*"
          element={isAuthenticated ? <NotFound /> : <Navigate to="/auth" />}
        />
      </Routes>
      {location.pathname !== "/auth" && isAuthenticated && <Footer />}
    </div>
  );
}

export default App;
