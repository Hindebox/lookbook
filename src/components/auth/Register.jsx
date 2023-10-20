import { useState } from "react";
import axios from "axios";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import "../../assets/style/auth/auth.scss";
import DescriptionAlerts from "../alert/Alert";

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [alertErrorMessage, setAlertErrorMessage] = useState(false);
  const [alertSuccessMessage, setAlertSuccessMessage] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = formData;

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
        firstname,
        lastname,
        email,
        password,
      });

      setAlertSuccessMessage(true);

      //empty fields
      setFormData((prevData) => ({
        ...prevData,
        firstname,
        lastname,
        email,
        password,
      }));
    } catch (err) {
      setAlertErrorMessage(true);
      setError(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <Form
        formTitle="Register"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isRegisterForm={true}
      />

      {alertErrorMessage && (
        <DescriptionAlerts
          alertType="error"
          message={error}
          alertAdvice="Try again"
        />
      )}

      {alertSuccessMessage && (
        <DescriptionAlerts
          alertType="success"
          message="Succesfully registred"
          alertAdvice="Now login"
        />
      )}
    </div>
  );
}
