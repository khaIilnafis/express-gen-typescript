// @ts-nocheck - Template file, not meant to be validated directly
import { Request, Response, NextFunction } from "express";
import { Server as SocketServer } from "socket.io";

/**
 * Example model type for demonstration
 */
interface Example {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

/**
 * Factory function that creates a controller to get all examples
 * @param io - Socket server instance (optional)
 */
export function createGetAllController(io?: SocketServer) {
  return async function getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Example implementation - replace with actual data access
      const examples: Example[] = [
        {
          id: 1,
          name: "Example 1",
          description: "Description 1",
          isActive: true,
        },
        {
          id: 2,
          name: "Example 2",
          description: "Description 2",
          isActive: true,
        },
      ];

      // Example of using socket.io to emit an event if available
      if (io) {
        io.emit("examples:fetched", { count: examples.length });
      }

      res.json(examples);
    } catch (error) {
      console.error("Error fetching examples:", error);
      next(error);
    }
  };
}

/**
 * Factory function that creates a controller to get example by ID
 * @param io - Socket server instance (optional)
 */
export function createGetByIdController(io?: SocketServer) {
  return async function getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      // Example implementation - replace with actual data access
      const example: Example = {
        id,
        name: "Example " + id,
        description: "Description " + id,
        isActive: true,
      };

      // Example of using socket.io to emit an event if available
      if (io) {
        io.emit("example:fetched", { id });
      }

      res.json(example);
    } catch (error) {
      console.error("Error fetching example:", error);
      next(error);
    }
  };
}

/**
 * Factory function that creates a controller to create a new example
 * @param io - Socket server instance (optional)
 */
export function createCreateController(io?: SocketServer) {
  return async function create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, description, isActive } = req.body;

      // Example implementation - replace with actual data access
      const newExample: Example = {
        id: Date.now(),
        name,
        description,
        isActive: isActive !== undefined ? isActive : true,
      };

      // Example of using socket.io to emit an event if available
      if (io) {
        io.emit("example:created", newExample);
      }

      res.status(201).json(newExample);
    } catch (error) {
      console.error("Error creating example:", error);
      next(error);
    }
  };
}

/**
 * Factory function that creates a controller to update an example
 * @param io - Socket server instance (optional)
 */
export function createUpdateController(io?: SocketServer) {
  return async function update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const { name, description, isActive } = req.body;

      // Example implementation - replace with actual data access
      const updatedExample: Example = {
        id,
        name,
        description,
        isActive,
      };

      // Example of using socket.io to emit an event if available
      if (io) {
        io.emit("example:updated", updatedExample);
      }

      res.json(updatedExample);
    } catch (error) {
      console.error("Error updating example:", error);
      next(error);
    }
  };
}

/**
 * Factory function that creates a controller to delete an example
 * @param io - Socket server instance (optional)
 */
export function createDeleteController(io?: SocketServer) {
  return async function deleteExample(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      // Example implementation - replace with actual data access

      // Example of using socket.io to emit an event if available
      if (io) {
        io.emit("example:deleted", { id });
      }

      res.json({ message: `Example ${id} deleted successfully` });
    } catch (error) {
      console.error("Error deleting example:", error);
      next(error);
    }
  };
}
