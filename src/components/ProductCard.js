import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={`https://weddingplates-backend.onrender.com${product.image}`}
          alt={product.name}
          width="100"
        />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
