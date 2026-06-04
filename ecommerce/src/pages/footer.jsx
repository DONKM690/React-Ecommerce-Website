function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-section">
          <h3>MyShop 🛒</h3>
          <p>
            Best online shopping experience with fast delivery and secure payments.
          </p>
        </div>

        {/* MIDDLE */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Orders</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@myshop.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Kerala, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;