import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css"; // ⬅️ Import the CSS

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error("Error loading product:", err);
        setError("Product not found or server error.");
      });
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div className="loading-message">Loading...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
        />
      </div>
      <div className="product-detail-info">
        <h2>{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p>
          <strong>Price:</strong> ₹{product.price}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </p>

        {product.quantity > 0 ? (
          <button onClick={handleAddToCart}>Add to Cart</button>
        ) : (
          <p className="out-of-stock">Out of Stock</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
