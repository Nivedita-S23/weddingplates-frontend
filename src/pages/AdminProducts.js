import React, { useState, useEffect } from "react";
import axios from "axios";

// ✅ Use your deployed backend URL directly
const API_BASE = "https://weddingplates-backend.onrender.com";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: 0,
    description: "",
    image: null,
    category: "",
  });

  const fetchProducts = () => {
    axios
      .get(`${API_BASE}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) {
      alert("Please select a category.");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("quantity", form.quantity);
    data.append("description", form.description);
    data.append("category", form.category);
    data.append("image", form.image);

    try {
      await axios.post(`${API_BASE}/api/products/add`, data);
      fetchProducts();
      alert("Product added!");
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  const markOutOfStock = async (id) => {
    try {
      await axios.patch(`${API_BASE}/api/products/${id}/out-of-stock`);
      fetchProducts();
    } catch (err) {
      alert("Failed to mark out of stock.");
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`${API_BASE}/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Admin Product Manager</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          required
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          onChange={handleChange}
        ></textarea>

        <select name="category" required onChange={handleChange}>
          <option value="">-- Select Category --</option>
          <option value="dolls">Dolls</option>
          <option value="plate">Plate Decoration</option>
          <option value="gift">Gift</option>
          <option value="jute">Jute Bags</option>
        </select>

        <input
          type="file"
          name="image"
          accept="image/*"
          required
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>
      </form>

      <h3>Product List</h3>
      {products.map((p) => (
        <div key={p._id} className="order-card">
          <img src={`${API_BASE}${p.image}`} alt={p.name} width="120" />
          <h4>{p.name}</h4>
          <p>Price: ₹{p.price}</p>
          <p>Quantity: {p.quantity}</p>
          <p>Category: {p.category}</p>
          <p>Status: {p.quantity === 0 ? "Out of Stock" : "In Stock"}</p>
          {p.quantity > 0 && (
            <button onClick={() => markOutOfStock(p._id)}>Mark Out of Stock</button>
          )}
          <button onClick={() => deleteProduct(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;
