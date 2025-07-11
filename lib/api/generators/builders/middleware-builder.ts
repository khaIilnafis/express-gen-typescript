/**
 * Middleware builder - generates middleware code from specifications
 */

import type { SingleMiddlewareSpec } from "../../../schemas/index.js";
import type { GenerationContext } from "../../types.js";

export async function buildMiddleware(
  spec: SingleMiddlewareSpec,
  _context: GenerationContext,
): Promise<string> {
  // TODO: Implement proper AST-based middleware generation
  // For now, generate basic middleware structure

  const parameters = spec.parameters
    .map((p) => `${p.name}: ${p.type}`)
    .join(", ");

  switch (spec.type) {
    case "application":
      return `import { Application } from 'express';

export function ${spec.name}(app: Application${parameters ? ", " + parameters : ""}) {
  // TODO: Implement application middleware
}`;

    case "route":
      return `import { Request, Response, NextFunction } from 'express';

export function ${spec.name}(${parameters ? parameters + ", " : ""}req: Request, res: Response, next: NextFunction) {
  // TODO: Implement route middleware
  next();
}`;

    case "error":
      return `import { Request, Response, NextFunction } from 'express';

export function ${spec.name}(err: Error, req: Request, res: Response, next: NextFunction) {
  // TODO: Implement error middleware
  res.status(500).json({ error: err.message });
}`;

    default:
      throw new Error(`Unsupported middleware type: ${spec.type}`);
  }
}
