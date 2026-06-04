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

function Payment() {

  const {
    cart,
    removeOrderedItems,
    cartLoaded
  } = useContext(CartContext);

  const { user } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  const location =
    useLocation();

  // DIRECT BUY
  const singleProduct =
    location.state?.product;

  const products =
    singleProduct
      ? [
          {
            ...singleProduct,
            qty:
              singleProduct.qty || 1
          }
        ]
      : cart;

  const [method, setMethod] =
    useState("upi");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // PAYMENT STATES
  const [upi, setUpi] =
    useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] =
    useState("");

  const [cardName, setCardName] =
    useState("");

  const [shipping, setShipping] =
    useState(null);

  // LOGIN CHECK
  useEffect(() => {

    if (!user) {

      navigate("/login", {
        replace: true,
        state: {
          from: "/payment"
        }
      });

    }

  }, [user, navigate]);

  // EMPTY CHECK
  useEffect(() => {

    if (
      cartLoaded &&
      products.length === 0 &&
      !singleProduct
    ) {

      navigate("/");

    }

  }, [
    cartLoaded,
    products,
    singleProduct,
    navigate
  ]);

  // LOAD SHIPPING
  useEffect(() => {

    if (!user?.email) return;

    const savedShipping =
      JSON.parse(

        localStorage.getItem(
          `shipping_${user.email}`
        )

      );

    const savedProfile =
      JSON.parse(

        localStorage.getItem(
          `profile_${user.email}`
        )

      );

    if (savedShipping) {

      setShipping(savedShipping);

    } else if (savedProfile) {

      setShipping({

        name:
          `${savedProfile.firstName || ""} ${savedProfile.lastName || ""}`,

        address:
          `${savedProfile.address || ""}, ${savedProfile.city || ""}, ${savedProfile.state || ""} - ${savedProfile.pincode || ""}`,

        phone:
          savedProfile.phone || ""

      });

    }

  }, [user]);

  // TOTAL
  const total =
    products.reduce(

      (acc, item) =>

        acc +
        (Number(item.price) || 0) *
        (item.qty || 1),

      0

    );

  // PAYMENT
  const handlePayment = () => {

    setError("");

    // UPI
    if (method === "upi") {

      if (
        !upi ||
        !upi.includes("@")
      ) {

        setError(
          "Enter valid UPI ID ❌"
        );

        return;
      }

    }

    // CARD
    if (method === "card") {

      if (!cardName) {

        setError(
          "Enter card holder name ❌"
        );

        return;
      }

      if (
        !cardNumber ||
        cardNumber.length < 12
      ) {

        setError(
          "Invalid card number ❌"
        );

        return;
      }

      if (
        !expiry ||
        !/^\d{2}\/\d{2}$/.test(expiry)
      ) {

        setError(
          "Invalid expiry ❌"
        );

        return;
      }

      if (
        !cvv ||
        cvv.length < 3
      ) {

        setError(
          "Invalid CVV ❌"
        );

        return;
      }

    }

    setLoading(true);

    setTimeout(() => {

      const newOrder = {

        id: Date.now(),

        customer: {

          name:
            user?.name || "Guest",

          email:
            user?.email ||
            "Not Available"

        },

        shipping:
          shipping || {},

        items:
          products.map((item) => ({

            id: item.id,

            name: item.name,

            image: item.image,

            price:
              Number(item.price) || 0,

            qty:
              item.qty || 1

          })),

        total,

        paymentMethod: method,

        date:
          new Date().toLocaleString(),

        status: "Success"

      };

      // SAVE ORDERS
      const oldOrders =
        JSON.parse(

          localStorage.getItem(
            `orders_${user?.email}`
          )

        ) || [];

      localStorage.setItem(

        `orders_${user?.email}`,

        JSON.stringify([
          newOrder,
          ...oldOrders
        ])

      );

      localStorage.setItem(

        `lastOrder_${user?.email}`,

        JSON.stringify(newOrder)

      );

      navigate("/success", {
        state: newOrder
      });

      setTimeout(() => {

        if (!singleProduct) {

          removeOrderedItems(products);

        }

      }, 200);

    }, 1500);

  };

  if (!cartLoaded) {

    return (
      <div className="text-center mt-5">
        Loading...
      </div>
    );

  }

  return (

    <div className="payment-wrapper">

      <h2 className="payment-title">
        Secure Payment 💳
      </h2>

      <div className="payment-container">

        {/* LEFT */}
        <div className="payment-left">

          <h3 className="payment-heading">
            Choose Payment Method
          </h3>

          {error && (

            <div className="error-box">
              {error}
            </div>

          )}

          {/* METHODS */}

          <div className="payment-methods">

            {/* UPI */}
            <label
              className={`payment-option ${
                method === "upi"
                  ? "active-payment"
                  : ""
              }`}
            >

              <div className="payment-left-side">

                <input
                  type="radio"
                  checked={
                    method === "upi"
                  }
                  onChange={() =>
                    setMethod("upi")
                  }
                />

                <div>

                  <h4>
                    UPI Payment
                  </h4>

                  <p>
                    Fast & secure UPI payment
                  </p>

                </div>

              </div>

            </label>

            {/* CARD */}
            <label
              className={`payment-option ${
                method === "card"
                  ? "active-payment"
                  : ""
              }`}
            >

              <div className="payment-left-side">

                <input
                  type="radio"
                  checked={
                    method === "card"
                  }
                  onChange={() =>
                    setMethod("card")
                  }
                />

                <div>

                  <h4>
                    Debit / Credit Card
                  </h4>

                  <p>
                    Visa, Mastercard, RuPay
                  </p>

                </div>

              </div>

            </label>

            {/* COD */}
            <label
              className={`payment-option ${
                method === "cod"
                  ? "active-payment"
                  : ""
              }`}
            >

              <div className="payment-left-side">

                <input
                  type="radio"
                  checked={
                    method === "cod"
                  }
                  onChange={() =>
                    setMethod("cod")
                  }
                />

                <div>

                  <h4>
                    Cash on Delivery
                  </h4>

                  <p>
                    Pay after delivery
                  </p>

                </div>

              </div>

            </label>

            {/* NET BANKING */}
            <label
              className={`payment-option ${
                method === "netbanking"
                  ? "active-payment"
                  : ""
              }`}
            >

              <div className="payment-left-side">

                <input
                  type="radio"
                  checked={
                    method ===
                    "netbanking"
                  }
                  onChange={() =>
                    setMethod(
                      "netbanking"
                    )
                  }
                />

                <div>

                  <h4>
                    Net Banking
                  </h4>

                  <p>
                    All major banks supported
                  </p>

                </div>

              </div>

            </label>

          </div>

          {/* INPUTS */}

          <div className="payment-box">

            {method === "upi" && (

              <input
                type="text"
                placeholder="Enter UPI ID"
                value={upi}
                onChange={(e) =>
                  setUpi(
                    e.target.value
                  )
                }
              />

            )}

            {method === "card" && (

              <>

                <input
                  type="text"
                  placeholder="Card Holder Name"
                  value={cardName}
                  onChange={(e) =>
                    setCardName(
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(
                      e.target.value
                    )
                  }
                />

                <div
                  style={{
                    display: "flex",
                    gap: "10px"
                  }}
                >

                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) =>
                      setExpiry(
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="password"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(
                        e.target.value
                      )
                    }
                  />

                </div>

              </>

            )}

            {method ===
              "netbanking" && (

              <select>

                <option>
                  Select Your Bank
                </option>

                <option>
                  SBI Bank
                </option>

                <option>
                  HDFC Bank
                </option>

                <option>
                  ICICI Bank
                </option>

                <option>
                  Federal Bank
                </option>

              </select>

            )}

            {method === "cod" && (

              <div className="cod-box">

                Cash on Delivery
                Available ✅

              </div>

            )}

          </div>

        </div>

        {/* RIGHT */}
        <div className="payment-right">

          {shipping && (

            <div className="payment-address">

              <h4>
                Delivery Address 📍
              </h4>

              <p>
                <strong>
                  {shipping.name}
                </strong>
              </p>

              <p>
                {shipping.address}
              </p>

              <p>
                {shipping.phone}
              </p>

              <hr />

            </div>

          )}

          <h4>
            Order Summary
          </h4>

          {products.map((item) => (

            <div
              key={item.id}
              className="payment-product"
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div>

                <h5>
                  {item.name}
                </h5>

                <p>
                  Qty:
                  {item.qty || 1}
                </p>

                <strong>
                  ₹{item.price}
                </strong>

              </div>

            </div>

          ))}

          <div className="payment-total">

            <span>Total</span>

            <span>
              ₹{total}
            </span>

          </div>

          <button
            className="payment-btn"
            onClick={handlePayment}
            disabled={loading}
          >

            {loading
              ? "Processing..."
              : "Pay Now 💸"}

          </button>

        </div>

      </div>

    </div>

  );

}

export default Payment;