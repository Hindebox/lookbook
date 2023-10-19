import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NoProducts from "../components/products/NoProducts";
import OrderCard from "../components/orders/orderCard";
import { useGetUserID } from "../hooks/useGetUserID";
import SortingBar from "../components/orders/SortingBar";

export default function Orders() {
  const currentUserID = useGetUserID();
  const [orders, setOrders] = useState([]);
  const [sortFilter, setSortFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const fetchOrders = async () => {
    const ordersResponse = await axios.get(
      `http://localhost:2000/swapOrders/userOrders`,
      {
        params: {
          buyerUserID: currentUserID,
          filter: sortFilter,
          sortOrder: sortOrder,
        },
      }
    );

    const orders = ordersResponse.data;

    // Fetch the product owner, buyer, and product details
    const orderPromises = orders.map(async (order) => {
      const orderProductOwnerResponse = await axios.get(
        `http://localhost:2000/users/${order.users[0]}`
      );

      const orderProductBuyerResponse = await axios.get(
        `http://localhost:2000/users/${order.users[1]}`
      );

      const orderProductsListResponse = axios.get(
        `http://localhost:2000/swapOrders/order?ownerUserID=${orderProductOwnerResponse.data._id}&buyerUserID=${orderProductBuyerResponse.data._id}`
      );

      // Wait for all the promises to resolve
      const [orderProductOwner, orderProductBuyer, orderProductsList] =
        await Promise.all([
          orderProductOwnerResponse,
          orderProductBuyerResponse,
          orderProductsListResponse,
        ]);

      return {
        ...order,
        orderProductOwner: orderProductOwner.data,
        orderProductBuyer: orderProductBuyer.data,
        orderProductsList: orderProductsList.data,
      };
    });

    // Wait for all the order promises to resolve
    const updatedOrders = await Promise.all(orderPromises);
    setOrders(updatedOrders);
  };

  const handleSortChange = (filter, order) => {
    setSortFilter(filter);
    setSortOrder(order);
  };

  useEffect(() => {
    fetchOrders();
  }, [sortFilter, sortOrder]);

  console.log(orders);

  return (
    <div className="page-container">
      <h2>Your orders</h2>
      <p className="subheader">Here you can manage your orders</p>

      <SortingBar onSortChange={handleSortChange} />

      {orders && orders.length > 0 ? (
        <div className="orders-container">
          {orders.map((order) => (
            <OrderCard
              orderDetails={order}
              key={uuidv4()}
              refetchOrder={fetchOrders}
            />
          ))}
        </div>
      ) : (
        <NoProducts />
      )}
    </div>
  );
}
