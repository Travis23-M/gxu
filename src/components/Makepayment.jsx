import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Makepayment = () => {
  const { product, img_url } = useLocation().state || {};
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Load and parse "users" object from localStorage
    try {
      const stored = localStorage.getItem('users');
      const parsed = stored && stored !== 'undefined' ? JSON.parse(stored) : null;
      setUser(parsed);

      // Redirect to sign-in if user not logged in
      if (!parsed) {
        navigate('/signin', { replace: true });
      }
    } catch {
      localStorage.removeItem('users');
      <p>sign in first</p>
      navigate('/signin', { replace: true });
    }
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading('Please wait...');
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('phone', phone);
    data.append('amount', product.product_cost);

    try {
      const response = await axios.post(
        'https://travisjohn23.pythonanywhere.com/api/mpesa_payment',
        data
      );
      setLoading('');
      setSuccess(response.data.message || 'Payment successful');
    } catch (err) {
      setLoading('');
      setError(err.message || 'Payment failed');
    }
  };

  if (!product) {
    return <div className="text-center mt-5 text-danger">Invalid product data.</div>;
  }

  return (
    <div className="row mt-2 justify-content-center">
      <div className="col-md-5 text-center">
        <span className="text-info">{loading}</span>
        <span className="text-success">{success}</span>
        <span className="text-danger">{error}</span>

        <div className="card shadow">
          <img src={img_url + product.product_photo} alt={product.product_name} className="product_img" />
          <h3 className="mt-2">{product.product_name}</h3>
          <p className="text-muted">{product.product_description}</p>
          <b className="text-dark">{product.product_cost}</b>

          <div className="card-footer">
            {user ? (
              <form onSubmit={submit}>
                <label htmlFor="phone" className="fs-5">Phone to make payment</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="254..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <br />
                <button type="submit" className="btn btn-success">
                  Pay now
                </button>
              </form>
            ) : (
              <div className="alert alert-warning mt-3">
                You must be signed in to make a payment.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;
