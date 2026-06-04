import { useContext } from "react";

import { CartContext } from "../context/CartContext";

import {
  useNavigate
} from "react-router-dom";

function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useContext(CartContext);

  const navigate = useNavigate();

  // =========================
  // TOTAL PRICE
  // =========================
  const total = cart.reduce(

    (acc, item) =>

      acc +
      item.price * item.qty,

    0

  );

  // =========================
  // BUY THIS NOW
  // =========================
  const handleBuyNow = (item) => {

    navigate("/checkout", {

      state: {
        product: item
      }

    });

  };

  return (

    <div className="cart-wrapper">

      <h2
        className="cart-title"
        style={{
          textAlign: "center",
          marginBottom: "35px",
          fontSize: "48px",
          fontWeight: "700"
        }}
      >
        My Cart 🛒
      </h2>

      {

        cart.length === 0

          ? (

            <div className="cart-empty">

              <h4
                style={{
                  color: "var(--text-color)"
                }}
              >
                Your cart is empty 😔
              </h4>

              <button
                className="cart-checkout-btn"
                onClick={() => navigate("/")}
                style={{
                  marginTop: "20px",
                  padding: "14px 28px",
                  border: "none",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg,#ff3f6c,#ff5c87)",
                  color: "#fff",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >

                Shop Now 🛍️

              </button>

            </div>

          )

          : (

            <div
              className="cart-container"
              style={{
                display: "flex",
                gap: "30px",
                alignItems: "flex-start",
                flexWrap: "wrap"
              }}
            >

              {/* ========================= */}
              {/* LEFT SIDE */}
              {/* ========================= */}

              <div
                className="cart-left"
                style={{
                  flex: "2"
                }}
              >

                {

                  cart.map((item) => (

                    <div
                      key={item.id}
                      className="cart-item"
                      style={{
                        display: "flex",
                        gap: "20px",
                        background: "var(--card-bg)",
                        color: "var(--text-color)",
                        padding: "20px",
                        borderRadius: "16px",
                        marginBottom: "20px",
                        boxShadow:
                          "0 2px 10px rgba(0,0,0,0.06)"
                      }}
                    >

                      {/* IMAGE */}
                      <div>

                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "170px",
                            height: "170px",
                            objectFit: "contain",
                            background: "#f5f5f5",
                            borderRadius: "12px",
                            padding: "10px"
                          }}
                        />

                      </div>

                      {/* DETAILS */}
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between"
                        }}
                      >

                        <div>

                          <h3
                            style={{
                              marginBottom: "10px",
                              fontSize: "28px",
                              color: "var(--text-color)"
                            }}
                          >
                            {item.name}
                          </h3>

                          <h2
                            style={{
                              color: "#ff3f6c",
                              marginBottom: "15px"
                            }}
                          >
                            ₹{item.price}
                          </h2>

                          {/* QTY */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              marginBottom: "18px"
                            }}
                          >

                            <button
                              onClick={() =>
                                decreaseQty(item.id)
                              }
                              style={{
                                width: "40px",
                                height: "40px",
                                border: "none",
                                borderRadius: "10px",
                                background: "#ff3f6c",
                                color: "#fff",
                                fontSize: "22px",
                                cursor: "pointer"
                              }}
                            >

                              -

                            </button>

                            <span
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color:
                                  "var(--text-color)"
                              }}
                            >
                              {item.qty}
                            </span>

                            <button
                              onClick={() =>
                                increaseQty(item.id)
                              }
                              style={{
                                width: "40px",
                                height: "40px",
                                border: "none",
                                borderRadius: "10px",
                                background: "#ff3f6c",
                                color: "#fff",
                                fontSize: "22px",
                                cursor: "pointer"
                              }}
                            >

                              +

                            </button>

                          </div>

                        </div>

                        {/* BUTTONS */}
                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            flexWrap: "wrap"
                          }}
                        >

                          {/* REMOVE */}
                          <button
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                            style={{
                              padding:
                                "12px 24px",
                              border: "none",
                              borderRadius: "10px",
                              background:
                                "var(--button-secondary-bg)",
                              color:
                                "var(--text-color)",
                              fontWeight: "600",
                              cursor: "pointer"
                            }}
                          >

                            🗑 Remove

                          </button>

                          {/* BUY NOW */}
                          <button
                            onClick={() =>
                              handleBuyNow(item)
                            }
                            style={{
                              padding:
                                "12px 24px",
                              border: "none",
                              borderRadius: "10px",
                              background:
                                "linear-gradient(135deg,#ff3f6c,#ff5c87)",
                              color: "#fff",
                              fontWeight: "600",
                              cursor: "pointer"
                            }}
                          >

                            ⚡ Buy This Now

                          </button>

                        </div>

                      </div>

                    </div>

                  ))

                }

              </div>

              {/* ========================= */}
              {/* RIGHT SIDE */}
              {/* ========================= */}

              <div
                className="cart-right"
                style={{
                  flex: "1",
                  background: "var(--card-bg)",
                  color: "var(--text-color)",
                  padding: "25px",
                  borderRadius: "16px",
                  height: "fit-content",
                  boxShadow:
                    "0 2px 10px rgba(0,0,0,0.06)"
                }}
              >

                <h2
                  style={{
                    marginBottom: "20px",
                    color: "var(--text-color)"
                  }}
                >
                  Price Details
                </h2>

                <div
                  className="cart-summary"
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    marginBottom: "15px",
                    color: "var(--text-color)"
                  }}
                >

                  <span>Total Items</span>

                  <span>
                    {cart.length}
                  </span>

                </div>

                <div
                  className="cart-summary"
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    marginBottom: "20px",
                    color: "var(--text-color)"
                  }}
                >

                  <span>Total Price</span>

                  <span>
                    ₹{total}
                  </span>

                </div>

                <hr />

                <button
                  className="cart-checkout-btn"
                  onClick={() =>
                    navigate("/checkout")
                  }
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "15px",
                    border: "none",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg,#ff3f6c,#ff5c87)",
                    color: "#fff",
                    fontSize: "18px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >

                  Proceed to Checkout →

                </button>

              </div>

            </div>

          )

      }

    </div>

  );
}

export default Cart;