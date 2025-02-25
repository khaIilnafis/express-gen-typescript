// @ts-nocheck - Template file, not meant to be validated directly
import { Server as SocketIOServer } from "socket.io";

/**
 * Setup Socket.io event handlers
 * @param io - Socket.io server instance
 */
export const setupSocketHandlers = (io: SocketIOServer): void => {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Example event handler
    socket.on("message", (data) => {
      console.log("Message received:", data);

      // Broadcast to all clients except sender
      socket.broadcast.emit("message", {
        user: socket.id,
        text: data.text,
        timestamp: new Date(),
      });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
