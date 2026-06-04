import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-section">
          <h3>ONE COM 🛒</h3>
          <p>
            Best online shopping experience with fast delivery and secure payments.
          </p>
        </div>

        {/* MIDDLE */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@ONE.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Kerala, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ONE COME. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;