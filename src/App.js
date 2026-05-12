import React, { useState } from "react";
import "./App.css";

function App() {
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Clothing");
  const [result, setResult] = useState("");

  const getIcon = (category) => {
    switch (category) {
      case "Clothing": return "👕";
      case "Electronics": return "💻";
      case "Food": return "🍔";
      case "Furniture": return "🪑";
      case "Sports": return "⚽";
      default: return "📦";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      price: parseFloat(price),
      stock: parseFloat(stock),
      category_Clothing: 0,
      category_Electronics: 0,
      category_Food: 0,
      category_Furniture: 0,
      category_Sports: 0,
    };

    data[`category_${category}`] = 1;

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setResult(result.PredictedSales);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="card">

        {/* LEFT */}
        <div className="left">
          <span className="badge">✨ ML Insights</span>

          <h2 className="title">
            Predict your next sale with confidence.
          </h2>

          <p className="desc">
            Enter a product's price, stock and category — we'll estimate
            whether it's likely to sell.
          </p>

          <div className="categoryBox">
            <span className="icon">{getIcon(category)}</span>

            <div>
              <p className="smallText">Selected category</p>
              <strong>{category}</strong>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right">
          <form onSubmit={handleSubmit}>

            <div className="row">
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input"
                required
              />

              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="input"
                required
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
            >
              <option>Clothing</option>
              <option>Electronics</option>
              <option>Food</option>
              <option>Furniture</option>
              <option>Sports</option>
            </select>

            <button type="submit" className="button">
              Predict Sales →
            </button>

            {result !== "" && (
              <div className="resultBox">
                {result === 1 ? "Sale Likely ✅" : "No Sale ❌"}
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
}

export default App;