import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPayment = () => {
  const [cart, setCart] = useState([]);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const img_url = "https://travisjohn23.pythonanywhere.com/static/images/";

  // Check if user is signed in
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
      if (!user) {
        alert("Please sign in to proceed with payment.");
        navigate("/signin");
      }
    } catch {
      alert("Session error. Please sign in again.");
      navigate("/signin");
    }
  }, [navigate]);

  // Load cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const totalAmount = cart.reduce(
    (total, item) => total + item.product_cost * item.quantity,
    0
  );

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (value.startsWith("07")) value = "254" + value.slice(1);
    if (value.startsWith("+254")) value = "254" + value.slice(4);
    setPhone(value);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!phone || cart.length === 0) return;

    setLoading("Processing payment...");
    setError("");
    setSuccess("");

    const data = new FormData();
    data.append("phone", phone);
    data.append("amount", totalAmount);

    try {
      const response = await axios.post(
        "https://travisjohn23.pythonanywhere.com/api/mpesa_payment",
        data
      );
      setLoading("");
      setSuccess(response.data.message);
      localStorage.removeItem("cart");
      setCart([]);
    } catch (err) {
      setLoading("");
      setError("Payment failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5 bg-light py-5 rounded">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-success text-white text-center py-4">
              <h3>Cart Payment</h3>
            </div>
            <div className="card-body p-4">
              {cart.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
              ) : (
                <>
                  <div className="cart-items-list">
                    {cart.map((item) => (
                      <div key={item.product_id} className="cart-item d-flex mb-4 align-items-center">
                        <img
                          src={img_url + item.product_photo}
                          alt={item.product_name}
                          className="img-fluid rounded"
                          style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "20px" }}
                        />
                        <div className="flex-grow-1">
                          <h5>{item.product_name}</h5>
                          <p>{item.product_description}</p>
                          <small>
                            {item.quantity} × Ksh {item.product_cost} ={" "}
                            <strong>Ksh {item.product_cost * item.quantity}</strong>
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="my-4" />
                  <h4 className="text-dark">Total: Ksh {totalAmount}</h4>

                  {loading && <div className="text-info mt-3">{loading}</div>}
                  {success && <div className="text-success mt-3">{success}</div>}
                  {error && <div className="text-danger mt-3">{error}</div>}

                  <form onSubmit={handlePayment} className="mt-4">
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label fs-5">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="254..."
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-success w-100 py-3 mt-3 rounded-pill">
                      Pay Now
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPayment;
