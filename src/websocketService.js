import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;

export const connect = (username, onMessageReceived, onConnected, onError) => {
  const socket = new SockJS("http://localhost:8080/ws");
  // this is the backend websocket endpoint
  stompClient = Stomp.over(socket);

  stompClient.connect(
    {},
    (frame) => {
      console.log("Websocket is Connected: ", frame);

      // när anslutningen lyckas prenumererar den på användarens
      // privata kanal (/user/{username}/private) för att ta emot meddelanden.
      stompClient.subscribe(`/user/${username}/private`, (message) => {
        console.log("Received WebSocket message: ", message);
        try {
          const parsedMessage = isJsonString(message.body)
            ? JSON.parse(message.body)
            : message.body;
          // hantera både JSON och plain text
          // vid mottagning av ett meddelande skickas det till callback-funktionen onMessageReceived
          onMessageReceived(parsedMessage);
        } catch (e) {
          console.error("Error processing WebSocket message", e);
        }
      });

      // callback onConnected körs när prenumerationen är klar
      if (onConnected) {
        onConnected();
      }
    },
    // vid fel körs den här callbacken
    (error) => {
      console.error("WebSocket connection error: ", error);
      if (onError) {
        onError(error);
      }
    }
  );
};

// metoden kopplar från websocket-anslutningen om den är aktiv
// om stompClient är ansluten, kopplas den bort och ett meddelande skrivs ut i konsolen
// om anslutningen inte finns, visas en varning om att ingen anslutning kan kopplas från.
export const disconnect = () => {
  if (stompClient !== null && stompClient.connected) {
    stompClient.disconnect(() => {
      console.log("WebSocket Disconnected");
    });
  } else {
    console.warn("WebSocket was not connected, cannot disconnect.");
  }
};




// hjälpfunktion
const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
