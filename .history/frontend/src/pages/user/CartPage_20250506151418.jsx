import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "../../utils/axios/useAxios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const api = useAxios();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = Cookies.get("token"); // assuming you're storing a token
        if (!token) {
          console.warn("User not logged in.");
          return;
        }

        const response = await api.get("/cart"); // replace with your real API endpoint
        setCartItems(response.data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, [api]);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: Rs. {item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
