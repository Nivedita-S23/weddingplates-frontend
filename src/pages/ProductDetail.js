import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import { SlArrowLeft } from "react-icons/sl";

// ✅ Backend URL
const API = "https://weddingplates-backend.onrender.com";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ you need this line
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/api/products/${id}`)
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
    <div>
      <SlArrowLeft onClick={() => navigate(-1)} className="back-arrow" />
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={`${API}${product.image}`} alt={product.name} />
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
    </div>
  );
}

export default ProductDetail;
