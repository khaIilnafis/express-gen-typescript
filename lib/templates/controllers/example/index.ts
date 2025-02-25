// @ts-nocheck - Template file, not meant to be validated directly
import {
  createGetAllController,
  createGetByIdController,
  createCreateController,
  createUpdateController,
  createDeleteController,
} from "./exampleController";
import { Server as SocketServer } from "socket.io";

/**
 * Example controller class that centralizes all example-related controllers
 */
export class ExampleController {
  private readonly io?: SocketServer;

  /**
   * Create a new ExampleController instance
   * @param io - Socket server instance (optional)
   */
  constructor(io?: SocketServer) {
    this.io = io;
    this.getAll = createGetAllController(io);
    this.getById = createGetByIdController(io);
    this.create = createCreateController(io);
    this.update = createUpdateController(io);
    this.delete = createDeleteController(io);
  }

  /** Get all examples controller */
  getAll: ReturnType<typeof createGetAllController>;

  /** Get example by ID controller */
  getById: ReturnType<typeof createGetByIdController>;

  /** Create example controller */
  create: ReturnType<typeof createCreateController>;

  /** Update example controller */
  update: ReturnType<typeof createUpdateController>;

  /** Delete example controller */
  delete: ReturnType<typeof createDeleteController>;
}

export default ExampleController;
