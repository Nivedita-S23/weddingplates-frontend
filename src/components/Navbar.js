// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const role = localStorage.getItem("role");

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <img src="/logo.jpg" alt="pv_plate_decors" width="70" height="50" />
        <h2>PV_plate_decors</h2>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>
        {role !== "admin" && (
          <li>
            <Link to="/cart" onClick={closeMenu}>
              Cart
            </Link>
          </li>
        )}
        {role === "admin" ? (
          <>
            <li>
              <Link to="/admin/products" onClick={closeMenu}>
                Manage Products
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" onClick={closeMenu}>
                View Orders
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/checkout" onClick={closeMenu}>
              Checkout
            </Link>
          </li>
        )}

        {role ? (
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
