import { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import "../assets/style/auth/auth.scss";

export default function Auth() {
  const [isRegistred, setIsRegistred] = useState(true);
  const handleClick = () => {
    setIsRegistred(!isRegistred);
  };

  return (
    <div className="authComponent">
      {isRegistred ? <Login /> : <Register />}
      {isRegistred ? (
        <p>
          Don't have an account? <span onClick={handleClick}>Register</span>
        </p>
      ) : (
        <p>
          Do you have an account? <span onClick={handleClick}>Login</span>
        </p>
      )}
    </div>
  );
}
