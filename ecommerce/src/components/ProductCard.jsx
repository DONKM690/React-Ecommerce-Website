import { useNavigate } from "react-router-dom";

function ProductCard({ item, addToCart }) {
  const navigate = useNavigate();

  return (
    <div className="card product-card p-2">

      {/*  Product Image */}
      <img
        src={item.image || "https://via.placeholder.com/200"}
        className="card-img-top p-3"
        alt={item.name}
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/product/${item.id}`)}
      />

      <div className="card-body text-center">

        {/*  Product Name */}
        <h5
          className="card-title"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/product/${item.id}`)}
        >
          {item.name}
        </h5>

        {/*  Price */}
        <p className="text-success fw-bold fs-5">₹{item.price}</p>

        {/*  Add to Cart */}
        <button
          className="btn btn-warning w-100"
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;