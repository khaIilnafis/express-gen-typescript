/**
 * Service builder - generates service code from specifications
 */

import type { ServiceSpec } from "../../../schemas/index.js";
import type { GenerationContext } from "../../types.js";

export async function buildService(
  spec: ServiceSpec,
  _context: GenerationContext,
): Promise<string> {
  // TODO: Implement proper AST-based service generation
  // For now, generate basic service structure

  const methods = spec.methods
    .map(
      (method) => `
  ${method.isStatic ? "static " : ""}${method.isAsync ? "async " : ""}${method.name}(${method.parameters.map((p) => `${p.name}: ${p.type}`).join(", ")}): ${method.returnType} {
    // TODO: Implement ${method.name} method
    throw new Error('${method.name} not implemented');
  }`,
    )
    .join("\n");

  return `export class ${spec.name} {${methods}
}`;
}
