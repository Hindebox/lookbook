import "../../assets/style/global.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/style/orders/order-card.scss";
import LoadingSpinner from "../helpers/LoadingSpinner";
import ItemsAccordion from "./ItemsAccordion";
import DeleteBtn from "../helpers/DeleteBtn";
import DescriptionAlerts from "../alert/Alert";
import TodayIcon from "@mui/icons-material/Today";
import { formatDate } from "../../hooks/formatDate";

export default function OrderCard({ orderDetails, refetchOrder }) {
  const [orderData, setOrderData] = useState({
    products: [],
    users: [],
    createdAt: "",
  });

  const [usersData, setUsersData] = useState({
    owner: {},
    buyer: {},
  });

  const [isLoading, setIsLoading] = useState(true);

  const [alertErrorMessage, setAlertErrorMessage] = useState(false);
  const [error, setError] = useState("");

  const fetchOrderData = async () => {
    setIsLoading(true);

    const products = await orderDetails.products.map((prod) => {
      const prodData = axios.get(`http://localhost:2000/products/${prod}`);

      return prodData;
    });

    const users = await orderDetails.users.map((user) => {
      const userData = axios.get(`http://localhost:2000/users/${user}`);

      return userData;
    });

    const productsData = await Promise.all(products);
    const usersData = await Promise.all(users);

    setUsersData({
      owner: usersData[0].data,
      buyer: usersData[1].data,
    });

    setOrderData({
      products: productsData,
      users: usersData,
      createdAt: formatDate(orderDetails.createdAt),
    });

    setIsLoading(false);
  };

  //DELETE order
  const handleOrdDelete = async (e) => {
    try {
      //make products in order available again
      const orderProds = orderDetails.orderProductsList.products.map(
        async (prod) =>
          await axios.put(`http://localhost:2000/products/${prod}`, {
            availability: true,
          })
      );

      await Promise.all(orderProds);

      //delete products in order
      await axios.delete(
        `http://localhost:2000/swapOrders/${orderDetails._id}`
      );

      refetchOrder();
    } catch (err) {
      setAlertErrorMessage(true);
      setError(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <div className="orderContainer">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="orderData">
            <div className="involvedUsers">
              <p>
                <b>Sender:</b> {usersData.owner.firstname}{" "}
                {usersData.owner.lastname}
              </p>
              <p>
                <b>Recipient:</b> {usersData.buyer.firstname}{" "}
                {usersData.buyer.lastname}
              </p>
            </div>
            <p>
              <TodayIcon />
              <b>Created at:</b> {orderData.createdAt}
            </p>
          </div>

          <ItemsAccordion
            orderID={orderDetails._id}
            products={orderData.products}
            orderUsers={[usersData.owner._id, usersData.buyer._id]}
            handleDel={refetchOrder}
            deleteOrder={handleOrdDelete}
          />

          <div className="deleteOrder">
            <DeleteBtn onClick={handleOrdDelete} deleteText="Delete order" />
          </div>

          {/* ERROR ALERT */}
          {alertErrorMessage && (
            <DescriptionAlerts
              alertType="error"
              message={error}
              alertAdvice="Try again"
            />
          )}
        </>
      )}
    </div>
  );
}
