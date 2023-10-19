import axios from "axios";
import ProductCard from "../components/products/productCard/ProductCard";
import NoProducts from "../components/products/NoProducts";
import DeleteBtn from "../components/helpers/DeleteBtn";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import "../assets/style/account/account.scss";
import "../assets/style/global.scss";
import Form from "../components/auth/Form";
import CloseIcon from "@mui/icons-material/Close";

export default function MyAccount() {
  const navigate = useNavigate();
  const userID = useGetUserID();
  //DELETE cookies and logout
  const [cookies, setCookies] = useCookies(["access_token"]);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    postedProducts: [],
  });

  //modify account open or closed
  const [openPopup, setOpenPopup] = useState(false);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  //FETCH products created by the current user
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/users/${userID}`);

      const { firstname, lastname, email, password, postedProducts } =
        await res.data;
      console.log(res.data);

      const productsPromises = postedProducts.map((prod) =>
        axios.get(`http://localhost:2000/products/${prod}`)
      );

      const products = await Promise.all(productsPromises);

      setUserData((prevdata) => ({
        ...prevdata,
        firstname,
        lastname,
        email,
        postedProducts: products.map((prod) => prod.data),
      }));

      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userID]);

  //ON SUBMIT
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:2000/users/${userID}`, userData);
    setOpenPopup(false);
  };

  //DELETE account
  const handleAccount = async (e) => {
    try {
      e.preventDefault();
      await axios.delete(`http://localhost:2000/users/${userID}`);
      logout();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="my-account page-container">
      <div className={`modifyUser ${!openPopup && "closed"}`}>
        <CloseIcon className="closeIcon" onClick={() => setOpenPopup(false)} />
        <Form
          formTitle="Modify"
          formData={userData}
          setFormData={setUserData}
          onSubmit={onSubmit}
          isRegisterForm={true}
        />
      </div>
      <h2>Hi {userData.firstname}</h2>

      <p className="subheader">Here you can manage your products</p>

      {userData.postedProducts.length > 0 ? (
        <div className="productsContainer">
          {userData.postedProducts.map((prod) => (
            <ProductCard
              photos={prod.photos}
              title={prod.name}
              id={prod._id}
              key={prod._id}
              description={prod.description}
              ownProduct={true}
              onProdUpdate={fetchData}
              availability={true}
            />
          ))}
        </div>
      ) : (
        <NoProducts />
      )}

      <div className="accountOptionBtns">
        <button className="modifyBtn" onClick={() => setOpenPopup(true)}>
          modify account
        </button>
        <DeleteBtn onClick={handleAccount} deleteText="Delete account" />
      </div>
    </div>
  );
}
