import { useParams, useNavigate } from "react-router-dom";

import {
  useEffect,
  useState,
  useContext
} from "react";

import axios from "axios";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState(null);

  const [profileError, setProfileError] =
    useState(false);

  const { addToCart } =
    useContext(CartContext);

  const { user } =
    useContext(AuthContext);

  // FETCH PRODUCT

    // FETCH PRODUCT
// FETCH PRODUCT
useEffect(() => {
  fetchProduct();
}, [id]);

const fetchProduct = async () => {
  try {
    const res = await axios.get(
      `https://react-ecommerce-api-jtkw.onrender.com/products/${id}`
    );

    setProduct(res.data);

  } catch (err) {
    console.log(err);
  }
};

  // BUY NOW
  const handleBuyNow = () => {

    // LOGIN CHECK
    if (!user?.email) {

      navigate("/login");

      return;

    }

    // LOAD PROFILE
    const savedProfile = JSON.parse(

      localStorage.getItem(
        `profile_${user.email}`
      )

    );

    // PROFILE CHECK
    const isProfileComplete =

      savedProfile &&

      savedProfile.firstName?.trim() &&
      savedProfile.phone?.trim() &&
      savedProfile.address?.trim() &&
      savedProfile.city?.trim() &&
      savedProfile.state?.trim() &&
      savedProfile.pincode?.trim();

    // ❌ PROFILE NOT COMPLETE
    if (!isProfileComplete) {

      setProfileError(true);

      return;

    }

    // ✅ CHECKOUT
    navigate("/checkout", {

      state: {

        product: {
          ...product,
          qty: 1
        }

      }

    });

  };

  // LOADING
  if (!product) {

    return (

      <h2 className="text-center mt-5">
        Loading...
      </h2>

    );

  }

  return (

    <div className="container mt-5">

      {/* MODERN ALERT BOX */}
      {profileError && (

        <div
          style={{
            background: "#fff4f4",
            border: "1px solid #ffb3b3",
            padding: "20px",
            borderRadius: "14px",
            marginBottom: "25px"
          }}
        >

          <h4
            style={{
              color: "#ff3b6b",
              marginBottom: "10px",
              fontWeight: "700"
            }}
          >
            Complete Your Profile First 🚨
          </h4>

          <p
            style={{
              color: "#555",
              marginBottom: "15px"
            }}
          >
            Add your delivery address and phone number before placing an order.
          </p>

          <button
            onClick={() =>
              navigate("/profile")
            }
           style={{
  background:
    "linear-gradient(135deg,#2563eb,#3b82f6)",
  color: "#fff",
  border: "none",
  padding: "12px 22px",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer"
}}
          >
            Complete Profile →
          </button>

        </div>

      )}

      <div className="row">

        {/* IMAGE */}
        <div className="col-md-6 text-center">

          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              maxHeight: "350px",
              objectFit: "contain"
            }}
          />

        </div>

        {/* DETAILS */}
        <div className="col-md-6">

          <h2>{product.name}</h2>

          <h3 className="text-success mt-3">
            ₹{Number(product.price) || 0}
          </h3>

          <p className="mt-3">
            ⭐⭐⭐⭐☆ (4.2 ratings)
          </p>

          <p>
            High quality product with best performance 🔥
          </p>

          {/* BUTTONS */}
          <div className="mt-4">

            {/* ADD TO CART */}
            <button
              className="btn btn-warning me-3"
              onClick={() =>
                addToCart(product)
              }
            >
              Add to Cart 🛒
            </button>

            {/* BUY NOW */}
            <button
              className="btn btn-danger"
              onClick={handleBuyNow}
            >
              Buy Now ⚡
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProductDetails;