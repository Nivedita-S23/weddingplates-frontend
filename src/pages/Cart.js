import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Use full backend URL instead of env variable
const API_BASE = "https://weddingplates-backend.onrender.com";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity < 1) newCart[index].quantity = 1;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container">
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={`${API_BASE}${item.image}`} // ✅ fixed URL
                alt={item.name}
                width="100"
              />
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <p>
                  Quantity:
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(index, -1)}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(index, 1)}
                  >
                    +
                  </button>
                </p>
                <button onClick={() => removeItem(index)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="totaldown">
            <h3>Total: ₹{total}</h3>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
