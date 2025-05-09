import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post(
        "https://travisjohn23.pythonanywhere.com/api/signin",
        data
      );

      if (response.data.users) {
        // Store the full "users" object in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.users));
        console.log("User logged in:", response.data.users); // Debugging log
        window.dispatchEvent(new Event("user-change")); // Let other components know
        navigate("/");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred while signing in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center mt-4 text-center">
      <div className="col-md-5 card shadow p-4">
        <h2>Signin</h2>
        <form onSubmit={submit}>
          {loading && <span className="text-info">wait as we log you in...</span>}
          {error && <span className="text-danger">{error}</span>}

          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          <button type="submit" className="btn btn-dark w-100" disabled={loading}>
            {loading ? "Signing In..." : "Signin"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Signup</Link> to create one.
        </p>
      </div>
    </div>
  );
};

export default Signin;