import {
  useState,
  useContext,
  useEffect
} from "react";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

function Checkout() {

  const {
    cart,
    cartLoaded
  } = useContext(CartContext);

  const { user } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  // DIRECT BUY PRODUCT
  const singleProduct =
    location.state?.product;

  const products =
    singleProduct
      ? [singleProduct]
      : cart;

  const [name, setName] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [profileError, setProfileError] =
    useState(false);

  // LOGIN CHECK
  useEffect(() => {

    if (!user) {

      navigate("/login", {
        state: {
          from: "/checkout"
        }
      });

    }

  }, [user, navigate]);

  // EMPTY CHECK
  useEffect(() => {

    if (
      cartLoaded &&
      products.length === 0
    ) {

      navigate("/");

    }

  }, [
    cartLoaded,
    products,
    navigate
  ]);

  // AUTO LOAD PROFILE
  useEffect(() => {

    if (!user?.email) return;

    const savedProfile = JSON.parse(

      localStorage.getItem(
        `profile_${user.email}`
      )

    );

    // ❌ PROFILE NOT COMPLETED
    if (
      !savedProfile ||
      !savedProfile.firstName ||
      !savedProfile.phone ||
      !savedProfile.address
    ) {

      setProfileError(true);
      return;

    }

    // ✅ LOAD PROFILE
    setName(

      `${savedProfile.firstName || ""} ${savedProfile.lastName || ""}`

    );

    setAddress(

      `${savedProfile.address || ""}, ${savedProfile.city || ""}, ${savedProfile.state || ""} - ${savedProfile.pincode || ""}`

    );

    setPhone(
      savedProfile.phone || ""
    );

  }, [user]);

  // TOTAL
  const total = products.reduce(

    (acc, item) =>

      acc +
      (Number(item.price) || 0) *
      (item.qty || 1),

    0
  );

  // PROCEED PAYMENT
  const handleProceed = () => {

    // ❌ BLOCK ORDER
    if (profileError) {

      return;

    }

    // SAVE USER SHIPPING
    localStorage.setItem(

      `shipping_${user?.email}`,

      JSON.stringify({
        name,
        address,
        phone
      })

    );

    navigate("/payment", {

      state: {
        product: singleProduct
      }

    });

  };

  if (!cartLoaded) {

    return (

      <div className="text-center mt-5">
        Loading...
      </div>

    );

  }

  return (

    <div className="checkout-wrapper">

      <div className="checkout-card">

        <h2 className="checkout-title">
          Checkout 🧾
        </h2>

        {/* MODERN ALERT */}
        {profileError && (

          <div
            style={{
              background: "#fff3f3",
              border: "1px solid #ffb3b3",
              padding: "18px",
              borderRadius: "12px",
              marginBottom: "20px"
            }}
          >

            <h4
              style={{
                color: "#e53935",
                marginBottom: "8px"
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
              Add your delivery address and phone number
              before placing an order.
            </p>

            <button
              onClick={() =>
                navigate("/profile")
              }
              style={{
                background: "#2874f0",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Complete Profile →
            </button>

          </div>

        )}

        <div className="checkout-container">

          {/* LEFT */}
          <div className="checkout-left">

            <h4>
              Delivery Address 📍
            </h4>

            {

              profileError ? (

                <div
                  className="saved-address-box"
                  style={{
                    color: "#777"
                  }}
                >

                  No address found ❌

                </div>

              ) : (

                <div className="saved-address-box">

                  <p>
                    <strong>{name}</strong>
                  </p>

                  <p>{address}</p>

                  <p>{phone}</p>

                </div>

              )

            }

          </div>

          {/* RIGHT */}
          <div className="checkout-right">

            <h4>
              Order Summary
            </h4>

            {products.map((item) => (

              <div
                key={item.id}
                className="checkout-item"
              >

                <span>

                  {item.name}
                  ×
                  {item.qty || 1}

                </span>

                <span>
                  ₹{item.price}
                </span>

              </div>

            ))}

            <hr />

            <h3 className="checkout-total">
              ₹{total}
            </h3>

            <button
              className="checkout-btn"
              onClick={handleProceed}
              disabled={profileError}
              style={{
                opacity:
                  profileError ? 0.6 : 1,
                cursor:
                  profileError
                    ? "not-allowed"
                    : "pointer"
              }}
            >

              {
                profileError
                  ? "Complete Profile to Continue"
                  : "Proceed to Payment →"
              }

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;