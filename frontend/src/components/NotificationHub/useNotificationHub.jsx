import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import Cookies from "js-cookie";
import React from "react";

const useNotificationHub = () => {
  const [notifications, setNotifications] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = Cookies.get("_auth");
    if (!token) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:7226/notifications", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection
      .start()
      .then(() => {
        setConnected(true);
        console.log("✅ Connected to Notification Hub");

        connection.on("ReceiveNotification", (msg) => {
          console.log("📨 New notification:", msg);
          setNotifications((prev) => [msg, ...prev]);
        });
      })
      .catch((err) => {
        console.error("❌ SignalR Connection Error:", err);
      });

    return () => {
      connection.stop();
      console.log("🛑 Disconnected from Notification Hub");
    };
  }, []);

  return { notifications, connected };
};

export default useNotificationHub;
