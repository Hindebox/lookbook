import { Routes, Route, useLocation } from "react-router-dom";
import "./assets/style/global.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import useAuth from "./hooks/useAuth.js";

function App() {
  const location = useLocation();
  const isAuthenticated = useAuth();

  return <Home />;
}

export default App;
