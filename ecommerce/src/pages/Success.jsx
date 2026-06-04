import {
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  useEffect,
  useContext,
  useState
} from "react";

import { AuthContext } from "../context/AuthContext";

function Success() {

  const navigate = useNavigate();
  const location = useLocation();

  const { user } =
    useContext(AuthContext);

  const [order, setOrder] =
    useState(null);

  // 🔥 LOAD ORDER
  useEffect(() => {

    // ✅ FIRST CHECK NAVIGATION STATE
    if (location.state) {

      setOrder(location.state);
      return;

    }

    // ✅ WAIT FOR USER LOAD
    if (!user?.email) return;

    // ✅ LOAD LAST ORDER
    const savedOrder = JSON.parse(

      localStorage.getItem(
        `lastOrder_${user.email}`
      )

    );

    if (savedOrder) {

      setOrder(savedOrder);

    } else {

      navigate("/", {
        replace: true
      });

    }

  }, [
    location.state,
    user,
    navigate
  ]);

  // 🔥 LOADING
  if (!order) {

    return (

      <div className="text-center mt-5">
        Loading...
      </div>

    );
  }

  return (

    <div className="success-wrapper">

      <div className="success-card">

        <h1 className="success-icon">
          🎉
        </h1>

        <h2>
          Order Placed Successfully!
        </h2>

        <p>
          Thank you for shopping with us 💖
        </p>

        {/* ORDER DETAILS */}
        <div className="success-details">

          <p>

            <strong>
              Order ID:
            </strong>

            {" "}
            #{order.id}

          </p>

          <p>

            <strong>
              Date:
            </strong>

            {" "}
            {order.date}

          </p>

          <p>

            <strong>
              Total Paid:
            </strong>

            {" "}
            ₹{order.total}

          </p>

          <p>

            <strong>
              Payment:
            </strong>

            {" "}
            {order.paymentMethod}

          </p>

          <p>

            <strong>
              Status:
            </strong>

            {" "}
            ✅ {order.status}

          </p>

        </div>

        {/* SHIPPING */}
        {order.shipping && (

          <div className="success-shipping">

            <h4>
              Delivery Address 📍
            </h4>

            <p>
              <strong>
                {order.shipping.name}
              </strong>
            </p>

            <p>
              {order.shipping.address}
            </p>

            <p>
              {order.shipping.phone}
            </p>

          </div>

        )}

        {/* ITEMS */}
        <div className="success-items">

          <h4>
            Ordered Items 🛍️
          </h4>

          {order.items?.map((item) => (

            <div
              key={item.id}
              className="success-item"
            >

              <span>

                {item.name}
                {" "}
                ×
                {" "}
                {item.qty || 1}

              </span>

              <span>
                ₹{item.price}
              </span>

            </div>

          ))}

        </div>

        {/* ACTION BUTTONS */}
        <div className="success-actions">

          <button
            className="btn"
            onClick={() => navigate("/")}
          >

            Continue Shopping 🛍️

          </button>

          <button
            className="btn"
            onClick={() => navigate("/orders")}
          >

            View Orders 📦

          </button>

        </div>

      </div>

    </div>
  );
}

export default Success;