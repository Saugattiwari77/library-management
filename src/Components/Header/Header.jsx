import React from "react";
import "./Header.css";
import { Book } from "lucide-react";
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="Container">
        <nav className="navbar">
          <div className="navbar-brand">
            <Book className="book-icon" size={24} />
            <h1>Pathsala Nepal</h1>
          </div>
          <div className="navbar-links">
            <a href="/" className="nav-link active">
              Home
            </a>
            <a href="/contact" className="nav-link">
              Contact us
            </a>
            <a href="/report" className="nav-link">
              Reports
            </a>
            <a href="/about" className="nav-link">
              About us
            </a>
            {/* <a href="/reports" className="nav-link">
              Reports
            </a> */}
          </div>
          <div className="navbar-auth">
            <Link to="/cart">
              <button className="btn-admin">Cart</button>
            </Link>
            <Link to="/wishlist">
              <button className="btn-admin">Wishlist</button>
            </Link>
            <Link to="/login">
              <button className="btn-login">Log in</button>
            </Link>
            <Link to="/settings">
              <button className="btn-login">Settings</button>
            </Link>
            <Link to="/logout">
              <button className="btn-login">Log out</button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
