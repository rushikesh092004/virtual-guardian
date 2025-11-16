import "./../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {

  const navigate = useNavigate();

  // Store role selected by user
  const [role, setRole] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // Stop refresh

    if (!role) {
      alert("Please select your role");
      return;
    }

    // Role redirection
    if (role === "user") {
      navigate("/user/dashboard");
    } else if (role === "guardian") {
      navigate("/guardian/dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-sub">Login to continue</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          {/* Role Selection */}
          <select
            required
            className="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="guardian">Guardian</option>
          </select>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?  
          <Link to="/register" className="link"> Register</Link>
        </p>

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
