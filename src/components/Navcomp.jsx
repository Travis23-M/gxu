import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navcomp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const loadUser = () => {
    try {
      const stored = localStorage.getItem("user");
      const parsed = stored && stored !== "undefined" ? JSON.parse(stored) : null;
      setUser(parsed);
      console.log("User loaded in Navcomp:", parsed); // Debugging log
    } catch {
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const loadCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalCount);
    } catch {
      setCartCount(0);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("user-change"));
    navigate("/signin");
  };

  useEffect(() => {
    loadUser();
    loadCart();

    const onUserChange = () => loadUser();
    const onCartChange = () => loadCart();

    window.addEventListener("user-change", onUserChange);
    window.addEventListener("cart-change", onCartChange);
    window.addEventListener("storage", onCartChange);

    return () => {
      window.removeEventListener("user-change", onUserChange);
      window.removeEventListener("cart-change", onCartChange);
      window.removeEventListener("storage", onCartChange);
    };
  }, []);

  const isLoggedIn = !!user;

  return (
    <section className="row">
      <div className="col-md-12">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark px-4">
          <Link to="/" className="navbar-brand text-light">
            <b>GxU</b>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarcollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarcollapse">
            <div className="navbar-nav me-auto">
              <Link to="/" className="nav-link text-light">
                <i className="bi bi-house-door-fill me-1"></i> HOME
              </Link>
              <Link to="/aboutus" className="nav-link text-light">
                <i className="bi bi-info-circle me-1"></i> ABOUT US
              </Link>
              <Link to="/customerservice" className="nav-link text-light">
                <i className="bi bi-telephone me-1"></i> CUSTOMER SERVICE
              </Link>
            </div>

            <div className="navbar-nav ms-auto align-items-center">
              {isLoggedIn ? (
                <>
                  <span className="nav-link text-light">
                    Welcome, {user?.username}
                  </span>
                  <button className="btn btn-dark" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-1"></i> LOG OUT
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="nav-link text-light">
                    <i className="bi bi-box-arrow-in-right me-1"></i> SIGN IN
                  </Link>
                  <Link to="/signup" className="nav-link text-light">
                    <i className="bi bi-person-plus-fill me-1"></i> SIGN UP
                  </Link>
                </>
              )}
              <Link to="/cart" className="nav-link position-relative text-light">
                <i className="bi bi-cart-fill me-1"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navcomp;
