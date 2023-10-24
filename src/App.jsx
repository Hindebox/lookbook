import { Routes, Route, useLocation } from "react-router-dom";
import "./assets/style/global.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import MyAccount from "./pages/MyAccount";
import NotFound from "./pages/NotFound";
import useAuth from "./hooks/useAuth.js";

function App() {
  const location = useLocation();
  const isAuthenticated = useAuth();

  const privateRoutes = [
    { path: "/", element: <Home /> },
    { path: "/products", element: <Products /> },
    { path: "/orders", element: <Orders /> },
    { path: "/my-account", element: <MyAccount /> },
  ];

  const publicRoutes = [{ path: "/auth", element: <Auth /> }];

  const routes = isAuthenticated ? privateRoutes : publicRoutes;

  return (
    <div>
      {location.pathname !== "/auth" && isAuthenticated && <Navbar />}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.pathname !== "/auth" && isAuthenticated && <Footer />}
    </div>
  );
}

export default App;
