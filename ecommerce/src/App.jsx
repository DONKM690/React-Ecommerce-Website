import { useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";

import { AuthContext } from "./context/AuthContext";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { user, authLoaded } = useContext(AuthContext);

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        setCategory={setCategory}
      />

      <div className="container">
        <Routes>

          <Route
            path="/"
            element={
              user?.email === "admin@gmail.com"
                ? <Navigate to="/admin" replace />
                : <Home search={search} category={category} />
            }
          />

          <Route
            path="/login"
            element={
              !authLoaded ? (
                <div className="text-center mt-5">Loading...</div>
              ) : !user ? (
                <Login />
              ) : (
                <Navigate
                  to={user?.email === "admin@gmail.com" ? "/admin" : "/"}
                  replace
                />
              )
            }
          />

          <Route
            path="/register"
            element={
              !authLoaded ? (
                <div className="text-center mt-5">Loading...</div>
              ) : !user ? (
                <Register />
              ) : (
                <Navigate
                  to={user?.email === "admin@gmail.com" ? "/admin" : "/"}
                  replace
                />
              )
            }
          />

          <Route
            path="/cart"
            element={
              user?.email === "admin@gmail.com"
                ? <Navigate to="/admin" replace />
                : <Cart />
            }
          />

          <Route
            path="/product/:id"
            element={
              user?.email === "admin@gmail.com"
                ? <Navigate to="/admin" replace />
                : <ProductDetails />
            }
          />

          <Route
            path="/checkout"
            element={
              !authLoaded ? (
                <div className="text-center mt-5">Loading...</div>
              ) : !user ? (
                <Navigate to="/login" state={{ from: "/checkout" }} replace />
              ) : user?.email === "admin@gmail.com" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Checkout />
              )
            }
          />

          <Route
            path="/payment"
            element={
              !authLoaded ? (
                <div className="text-center mt-5">Loading...</div>
              ) : !user ? (
                <Navigate to="/login" state={{ from: "/payment" }} replace />
              ) : user?.email === "admin@gmail.com" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Payment />
              )
            }
          />

          <Route
            path="/orders"
            element={
              !authLoaded ? (
                <div className="text-center mt-5">Loading...</div>
              ) : !user ? (
                <Navigate to="/login" state={{ from: "/orders" }} replace />
              ) : user?.email === "admin@gmail.com" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Orders />
              )
            }
          />

          <Route
            path="/profile"
            element={
              !authLoaded ? (
                <div className="text-center mt-5">Loading...</div>
              ) : !user ? (
                <Navigate to="/login" replace />
              ) : user?.email === "admin@gmail.com" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Profile />
              )
            }
          />

          <Route
            path="/success"
            element={
              !authLoaded ? (
                <div className="text-center mt-5">Loading...</div>
              ) : !user ? (
                <Navigate to="/login" replace />
              ) : user?.email === "admin@gmail.com" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Success />
              )
            }
          />

          <Route
            path="/admin"
            element={
              !authLoaded ? (
                <div className="text-center mt-5">Loading...</div>
              ) : !user ? (
                <Navigate to="/login" state={{ from: "/admin" }} replace />
              ) : user?.email === "admin@gmail.com" ? (
                <Admin />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

        </Routes>
      </div>

      {user?.email !== "admin@gmail.com" && <Footer />}
    </>
  );
}

export default App;