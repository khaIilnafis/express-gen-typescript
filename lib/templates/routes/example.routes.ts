// @ts-nocheck - Template file, not meant to be validated directly
import { Router } from "express";
import { ExampleController } from "../controllers/example";
import { Server as SocketServer } from "socket.io";
import passport from "../auth/passport";
export class ExampleRoutes {
  /**
   * Creates routes for example endpoints
   * @param router - Express router instance
   * @param io - Socket.io server instance (optional)
   */
  public static create(router: Router, io?: SocketServer): void {
    // Create controller instance with socket server if available
    const controller = new ExampleController(io);

    // Get all examples
    router.get("/examples", controller.getAll);

    // Get example by ID
    router.get("/examples/:id", controller.getById);

    // Create new example, will authentication
    router.post("/examples", passport.authenticate("jwt"), controller.create);

    // Update example
    router.put("/examples/:id", controller.update);

    // Delete example
    router.delete("/examples/:id", controller.delete);
  }
}

export default ExampleRoutes;
