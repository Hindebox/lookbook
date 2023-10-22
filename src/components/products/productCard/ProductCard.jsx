import "react-slideshow-image/dist/styles.css";
import "../../../assets/style/products/product-card.scss";
import axios from "axios";
import { Slide } from "react-slideshow-image";
import OptionsBar from "./OptionsBar";
import { useGetUserID } from "../../../hooks/useGetUserID";

export default function ProductCard({
  title,
  id,
  description,
  photos,
  availability,
  ownProduct,
  onProdUpdate,
}) {
  //Slider properties
  const slideProperties = {
    transitionDuration: 500,
    indicators: true,
    arrows: true,
  };

  const handleOrder = async () => {
    try {
      //Get the product
      const product = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/${id}`
      );

      //Get product's owner ID
      const productOwnerID = product.data.user;
      //buyer
      const currentUserID = useGetUserID();

      //Does exist an order with these users involved?
      const orderUsers = await axios.get(
        `${process.env.REACT_APP_API_URL}/swapOrders/order?ownerUserID=${productOwnerID}&buyerUserID=${currentUserID}`
      );

      const existingOrder = orderUsers?.data?.[0];
      const existingProducts = existingOrder?.products;

      //Update existing products array

      let updatedProd;
      //If already exists a order with the previous users involve UPDATE the order adding this item,
      if (existingOrder && orderUsers.data > 0) {
        updatedProd = {
          products: [...existingProducts, id],
          users: [productOwnerID, currentUserID],
        };
      } else {
        updatedProd = {
          products: [id],
          users: [productOwnerID, currentUserID],
        };
      }

      //otherwise CREATE a new order
      const updatedOrder = await axios.post(
        `${process.env.REACT_APP_API_URL}/swapOrders?ownerUserID=${productOwnerID}&buyerUserID=${currentUserID}`,
        updatedProd
      );

      //Make product unavailable
      await axios.put(`${process.env.REACT_APP_API_URL}/products/${id}`, {
        ...product.data,
        availability: false,
      });

      onProdUpdate();

      return updatedOrder;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`productCard ${availability ? "available" : "nonAv"}`}>
      {!availability && <h3 className="sold">SOLD</h3>}

      <Slide {...slideProperties}>
        {photos.map((ph, index) => (
          <div className="each-slide" key={index}>
            <img src={ph} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slide>

      <h4>{title}</h4>
      <p>{description}</p>

      {ownProduct ? (
        <OptionsBar
          productId={id}
          onUpdate={onProdUpdate}
          originalTitle={title}
          originalDesc={description}
        />
      ) : (
        <button onClick={handleOrder}>{availability ? "order" : "sold"}</button>
      )}
    </div>
  );
}
