import { Link } from "react-router-dom";
import {
  useContext,
  useState,
  useEffect,
  useRef
} from "react";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar({ search, setSearch, setCategory }) {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef();

  const isAdmin = user?.email === "admin@gmail.com";

  const totalItems = cart.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");

    const isDark =
      document.body.classList.contains("dark");

    setDarkMode(isDark);

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <nav className="myntra-navbar">
      <div className="nav-top">
        {!isAdmin && (
          <div
            className="hamburger"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setProfileOpen(false);
            }}
          >
            ☰
          </div>
        )}

        <h2 className="logo">
          <Link
            to={isAdmin ? "/admin" : "/"}
            onClick={() => {
              setMenuOpen(false);
              setProfileOpen(false);
            }}
          >
            one<span>com</span>
          </Link>
        </h2>

        <div className="nav-right">
          {isAdmin && (
            <Link to="/admin" className="admin-link">
              Admin Panel
            </Link>
          )}

          <div className="profile-container" ref={profileRef}>
            <span
              className="profile-icon"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              👤
            </span>

            {profileOpen && (
              <div className="profile-dropdown">
                {!user ? (
                  <>
                    <div className="dropdown-header">
                      Hello User 👋
                    </div>

                    <Link
                      to="/login"
                      className="dropdown-item"
                      onClick={() => setProfileOpen(false)}
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="dropdown-item"
                      onClick={() => setProfileOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="dropdown-header">
                      Hi, {user.name || "User"}
                    </div>

                    {!isAdmin && (
                      <Link
                        to="/profile"
                        className="dropdown-item"
                        onClick={() => setProfileOpen(false)}
                      >
                        👤 My Profile
                      </Link>
                    )}

                    {!isAdmin && (
                      <Link
                        to="/orders"
                        className="dropdown-item"
                        onClick={() => setProfileOpen(false)}
                      >
                        📦 My Orders
                      </Link>
                    )}

                    <button
                      className="dropdown-logout"
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                        localStorage.removeItem("shipping");
                      }}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {!isAdmin && (
            <Link to="/cart" className="cart-link">
              🛒
              {totalItems > 0 && (
                <span className="cart-badge">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          <button
            className="dark-btn"
            onClick={toggleDarkMode}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {!isAdmin && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      )}

      {!isAdmin && (
        <div className="menu-bar">
          <div onClick={() => setCategory("Fashions")}>FASHIONS</div>
          <div onClick={() => setCategory("Mobile")}>MOBILES</div>
          <div onClick={() => setCategory("Beauty")}>BEAUTY</div>
          <div onClick={() => setCategory("Electronics")}>ELECTRONICS</div>
          <div onClick={() => setCategory("Sports")}>SPORTS</div>
        </div>
      )}

      {!isAdmin && (
        <div className={`side-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>All</Link>
          <Link to="/" onClick={() => { setCategory("Mobile"); setMenuOpen(false); }}>Mobiles</Link>
          <Link to="/" onClick={() => { setCategory("Fashions"); setMenuOpen(false); }}>Fashions</Link>
          <Link to="/" onClick={() => { setCategory("Beauty"); setMenuOpen(false); }}>Beauty</Link>
          <Link to="/" onClick={() => { setCategory("Sports"); setMenuOpen(false); }}>Sports</Link>
        </div>
      )}

      {menuOpen && !isAdmin && (
        <div
          className="overlay active"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;