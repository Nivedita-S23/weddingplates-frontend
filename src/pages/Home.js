import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { SlArrowLeft } from "react-icons/sl";
import "./Home.css"; // ✅ Import your CSS here

function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios
      .get("https://weddingplates-backend.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCategory = (cat) => {
    setCategory(cat);
    const filteredItems = products.filter(
      (p) => p.category && p.category.toLowerCase() === cat
    );
    setFiltered(filteredItems);
  };

  const categories = ["dolls", "plate", "gift", "jute"];

  const formatLabel = (cat) => {
    if (cat === "plate") return "Plate Decoration";
    if (cat === "jute") return "Jute Bags";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div>
      <div className="container">
        {!category ? (
          <div className="category-grid">
            {categories.map((cat) => (
              <div
                key={cat}
                className="category-tile"
                onClick={() => handleCategory(cat)}
              >
                <img
                  src={`/images/${cat}.jpg`}
                  alt={cat}
                  className="category-img"
                />
                <div className="category-label">{formatLabel(cat)} →</div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <SlArrowLeft onClick={() => setCategory("")} className="back-arrow" />
            <div className="product-grid">
              {filtered.length > 0 ? (
                filtered.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p>No products found in this category.</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
       Copyright © 2025 PV_Plates<br></br>
       Made by Nivedita
      </footer>
    </div>
  );
}

export default Home;
