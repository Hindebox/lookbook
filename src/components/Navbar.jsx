import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../assets/style/navbar.scss";
import LbLogo from "../assets/images/brand/lookbook-logo.svg";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [openedMenu, setOpenedMenu] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={LbLogo} className="nav-logo" alt="LookBook logo" />
      </Link>
      <ul
        className={`navmenu ${openedMenu ? "openedMenu" : "closedMenu"}`}
        onClick={(e) => setOpenedMenu(false)}
      >
        <CloseIcon className="closeMenuIcon" />
        <Link to="/products">
          <li>PRODUCTS</li>
        </Link>
        <Link to="/orders">
          <li>ORDERS</li>
        </Link>
        <Link to="/my-account">
          <li>MY ACCOUNT</li>
        </Link>
        {/* logout */}
        <li onClick={logout}>LOGOUT ➯</li>
      </ul>

      <DragHandleIcon
        className="openMenuIcon"
        onClick={(e) => setOpenedMenu(true)}
      />
    </div>
  );
}
