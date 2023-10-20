import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "./Form";
import DescriptionAlerts from "../alert/Alert";

export default function Login() {
  const [_, setCookies] = useCookies(["access_token"]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alertErrorMessage, setAlertErrorMessage] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          email,
          password,
        }
      );

      //Store access token in localStorage
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);

      //Redirect to Homepage
      navigate("/");

      //Empty form's fields
      setFormData((prevData) => ({
        ...prevData,
        email,
        password,
      }));
    } catch (err) {
      setAlertErrorMessage(true);
      setError(err.response.data);
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <Form
        formTitle="Login"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isRegisterForm={false}
      />

      {alertErrorMessage && (
        <DescriptionAlerts
          alertType="error"
          message={error}
          alertAdvice="Try again"
        />
      )}
    </div>
  );
}
