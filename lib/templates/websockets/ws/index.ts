// @ts-nocheck - Template file, not meant to be validated directly
import WebSocket from "ws";

/**
 * Setup WebSocket event handlers
 * @param wss - WebSocket server instance
 */
export const setupWebSocketHandlers = (wss: WebSocket.Server): void => {
  wss.on("connection", (ws) => {
    console.log("New client connected");

    // Generate a unique ID for this connection
    const clientId = Date.now().toString();

    // Example message handler
    ws.on("message", (message: string) => {
      console.log(`Message received from ${clientId}: ${message}`);

      try {
        const parsedMessage = JSON.parse(message.toString());

        // Broadcast to all clients except sender
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                user: clientId,
                text: parsedMessage.text,
                timestamp: new Date(),
              })
            );
          }
        });
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    // Handle disconnect
    ws.on("close", () => {
      console.log(`Client ${clientId} disconnected`);
    });

    // Handle errors
    ws.on("error", (error) => {
      console.error(`WebSocket error for client ${clientId}:`, error);
    });
  });
};
