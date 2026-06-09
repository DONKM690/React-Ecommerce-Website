import { useEffect, useState, useRef } from "react";

import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct
} from "../services/api";

import "./admin.css";

function Admin() {

  // =========================
  // PRODUCTS STATE
  // =========================
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: ""
  });

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  // =========================
  // ORDERS STATE
  // =========================
  const [orders, setOrders] = useState([]);

  // =========================
  // FORM REF
  // =========================
  const formRef = useRef(null);

  // =========================
  // GET PRODUCTS
  // =========================
  const fetchProducts = async () => {

    try {

      const res = await getProducts();

      setProducts(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // =========================
  // GET ALL USERS ORDERS
  // =========================
  const fetchOrders = () => {

    try {

      let allOrders = [];

      // LOOP LOCAL STORAGE
      for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);

        // ONLY ORDER KEYS
        if (key.startsWith("orders_")) {

          const userOrders = JSON.parse(
            localStorage.getItem(key)
          ) || [];

          allOrders = [
            ...allOrders,
            ...userOrders
          ];

        }

      }

      // LATEST FIRST
      allOrders.sort(
        (a, b) => b.id - a.id
      );

      setOrders(allOrders);

    } catch (err) {

      console.log(err);

    }

  };

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {

    fetchProducts();
    fetchOrders();

  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

  };

  // =========================
  // ADD / UPDATE PRODUCT
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !product.name ||
      !product.price ||
      !product.category ||
      !product.image
    ) {

      alert("Fill all fields ❌");
      return;

    }

    try {

      // UPDATE
      if (editingId) {

        await updateProduct(
          editingId,
          {
            ...product,
            price: Number(product.price)
          }
        );

        alert("Product Updated ✅");

      } else {

        // ADD
        await addProduct({
          ...product,
          price: Number(product.price)
        });

        alert("Product Added ✅");

      }

      // RESET
      setProduct({
        name: "",
        price: "",
        category: "",
        image: ""
      });

      setEditingId(null);

      fetchProducts();

    } catch (err) {

      console.log(err);

      alert("Something went wrong ❌");

    }

  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      fetchProducts();

    } catch (err) {

      console.log(err);

    }

  };

  // =========================
  // EDIT PRODUCT
  // =========================
  const handleEdit = (item) => {

    setProduct({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image
    });

    setEditingId(item.id);

    // SCROLL TO FORM
    setTimeout(() => {

      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 100);

  };

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredProducts =
    products.filter((item) =>

      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  return (

    <div className="admin-container">

      {/* ========================= */}
      {/* DASHBOARD */}
      {/* ========================= */}

      <div className="dashboard-cards">

        <div className="dash-card">

          <h2>
            {products.length}
          </h2>

          <p>Total Products</p>

        </div>

        <div className="dash-card">

          <h2>
            {orders.length}
          </h2>

          <p>Total Orders</p>

        </div>

        <div className="dash-card">

          <h2>

            ₹

            {

              orders.reduce(

                (acc, order) =>

                  acc +
                  (order.total || 0),

                0
              )

            }

          </h2>

          <p>Total Amount</p>

        </div>

      </div>

      {/* ========================= */}
      {/* PRODUCT FORM */}
      {/* ========================= */}

      <div className="admin-top">

        <div
          className="admin-form-card"
          ref={formRef}
        >

          <h1>

            {

              editingId
                ? "Edit Product"
                : "Add Product"

            }

          </h1>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={product.category}
              onChange={handleChange}
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={product.image}
              onChange={handleChange}
            />

            <button type="submit">

              {

                editingId
                  ? "Update Product"
                  : "Add Product"

              }

            </button>

          </form>

        </div>

      </div>

      {/* ========================= */}
      {/* PRODUCTS */}
      {/* ========================= */}

      <div className="product-section">

        <div className="product-header">

          <h2>Products</h2>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="products-grid">

          {

            filteredProducts.map((item) => (

              <div
                className="product-card"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <h3>
                  {item.name}
                </h3>

                <p>
                  ₹ {item.price}
                </p>

                <span>
                  {item.category}
                </span>

                <div>

                  <button
                    onClick={() =>
                      handleEdit(item)
                    }
                  >

                    Edit

                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                  >

                    Delete

                  </button>

                </div>

              </div>

            ))

          }

        </div>

      </div>

      {/* ========================= */}
      {/* ORDERS */}
      {/* ========================= */}

      <div className="orders-section">

        <h2>
          Orders
        </h2>

        <div className="orders-grid">

          {

            orders.length === 0

              ? (

                <p>
                  No orders yet
                </p>

              )

              : (

                orders.map((order) => (

                  <div
                    key={order.id}
                    className="order-card"
                  >

                    <h3>
                      👤 {order.customer?.name}
                    </h3>

                    <p>
                      📧 {order.customer?.email}
                    </p>

                    <p>
                      📍 {order.shipping?.address}
                    </p>

                    <p>
                      📱 {order.shipping?.phone}
                    </p>

                    <hr />

                    {

                      order.items?.map(
                        (item, i) => (

                          <div key={i}>

                            {item.name}

                            ×

                            {item.qty}

                            = ₹

                            {item.price}

                          </div>

                        )
                      )

                    }

                    <h4>
                      💰 Total:
                      ₹{order.total}
                    </h4>

                    <p>
                      📅 {order.date}
                    </p>

                    <p>

                      Status:
                      {" "}

                      <span
                        style={{
                          color:
                            order.status?.toLowerCase() === "cancelled"
                              ? "red"
                              : "green",
                          fontWeight: "bold"
                        }}
                      >

                        {order.status}

                      </span>

                    </p>

                  </div>

                ))

              )

          }

        </div>

      </div>

    </div>

  );
}

export default Admin;