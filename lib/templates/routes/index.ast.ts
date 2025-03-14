/**
 * AST Template for routes/index.ts
 * This file is processed by the AST template processor and generates the main routes file
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../types/index.js";
import { ROUTES_PRESET } from "../../presets/index.js";
import { astConfig } from "../../utils/builders/builder-config.js";
import { buildExpression } from "../../utils/builders/expressions.js";

const b = recast.types.builders;

/**
 * Generates the routes index AST with provided options
 * @param options Template options
 * @returns AST for routes/index.ts file
 */
export default function generateRoutesIndexAST(options: GeneratorOptions) {
  // Provide defaults for options
  const opts = {
    websocketLib: options.websocketLib || "none",
    viewEngine: options.viewEngine || "none",
    ...options,
  };

  // Build the imports section based on options
  const routeImports = astConfig.generateImports(ROUTES_PRESET.INDEX.imports);

  // Create the initializeRoutes function with appropriate parameters
  const functionParams: recast.types.namedTypes.Identifier[] = [];
  if (opts.websocketLib === "socketio") {
    const ioParam = b.identifier("io");
    ioParam.optional = true;
    ioParam.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier("SocketIOServer")),
    );
    functionParams.push(ioParam);
  } else if (opts.websocketLib === "ws") {
    const wssParam = b.identifier("wss");
    wssParam.typeAnnotation = b.tsTypeAnnotation(
      b.tsOptionalType(b.tsTypeReference(b.identifier("WebSocket.Server"))),
    );
    functionParams.push(wssParam);
  }

  // Create the function body using the route configuration
  const functionBody = [
    // Router declaration - const router = Router();
    buildExpression(ROUTES_PRESET.INDEX.router_declaration),

    // Root route handler
    buildExpression(ROUTES_PRESET.INDEX.root_handler),

    // Register example routes
    buildExpression(
      opts.websocketLib !== "none"
        ? ROUTES_PRESET.INDEX.example_routes_with_sockets
        : ROUTES_PRESET.INDEX.example_routes,
    ),

    // Return router
    buildExpression(ROUTES_PRESET.INDEX.return_router),
  ];

  // Create the initialize routes function
  const functionDecl = b.functionDeclaration(
    b.identifier("initializeRoutes"),
    functionParams,
    //@ts-expect-error recast type issues
    b.blockStatement(functionBody),
    false, // not async
    false, // not generator
  );

  // Set the return type
  functionDecl.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(b.identifier("Router")),
  );

  // Create the named export
  const initializeRoutes = b.exportNamedDeclaration(functionDecl, []);

  // Create default export
  const routeDefaultExport = b.exportDefaultDeclaration(
    b.identifier("initializeRoutes"),
  );

  // Build the AST program
  return b.program([...routeImports, initializeRoutes, routeDefaultExport]);
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: recast.types.ASTNode): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
}
