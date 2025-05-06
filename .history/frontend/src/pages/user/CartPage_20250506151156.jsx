import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import Cookies from "js-cookie";
import useAxios from "../../utils/axios/useAxios";
import useAxiosAuth from "../../utils/axios/useAxiosAuth";

const PlaceOrderTest = () => {
  const axiosAuth = useAxiosAuth();

  const [message, setMessage] = useState("");
  const [connection, setConnection] = useState(null);
  const [bookId, setBookId] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotificationList, setShowNotificationList] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [search, setSearch] = useState("");

  const { data: authorData, refetch } = useAxios(`author?page=${page}&search=${search}`);
  const { data: bookData } = useAxios(`book/list`);
  const { data: announcementData } = useAxios(`announcements`);

  useEffect(() => {
    const token = Cookies.get("_auth");

    if (!token) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:7226/notifications", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("✅ SignalR Connected");
        setMessage("Connected to SignalR Hub");

        newConnection.on("ReceiveNotification", (msg) => {
          console.log("📬 Notification received:", msg);
          setNotifications((prev) => [msg, ...prev]); // Add to list
          setEmailStatus("📧 Email sent and order placed!");
        });
      })
      .catch((err) => {
        console.error("❌ SignalR Error:", err);
        setMessage("Connection failed");
      });

    return () => {
      newConnection.stop();
      console.log("🛑 SignalR Disconnected");
    };
  }, []);

  const handlePlaceOrder = async () => {
    const token = Cookies.get("_auth");
    if (!token || !bookId) return alert("Token or Book ID missing.");

    try {
      await axiosAuth.post("/api/cart", { bookId });
      const orderResponse = await axiosAuth.post("/api/order/place");
      console.log("📦 Order Placed:", orderResponse.data);
      setEmailStatus("✅ Order placed, waiting for email...");
    } catch (error) {
      console.error("❌ Order Error:", error.response?.data || error.message);
      alert("Failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>🧪 Test Order + Email</h2>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => setShowNotificationList((prev) => !prev)} style={{ fontSize: "1.2rem" }}>
          🔔 Notifications ({notifications.length})
        </button>
        {showNotificationList && (
          <div
            style={{
              position: "absolute",
              right: "2rem",
              top: "5rem",
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              width: "300px",
              borderRadius: "8px",
              padding: "10px",
              zIndex: 10,
            }}
          >
            <strong>📨 Notification Center</strong>
            <ul style={{ maxHeight: "200px", overflowY: "auto", paddingLeft: 0 }}>
              {notifications.length === 0 ? (
                <li>No notifications</li>
              ) : (
                notifications.map((msg, idx) => (
                  <li key={idx} style={{ listStyle: "none", padding: "5px 0", borderBottom: "1px solid #eee" }}>
                    {msg}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      <label>📘 Enter Book ID to Add to Cart:</label>
      <input
        type="text"
        placeholder="e.g. cad94887-600d-4f5a-b80e-8ab0bd809c9c"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        style={{ width: "100%", padding: "8px", margin: "10px 0" }}
      />
      <button onClick={handlePlaceOrder} style={{ padding: "10px 20px" }}>
        📦 Place Order
      </button>

      <div style={{ marginTop: "20px" }}>
        <strong>Status:</strong> {message || "Not connected"}
      </div>
      <div>
        <strong>Email:</strong> {emailStatus || "Not sent yet"}
      </div>

      <hr style={{ margin: "2rem 0" }} />
      <h3>📚 Authors</h3>
      <input
        type="text"
        placeholder="🔍 Search author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && refetch()}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <ul>
        {authorData?.data?.map((author) => (
          <li key={author.id}>
            <strong>{author.name}</strong> — {author.email}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>⬅ Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next ➡</button>
      </div>
    </div>
  );
};

export default CartPage;