import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";   // 🔥 ADD THIS
import { CartContext } from "../context/CartContext";

function Home({ search, category }) {

  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();   // 🔥 ADD THIS

  useEffect(() => {
    fetch("http://localhost:3002/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category)
  );

  return (
    <div className="home">

      <h2>
        {category === "All" ? "All Products" : category}
      </h2>

      <div className="product-grid">
        {filteredProducts.map((item) => (
          
          <div
            key={item.id}
            className="product-card"
            onClick={() => navigate(`/product/${item.id}`)}   // 🔥 THIS LINE
            style={{ cursor: "pointer" }}
          >

            <img src={item.image} alt={item.name} />

            <h5>{item.name}</h5>
            <p>₹{item.price}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();  // 🔥 prevent card click
                addToCart(item);
              }}
            >
              Add to Bag
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;