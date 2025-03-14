/**
 * AST Template for websockets/socketio/index.ts
 * This file is processed by the AST template processor and generates the Socket.IO handler file
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../../types/index.js";
import { SOCKETS } from "../../../presets/sockets.js";
import { astConfig } from "../../../utils/builders/builder-config.js";

/**
 * Generates the Socket.IO handler AST with provided options
 * @param options Template options
 * @returns AST for websockets/socketio/index.ts file
 */
export default function generateSocketIOHandlerAST(_options: GeneratorOptions) {
  const b = recast.types.builders;

  // Import Socket.IO
  const imports = astConfig.generateImports({
    SOCKETIO: SOCKETS.SOCKETIO.imports.SOCKETIO,
  });

  // Use the builder to convert the IR to an AST function declaration
  const fnDeclaration = astConfig.generateFunction(
    SOCKETS.SOCKETIO.setup_handlers,
  );

  // Create the export declaration
  const setupSocketHandlers = b.exportNamedDeclaration(fnDeclaration, []);

  // Return the program AST
  return b.program([...imports, setupSocketHandlers]);
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: recast.types.ASTNode): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
}
