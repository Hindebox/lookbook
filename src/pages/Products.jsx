import { useState, useEffect } from "react";
import NoProducts from "../components/products/NoProducts";
import axios from "axios";
import addProductIll from "../assets/images/add-product.jpeg";
import AddProduct from "../components/products/AddProduct";
import ProductCard from "../components/products/productCard/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="page-container">
      <div className="add-products">
        <div className="addFormContainer">
          <img src={addProductIll} alt="Add product illustration" />
          <div className="addForm">
            <h2>
              <span className="orange-add">Add</span> a product
            </h2>
            <AddProduct onProdSub={fetchProducts} />
          </div>
        </div>
      </div>
      <h2>Products</h2>
      {products.length > 0 ? (
        <div className="productsContainer">
          {products.map((prod) => (
            <ProductCard
              photos={prod.photos}
              title={prod.name}
              id={prod._id}
              key={prod._id}
              availability={prod.availability}
              description={prod.description}
              ownProduct={false}
              onProdUpdate={fetchProducts}
            />
          ))}
        </div>
      ) : (
        <NoProducts />
      )}
    </div>
  );
}
