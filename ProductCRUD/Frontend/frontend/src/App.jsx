// import { useEffect, useState } from "react";

// function App() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8080/backend/Products")
//       .then(res => res.json())
//       .then(data => setProducts(data))
//       .catch(err => console.error("Error:", err));
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Products</h1>

//       {products.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         products.map(product => (
//           <div key={product.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
//             <h3>{product.name}</h3>
//             <p>Price: ₹{product.price}</p>
//             <p>Quantity: {product.quantity}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch all products
  const fetchProducts = () => {
    fetch("http://localhost:8080/backend/Products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => {
        console.error(err);
        setErrorMsg("❌ Failed to fetch products");
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const addProduct = () => {
    if (!name || !price || !quantity) {
      setErrorMsg("❌ All fields are required");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    const newProduct = {
      name,
      price: Number(price),
      quantity: Number(quantity)
    };
    console.log("Sending:", newProduct);
    fetch("http://localhost:8080/backend/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add product");
        return res.json();
      })
      .then(() => {
        fetchProducts();
        setShowForm(false);
        setName("");
        setPrice("");
        setQuantity("");

        setSuccessMsg("✅ Product added successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch(() => {
        setErrorMsg("❌ Failed to add product");
        setTimeout(() => setErrorMsg(""), 3000);
      });
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Product Management</h1>

      {/* Success Message */}
      {successMsg && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px"
          }}
        >
          {successMsg}
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px"
          }}
        >
          {errorMsg}
        </div>
      )}

      <br />

      {/* Toggle Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          padding: "8px 15px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        {showForm ? "Cancel" : "Add Product"}
      </button>

      {/* Add Product Form */}
      {showForm && (
        <div style={{ marginTop: "20px" }}>
          <input
            placeholder="Product Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            placeholder="Quantity"
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <button
            onClick={addProduct}
            style={{
              padding: "6px 12px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Submit
          </button>
        </div>
      )}

      {/* Product List */}
      <div style={{ marginTop: "30px" }}>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map(product => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px"
              }}
            >
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;