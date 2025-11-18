import "./../styles/register.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/login");   // Go to login after register
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

          <select required className="role-select">
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="guardian">Guardian</option>
          </select>

          <button className="register-btn">Register</button>
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
