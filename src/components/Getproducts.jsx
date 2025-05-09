import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carouselcomp from "./Carouselcomp";

const Getproducts = () => {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();
  const img_url = "https://travisjohn23.pythonanywhere.com/static/images/";

  const getproducts = async () => {
    setLoading("Loading products...");
    try {
      const response = await axios.get("https://travisjohn23.pythonanywhere.com/api/get_product_details");
      setProduct(response.data);
      setLoading("");
      setError("");
    } catch (error) {
      setLoading("");
      setError("Could not fetch products.");
    }
  };

  useEffect(() => {
    getproducts();
  }, []);

  const filtered_products = product.filter((item) =>
    item.product_name.toLowerCase().includes(search.toLowerCase()) ||
    item.product_description.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.product_id === productToAdd.product_id
      );

      let updatedCart;
      if (existingProductIndex !== -1) {
        updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        updatedCart = [...prevCart, { ...productToAdd, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cart-change")); // ✅ Trigger update for others
      return updatedCart;
    });
  };

  const visible_products = filtered_products.slice(0, visibleCount);

  return (
    <div className="bg-light text-dark">
      <Carouselcomp />

      <div className="container py-4">
        <div className="row mb-4 justify-content-center">
          <div className="col-md-6">
            <input
              type="search"
              className="form-control rounded-pill shadow-sm"
              placeholder="Search product ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading && <p className="text-center text-muted">{loading}</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row">
          {visible_products.map((product) => (
            <div key={product.id} className="col-md-4 col-lg-3 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src={img_url + product.product_photo}
                  alt={product.product_name}
                  className="card-img-top product_img"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.product_name}</h5>
                  <p className="text-muted small">{product.product_description.slice(0, 80)}...</p>
                  <p className="text-dark">Ksh {product.product_cost}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn btn-success mt-2"
                  >
                    Add to Cart
                  </button>
                  <br /><br />
                  <button
                    className="btn btn-outline-success btn-sm rounded-pill"
                    onClick={() =>
                      navigate("/makepayment", { state: { product, img_url } })
                    }
                  >
                    Purchase Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filtered_products.length && (
          <div className="text-center mt-4">
            <button onClick={() => setVisibleCount(visibleCount + 12)} className="btn btn-success rounded-pill px-4">
            Click me to see more products...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Getproducts;
