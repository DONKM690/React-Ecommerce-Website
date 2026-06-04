import {
  useEffect,
  useState,
  useContext
} from "react";

import { AuthContext } from "../context/AuthContext";

function Orders() {

  const { user } =
    useContext(AuthContext);

  const [orders, setOrders] =
    useState([]);

  // =========================
  // LOAD USER ORDERS
  // =========================
  useEffect(() => {

    if (user?.email) {

      const savedOrders = JSON.parse(

        localStorage.getItem(
          `orders_${user.email}`
        )

      ) || [];

      setOrders(savedOrders);

    }

  }, [user]);

  // =========================
  // CANCEL ORDER
  // =========================
  const cancelOrder = (id) => {

    const confirmCancel =
      window.confirm(
        "Cancel this order?"
      );

    if (!confirmCancel) return;

    const updatedOrders =
      orders.map((order) =>

        order.id === id

          ? {
              ...order,
              status: "Cancelled"
            }

          : order

      );

    setOrders(updatedOrders);

    localStorage.setItem(

      `orders_${user.email}`,

      JSON.stringify(updatedOrders)

    );

  };

  return (

    <div className="orders-wrapper">

      <h2 className="orders-title">
        My Orders 📦
      </h2>

      {

        orders.length === 0

          ? (

            <div className="empty-orders">

              <h4>
                No Orders Found 😔
              </h4>

            </div>

          )

          : (

            orders.map((order) => (

              <div
                key={order.id}
                className="order-card"
              >

                {/* TOP */}
                <div className="order-top">

                  <div>

                    <h5>
                      Order #{order.id}
                    </h5>

                    <p>
                      {order.date}
                    </p>

                  </div>

                  <div>

                    <span
                      className={
                        order.status === "Cancelled"
                          ? "order-status-cancel"
                          : "order-status-success"
                      }
                    >

                      {
                        order.status === "Cancelled"
                          ? "❌ Cancelled"
                          : "✅ Success"
                      }

                    </span>

                    {

                      order.status !==
                        "Cancelled" && (

                        <button
                          className="cancel-order-btn"
                          onClick={() =>
                            cancelOrder(order.id)
                          }
                        >

                          Cancel Order ❌

                        </button>

                      )

                    }

                  </div>

                </div>

                <hr />

                {/* ITEMS */}
                {

                  order.items.map((item) => (

                    <div
                      key={item.id}
                      className="order-item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        marginBottom: "20px",
                        padding: "12px 0",
                        borderBottom: "1px solid #eee"
                      }}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "contain",
                          borderRadius: "10px",
                          background: "#f5f5f5",
                          padding: "8px"
                        }}
                      />

                      <div
                        style={{
                          flex: 1
                        }}
                      >

                        <h4
                          style={{
                            margin: "0 0 8px",
                            fontSize: "18px"
                          }}
                        >
                          {item.name}
                        </h4>

                        <p
                          style={{
                            margin: "4px 0",
                            color: "#666"
                          }}
                        >
                          Quantity: {item.qty}
                        </p>

                        <p
                          style={{
                            margin: "4px 0",
                            fontWeight: "bold",
                            color: "#ff3f6c"
                          }}
                        >
                          ₹{item.price}
                        </p>

                      </div>

                    </div>

                  ))

                }

                {/* TOTAL */}
                <div className="order-total">

                  Total:
                  ₹{order.total}

                </div>

              </div>

            ))

          )

      }

    </div>

  );
}

export default Orders;