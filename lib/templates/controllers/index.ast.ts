/**
 * AST Template for controllers/index.ts
 * This file is processed by the AST template processor and generates the controllers index file
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../types/setup.js";
import { CONTROLLER_CONFIG } from "../../presets/index.js";
import { astConfig } from "../../utils/builders/index.js";

const b = recast.types.builders;

/**
 * Generates the controllers index AST with provided options
 * @param options Template options
 * @returns AST for controllers/index.ts file
 */
export default function generateControllersIndexAST(
  _options: GeneratorOptions,
) {
  // Build the imports section
  const imports = astConfig.generateImports(
    CONTROLLER_CONFIG.controllerConfig.module.imports,
  );

  // Build the exports section
  const exports = astConfig.generateExports(
    CONTROLLER_CONFIG.controllerConfig.module.exports,
  ).NAMED;

  // Build the AST program
  const program = b.program([...imports, ...exports]);

  // Return the AST program
  return program;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: recast.types.ASTNode): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
}
