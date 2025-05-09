import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Cartcomp = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart on component mount, only once
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Loaded cart from localStorage:", savedCart);  // Log loaded cart
    setCart(savedCart); // Set the cart state only once
  }, []); // Only run on mount

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      console.log("Saving cart to localStorage:", cart); // Log cart before saving
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]); // Runs only when cart state changes

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product_id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product_id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.product_id !== id);
    setCart(updatedCart);
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4 text-center text-dark">🛒 Your Shopping Cart</h3>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center">Your cart is empty.</div>
      ) : (
        <>
          <div className="row g-4">
            {cart.map((product) => (
              <div key={product.product_id} className="col-md-6 col-lg-4">
                <div className="card shadow-sm h-100 border-0">
                  <img
                    src={`https://travisjohn23.pythonanywhere.com/static/images/${product.product_photo}`}
                    alt={product.product_name}
                    className="card-img-top"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "200px",
                    }} // Inline styling for image
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark">{product.product_name}</h5>
                    <p className="card-text text-muted small">{product.product_description}</p>
                    <h6 className="card-subtitle mb-3 text-success">Ksh {product.product_cost}</h6>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => decreaseQuantity(product.product_id)}
                        >
                          −
                        </button>
                        <span className="mx-3">{product.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => increaseQuantity(product.product_id)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeItem(product.product_id)}
                      >
                        <i className="bi bi-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <button
              className="btn btn-success btn-lg px-4 py-2"
              onClick={() => navigate("/cartpayment")}
            >
              <i className="bi bi-credit-card-fill me-2"></i> Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cartcomp;
