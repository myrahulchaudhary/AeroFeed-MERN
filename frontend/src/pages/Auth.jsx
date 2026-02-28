import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/app.css";

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = isLogin
        ? "http://localhost:5000/auth/login"
        : "http://localhost:5000/auth/register";

      const res = await axios.post(url, form);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        navigate("/feed"); // ✅ redirect properly
      } else {
        alert("Registration successful! Please login.");
        setIsLogin(true);
      }

    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Create Account 🚀"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p
          className="switch"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
        >
          {isLogin
            ? "New user? Register"
            : "Already registered? Login"}
        </p>
      </div>
    </div>
  );
}