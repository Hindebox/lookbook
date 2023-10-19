import "../../assets/style/products/no-products.scss";
import emptyWardrobe from "../../assets/images/empty.gif";

export default function NoProducts() {
  return (
    <div className="no-products">
      <img src={emptyWardrobe} alt="clothes hanger" />
      <p>No products yet</p>
    </div>
  );
}
