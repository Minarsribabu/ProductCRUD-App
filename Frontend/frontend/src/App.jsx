import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/backend/Products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map(product => (
          <div key={product.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;