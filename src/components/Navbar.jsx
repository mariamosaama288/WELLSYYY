import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img
            src="https://i.ibb.co/M5RzbHZr/Screenshot-2025-10-02-224202.png"
            className="navbar-logo-img"
            alt="Logo"
          />
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/meals">Meals</Link>       
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;