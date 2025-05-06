import React, { useEffect, useState } from "react";
import useAxios from "../../utils/axios/useAxios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const { data: cartData, refetch } = useAxios("/api/Cart");  // Fetch cart data

  useEffect(() => {
    if (cartData) {
      setCartItems(cartData);
    }
  }, [cartData]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>🛒 Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.Id} style={{ marginBottom: "15px" }}>
              <strong>Book ID:</strong> {item.BookId} <br />
              <strong>Quantity:</strong> {item.Quantity} <br />
              <strong>Is Active:</strong> {item.IsActive ? "Yes" : "No"} <br />
              {/* Optionally, you could add more details like book title, image, etc. */}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => refetch()}  // Refetch the cart data when needed
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Refresh Cart
      </button>
    </div>
  );
};

export default CartPage;
