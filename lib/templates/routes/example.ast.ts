/**
 * AST Template for routes/example.ts
 * This file is processed by the AST template processor and generates the example routes file
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../types/index.js";
import { ROUTES_PRESET } from "../../presets/index.js";
import { astConfig } from "../../utils/builders/builder-config.js";
import { buildExpression } from "../../utils/builders/expressions.js";

const b = recast.types.builders;

/**
 * Generates the example routes AST with provided options
 * @param options Template options
 * @returns AST for routes/example.ts file
 */
export default function generateExampleRoutesAST(options: GeneratorOptions) {
  // Build the imports section based on options
  const routeImports = astConfig.generateImports(ROUTES_PRESET.EXAMPLE.imports);

  // Create the create method parameters
  const createMethodParams = [b.identifier("router")];

  // Add type annotation to router parameter
  createMethodParams[0].typeAnnotation = b.tsTypeAnnotation(
    b.tsTypeReference(b.identifier("Router")),
  );

  // Add WebSocket parameter if needed
  if (options.websocketLib) {
    const ioParam = b.identifier("io");
    ioParam.optional = true; // Mark the parameter as optional
    ioParam.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier("SocketIOServer")),
    );
    createMethodParams.push(ioParam);
  }

  // Create the method body based on options
  const methodBody = [
    // Create controller instance with socket server if available
    options.websocketLib
      ? buildExpression(ROUTES_PRESET.EXAMPLE.controller_with_socket)
      : buildExpression(ROUTES_PRESET.EXAMPLE.controller_instance),

    // Get all examples
    buildExpression(ROUTES_PRESET.EXAMPLE.get_all_route),

    // Get example by ID
    buildExpression(ROUTES_PRESET.EXAMPLE.get_by_id_route),

    // Create new example, with authentication if enabled
    options.authentication
      ? buildExpression(ROUTES_PRESET.EXAMPLE.create_route_with_auth)
      : buildExpression(ROUTES_PRESET.EXAMPLE.create_route),

    // Update example
    buildExpression(ROUTES_PRESET.EXAMPLE.update_route),

    // Delete example
    buildExpression(ROUTES_PRESET.EXAMPLE.delete_route),
  ];

  // Create the class body with the create method
  const createMethod = b.methodDefinition(
    "method",
    b.identifier("create"),
    b.functionExpression(
      null,
      createMethodParams,
      //@ts-expect-error recast type issues
      b.blockStatement(methodBody), // Type assertion to fix TS error
    ),
    true, // static method
  );

  // Create the class body
  const classBody = b.classBody([createMethod]);

  // Create the class declaration
  const exampleRoutesClass = b.classDeclaration(
    b.identifier("ExampleRoutes"),
    classBody,
    null, // no superclass
  );

  // Create exports
  const namedExport = b.exportNamedDeclaration(exampleRoutesClass, []);

  const defaultExport = b.exportDefaultDeclaration(
    b.identifier("ExampleRoutes"),
  );

  // Build the AST program
  return b.program([...routeImports, namedExport, defaultExport]);
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: recast.types.ASTNode): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
}
