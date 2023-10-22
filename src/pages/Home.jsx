import "../assets/style/home.scss";
import axios from "axios";
import NoProducts from "../components/products/NoProducts";
import ProductCard from "../components/products/productCard/ProductCard";
import { Link } from "react-router-dom";
import heroLeft from "../assets/images/hero-left.jpeg";
import heroRight from "../assets/images/hero-right.jpeg";
import brandVision from "../assets/images/brand-vision.jpeg";
import discoBall from "../assets/images/disco-ball.jpeg";
import { useEffect, useState } from "react";
import noFast from "../assets/images/no-fastfashion.jpeg";
import DescriptionAlerts from "../components/alert/Alert";

export default function Home() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [products, setProducts] = useState([]);
  const [alertErrorMessage, setAlertErrorMessage] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products`, {
        params: { limit: 8 },
      });
      setProducts(response.data);
      console.log(apiUrl);
    } catch (err) {
      setAlertErrorMessage(true);
      setError(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <section className="home-hero">
        <div className="hero-left">
          <img src={heroLeft} alt="" />
          <h1>
            Re
            <br />
            wearing
          </h1>
        </div>
        <div className="hero-right">
          <Link to="/products">
            <h3>See products ↬</h3>
          </Link>
          <img src={heroRight} alt="" />
          <h1>
            is
            <br />
            caring
          </h1>
        </div>
      </section>
      <section className="vision">
        <img src={brandVision} className="brand-vision" alt="" />
        <div>
          <h2>
            Give a <br />
            <span>SECOND</span>hand <br />
            chance
          </h2>
          <p>WHY choose SECONDhand?</p>
          <ul>
            <li>Keep clothes out of landfills</li>
            <li>Reduce the demand for new</li>
            <li>Find pieces more affordably</li>
            <li>Have a story to share!</li>
            <li>Find unique pieces</li>
            <li>Support a circular economy</li>
          </ul>
        </div>
      </section>
      <section className="products">
        <div className="prod-header">
          <div>
            <h2>Products</h2>
            <Link to="/products">
              <h3>See all ↬</h3>
            </Link>
          </div>
          <img src={discoBall} className="disco" alt="" />
        </div>
        {products.length > 0 ? (
          <div className="products-grid">
            {products.map((prod) => (
              <ProductCard
                photos={prod.photos}
                title={prod.name}
                id={prod._id}
                key={prod._id}
                description={prod.description}
                ownProduct={false}
                availability={prod.availability}
                onProdUpdate={fetchProducts}
              />
            ))}
          </div>
        ) : (
          <NoProducts />
        )}
      </section>
      <section className="no-fastfashion">
        <h1>SAY NO</h1>
        <h2>to fast fashion</h2>
        <div className="reasons-container">
          <img src={noFast} alt="Fast fashion image" />
          <div className="reasons">
            <div className="reason">
              <h4>8%</h4>
              <p>
                Global <span className="highlight">carbon emissions</span>{" "}
                caused by fashion industry
              </p>
            </div>
            <div className="reason">
              <h4>60%</h4>
              <p>
                Children <span className="highlight">under 18</span> working in
                global fashion industry
              </p>
            </div>
            <div className="reason">
              <h4>200 years</h4>
              <p>
                <span className="highlight">Time</span> it takes for polyester,
                nylon, and spandex to break down
              </p>
            </div>
            <div className="reason">
              <h4>80 billion</h4>
              <p>
                Pieces of <span className="highlight">new clothing</span> made
                each years
              </p>
            </div>
            <div className="reason">
              <h4>7</h4>
              <p>
                Average amount od times clothes are
                <span className="highlight"> worn before throwing </span> away
              </p>
            </div>
            <div className="reason">
              <h4>50%</h4>
              <p>
                Workers in fashion industry that
                <span className="highlight"> aren't paid </span> the minimum
                wage
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ERROR ALERT */}
      {alertErrorMessage && (
        <DescriptionAlerts
          alertType="error"
          message={error}
          alertAdvice="Try again"
        />
      )}
    </>
  );
}
