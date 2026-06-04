import {
  useState,
  useContext,
  useEffect
} from "react";

import { AuthContext }
from "../context/AuthContext";

import {
  useNavigate,
  Link,
  useLocation
} from "react-router-dom";

function Login() {

  const [loginData,
    setLoginData] =
    useState({

      username: "",
      password: ""

    });

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const { login } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  const location =
    useLocation();

  // REDIRECT
  const from =
    location.state?.from || "/";

  // RESET FORM
  useEffect(() => {

    setLoginData({

      username: "",
      password: ""

    });

  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {

    setLoginData({

      ...loginData,

      [e.target.name]:
        e.target.value

    });

    setError("");
  };

  // LOGIN
  const handleLogin = () => {

    // LOAD USERS
    const savedUsers =

      JSON.parse(
        localStorage.getItem(
          "registeredUsers"
        )
      ) || [];

    const username =
      loginData.username.trim();

    const password =
      loginData.password.trim();

    // ADMIN LOGIN
    if (

      username ===
      "admin@gmail.com"

      &&

      password ===
      "admin123"

    ) {

      const adminUser = {

        name: "Admin",

        email:
          "admin@gmail.com"

      };

      login(adminUser);

      setLoginData({

        username: "",
        password: ""

      });

      navigate(
        "/admin",
        { replace: true }
      );

      return;
    }

    // NO USERS
    if (savedUsers.length === 0) {

      setError(
        "No account found. Please sign up ❌"
      );

      return;
    }

    // FIND USER
    const foundUser =
      savedUsers.find(

        (u) =>

          (

            username === u.email ||

            username === u.mobile ||

            username === u.name

          )

          &&

          password === u.password

      );

    // LOGIN SUCCESS
    if (foundUser) {

      login(foundUser);

      setLoginData({

        username: "",
        password: ""

      });

      navigate(from, {
        replace: true
      });

    } else {

      setError(
        "Invalid username or password ❌"
      );

    }

  };

  // ENTER KEY LOGIN
  const handleKeyPress = (e) => {

    if (e.key === "Enter") {

      handleLogin();

    }

  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h3>
          Login
        </h3>

        {error && (

          <div className="error-box">
            {error}
          </div>

        )}

        {/* USERNAME */}
        <div className="input-box">

          <span>👤</span>

          <input
            type="text"
            name="username"
            placeholder="Email / Mobile / Username"
            value={loginData.username}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            autoComplete="off"
          />

        </div>

        {/* PASSWORD */}
        <div className="input-box">

          <span>🔒</span>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            autoComplete="new-password"
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() =>

              setShowPassword(
                !showPassword
              )

            }
          >

            {showPassword
              ? "🙈"
              : "👁️"}

          </button>

        </div>

        {/* LOGIN BUTTON */}
        <button
          className="login-btn-main"
          onClick={handleLogin}
        >

          Login

        </button>

        {/* SIGNUP */}
        <p className="signup-link">

          New user?

          <Link to="/register">
            {" "}Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;