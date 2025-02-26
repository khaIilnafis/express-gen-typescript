// @ts-nocheck - Template file, not meant to be validated directly
import { Router } from "express";
import { Server as SocketServer } from "socket.io";
import { ExampleRoutes } from "./example";

/**
 * Initialize all routes
 * @param io - Socket.io server instance (optional)
 */
export function initializeRoutes(io?: SocketServer): Router {
  const router = Router();

  // Base route
  router.get("/", (req, res) => {
    {{rootRouteHandler}}
  });

  // Register routes and pass socket server if available
  ExampleRoutes.create(router, io);

  return router;
}

export default initializeRoutes;
