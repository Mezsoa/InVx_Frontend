import { createContext, useEffect, useState } from "react";
import { connect, disconnect } from "../../websocketService";

const WebsocketContext = createContext();

const WebsocketProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const localStorageUserId = localStorage.getItem("loggedInUserId") || "";

  useEffect(() => {
    if (!localStorageUserId) {
      console.error("User ID or JWT Token missing for WebSocket connection.");
      return;
    }

    const onMessage = (message) => {
      setNotifications((prev) => [...prev, message]);
    };

    connect(
      localStorageUserId,
      onMessage,
      () => { console.log("WebSocket connected for user:", localStorageUserId); },
      (error) => { console.error("WebSocket connection error:", error); }
    );

    return () => {
      disconnect();
    };
  }, [localStorageUserId]);

  return (
    <WebsocketContext.Provider value={{ notifications }}>
      {children}
    </WebsocketContext.Provider>
  );
};

export { WebsocketContext, WebsocketProvider };
