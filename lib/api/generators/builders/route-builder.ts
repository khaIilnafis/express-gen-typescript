/**
 * Route builder - generates route code from specifications
 */

import type { SingleRouteSpec } from "../../../schemas/index.js";
import type { GenerationContext } from "../../types.js";

export async function buildRoute(
  spec: SingleRouteSpec,
  _context: GenerationContext,
): Promise<string> {
  // TODO: Implement proper AST-based route generation
  // For now, generate basic route structure

  const middlewares =
    spec.middlewares.length > 0 ? spec.middlewares.join(", ") + ", " : "";

  return `import { Router } from 'express';
import { ${spec.controller} } from '../controllers/${spec.controller.toLowerCase()}';

const router = Router();

router.${spec.method}('${spec.path}', ${middlewares}${spec.controller}.${spec.action});

export default router;`;
}
