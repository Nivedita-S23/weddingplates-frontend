// src/pages/Checkout.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Contact Number"
          required
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Address"
          required
          onChange={handleChange}
        ></textarea>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
