/**
 * Controller builder - generates controller code from specifications
 */

import type { ControllerSpec } from "../../../schemas/index.js";
import type { GenerationContext } from "../../types.js";

export async function buildController(
  spec: ControllerSpec,
  _context: GenerationContext,
): Promise<string> {
  // TODO: Implement proper AST-based controller generation
  // For now, generate basic controller structure

  const methods = spec.methods
    .map(
      (method) => `
  async ${method.name}(req: Request, res: Response): ${method.returnType} {
    // TODO: Implement ${method.name} method
    res.json({ message: '${method.name} not implemented' });
  }`,
    )
    .join("\n");

  return `import { Request, Response } from 'express';

export class ${spec.name} {${methods}
}`;
}
