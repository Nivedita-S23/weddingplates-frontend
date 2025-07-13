// src/pages/Checkout.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { SlArrowLeft } from "react-icons/sl";

const API = "https://weddingplates-backend.onrender.com";

function Checkout() {
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedCart.length === 0) {
      alert("Cart is empty!");
      navigate("/");
    } else {
      setCart(storedCart);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        ...form,
        products: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };
      await axios.post(`${API}/api/orders/add`, orderData);
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      navigate("/");
    } catch (err) {
      alert("Error placing order: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <SlArrowLeft onClick={() => navigate(-1)} className="back-arrow" />
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="customerName"
            placeholder="Name"
            required
            pattern="^[A-Za-z\s]{3,}$"
            title="Name must be at least 3 characters and contain only letters and spaces"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Enter a valid email address"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Contact Number"
            required
            pattern="\d{10}"
            title="Phone number must be exactly 10 digits"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            required
            minLength={10}
            maxLength={150}
            pattern="^[A-Za-z0-9\s,.-]{10,150}$"
            title="Address must be 10–150 characters and cannot contain symbols like < > /"
            onChange={handleChange}
          ></textarea>

          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
