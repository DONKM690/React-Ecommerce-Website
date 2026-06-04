import {
  useState,
  useEffect,
  useContext
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import { AuthContext }
from "../context/AuthContext";

function Register() {

  const [form, setForm] =
    useState({

      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: ""

    });

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const navigate =
    useNavigate();

  const { user } =
    useContext(AuthContext);

  // REDIRECT IF LOGGED
  useEffect(() => {

    if (user) {

      navigate("/", {
        replace: true
      });

    }

  }, [user, navigate]);

  // HANDLE CHANGE
  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

    setError("");
  };

  // REGISTER
  const handleRegister = () => {

    const {
      name,
      email,
      mobile,
      password,
      confirmPassword
    } = form;

    // EMPTY CHECK
    if (

      !name ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword

    ) {

      setError(
        "Please fill all fields ❌"
      );

      return;
    }

    // EMAIL VALIDATION
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      setError(
        "Invalid email format ❌"
      );

      return;
    }

    // MOBILE VALIDATION
    const mobileRegex =
      /^[0-9]{10}$/;

    if (!mobileRegex.test(mobile)) {

      setError(
        "Mobile number must be 10 digits ❌"
      );

      return;
    }

    // PASSWORD LENGTH
    if (password.length < 6) {

      setError(
        "Password must be at least 6 characters ❌"
      );

      return;
    }

    // PASSWORD MATCH
    if (
      password !== confirmPassword
    ) {

      setError(
        "Passwords do not match ❌"
      );

      return;
    }

    // LOAD OLD USERS
    const oldUsers =

      JSON.parse(
        localStorage.getItem(
          "registeredUsers"
        )
      ) || [];

    // CHECK DUPLICATE EMAIL
    const emailExist =
      oldUsers.find(

        (u) =>
          u.email === email

      );

    if (emailExist) {

      setError(
        "Email already registered ❌"
      );

      return;
    }

    // CHECK DUPLICATE MOBILE
    const mobileExist =
      oldUsers.find(

        (u) =>
          u.mobile === mobile

      );

    if (mobileExist) {

      setError(
        "Mobile already registered ❌"
      );

      return;
    }

    // NEW USER
    const userData = {

      id: Date.now(),

      name,
      email,
      mobile,

      phone: mobile,

      password

    };

    // SAVE USERS
    localStorage.setItem(

      "registeredUsers",

      JSON.stringify([
        ...oldUsers,
        userData
      ])

    );

    // RESET FORM
    setForm({

      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: ""

    });

    // REDIRECT
    navigate("/login", {
      replace: true
    });

  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h3 className="text-center mb-4">
          Sign Up
        </h3>

        {error && (

          <div className="error-box">
            {error}
          </div>

        )}

        {/* NAME */}
        <div className="input-box">

          <span>👤</span>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

        </div>

        {/* EMAIL */}
        <div className="input-box">

          <span>📧</span>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

        </div>

        {/* MOBILE */}
        <div className="input-box">

          <span>📱</span>

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
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
            value={form.password}
            onChange={handleChange}
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

        {/* CONFIRM PASSWORD */}
        <div className="input-box">

          <span>🔒</span>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

        </div>

        {/* BUTTON */}
        <button
          className="btn btn-success w-100 mt-3"
          onClick={handleRegister}
        >

          Sign Up

        </button>

        {/* LOGIN */}
        <p className="text-center mt-3">

          Already have an account?

          <Link to="/login">
            {" "}Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;