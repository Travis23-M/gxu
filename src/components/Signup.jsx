import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [phone, SetPhone] = useState("");
  const [password, SetPassword] = useState("");
  const [loading, SetLoading] = useState("");
  const [success, SetSuccess] = useState("");
  const [error, SetError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};
    if (!username.trim()) errors.username = "Username is required";
    if (!email.includes("@")) errors.email = "Invalid email format";
    if (!/^\d{10}$/.test(phone)) errors.phone = "Phone must be exactly 10 digits";
    if (password.length < 8) errors.password = "Password must be at least 8 characters";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    SetError("");
    SetSuccess("");

    if (!validateFields()) return;

    SetLoading("Please wait as we upload your data");

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("phone", phone);
      data.append("password", password);

      const response = await axios.post("https://travisjohn23.pythonanywhere.com/api/signup", data);

      SetLoading("");
      SetSuccess(response.data.message);

      // Save user to localStorage if user is returned
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.dispatchEvent(new Event("user-change"));
        navigate("/");
      } else {
        // If user not returned, just redirect after 3 seconds
        setTimeout(() => navigate("/signin"), 3000);
      }

      SetUsername("");
      SetEmail("");
      SetPhone("");
      SetPassword("");
      setFieldErrors({});
    } catch (error) {
      SetLoading("");
      SetError(error.message || "An error occurred during signup.");
    }
  };

  return (
    <div className='row justify-content-center mt-4'>
      <div className='col-md-6 card shadow p-4 text-center'>
        <h2>Sign Up</h2>
        <form onSubmit={submit}>
          <span className='text-info'>{loading}</span>
          <span className='text-success'>{success}</span>
          <span className='text-danger'>{error}</span>

          <input
            type="text"
            placeholder='Enter username'
            className='form-control'
            onChange={(e) => SetUsername(e.target.value)}
            value={username}
          />
          {fieldErrors.username && <div className="text-danger small">{fieldErrors.username}</div>}
          <br />

          <input
            type="email"
            placeholder='Enter email'
            className='form-control'
            onChange={(e) => SetEmail(e.target.value)}
            value={email}
          />
          {fieldErrors.email && <div className="text-danger small">{fieldErrors.email}</div>}
          <br />

          <input
            type="tel"
            placeholder='Enter phone number'
            className='form-control'
            onChange={(e) => SetPhone(e.target.value)}
            value={phone}
          />
          {fieldErrors.phone && <div className="text-danger small">{fieldErrors.phone}</div>}
          <br />

          <input
            type="password"
            placeholder='Enter your password'
            className='form-control'
            onChange={(e) => SetPassword(e.target.value)}
            value={password}
          />
          {fieldErrors.password && <div className="text-danger small">{fieldErrors.password}</div>}
          <br />

          <button type='submit' className='btn btn-dark'>Sign up</button>
        </form>

        <p className='mt-3'>
          You have an account? <Link to={'/signin'}>Signin</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
