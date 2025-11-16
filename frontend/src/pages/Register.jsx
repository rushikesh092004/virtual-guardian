import "./../styles/register.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  
  const navigate = useNavigate();

  // Function runs when clicking Register button
  const handleRegister = (e) => {
    e.preventDefault();  // stop page refresh
    navigate("/login");  // redirect to login page
  };

  return (
    <div className="register-container">
      <div className="register-card">
        
        <h2 className="register-title">Create Account</h2>
        <p className="register-sub">Join Virtual Guardian</p>

        <form className="register-form" onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />

          {/* Role Selection */}
          <select required className="role-select">
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="guardian">Guardian</option>
          </select>

          <button className="register-btn" type="submit">
            Register
          </button>
        </form>

        <p className="register-footer">
          Already have an account?
          <Link to="/login" className="link"> Login</Link>
        </p>

        <Link to="/" className="back-home">← Back to Home</Link>

      </div>
    </div>
  );
}
