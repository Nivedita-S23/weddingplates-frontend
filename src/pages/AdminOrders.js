import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios.get("http://localhost:5000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markAsPaid = (id) => {
    axios.patch(`http://localhost:5000/api/orders/${id}/mark-paid`)
      .then(() => fetchOrders());
  };

  const deleteOrder = (id) => {
    if (window.confirm("Delete this order?")) {
      axios.delete(`http://localhost:5000/api/orders/${id}`)
        .then(() => fetchOrders());
    }
  };

  return (
    <div className="container">
      <h2>Admin Order Dashboard</h2>
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <h3>{order.customerName} ({order.email})</h3>
          <p>Phone: {order.phone}</p>
          <p>Address: {order.address}</p>
          <p><strong>Products:</strong></p>
          <ul>
            {order.products.map((p, i) => (
              <li key={i}>{p.name} x {p.quantity} - ₹{p.price}</li>
            ))}
          </ul>
          <p>Status: {order.isPaid ? "✅ Paid" : "❌ Not Paid"}</p>
          {!order.isPaid && <button onClick={() => markAsPaid(order._id)}>Mark as Paid</button>}
          <button onClick={() => deleteOrder(order._id)}>Delete Order</button>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
