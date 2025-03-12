/**
 * AST Template for routes/example.ts
 * This file is processed by the AST template processor and generates the example routes file
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../types/setup.js";
import { astConfig } from "../../utils/builders/index.js";
import { routesConfig } from "../../presets/routes.js";

const b = recast.types.builders;

/**
 * Generates the example routes AST with provided options
 * @param options Template options
 * @returns AST for routes/example.ts file
 */
export default function generateExampleRoutesAST(options: GeneratorOptions) {
  // Build the imports section based on options
  const routeImports = astConfig.generateImports(routesConfig.example.imports);
  // Add WebSocket imports if needed

  // Create the create method parameters
  const createMethodParams = [b.identifier("router")];

  // Add type annotation to router parameter
  createMethodParams[0].typeAnnotation = b.tsTypeAnnotation(
    b.tsTypeReference(b.identifier("Router")),
  );

  // Add WebSocket parameter if needed
  if (options.webSockets) {
    const ioParam = b.identifier("io");
    ioParam.optional = true; // Mark the parameter as optional
    ioParam.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier("SocketIOServer")),
    );
    createMethodParams.push(ioParam);
  }

  // Create the class body with the create method
  const createMethod = b.methodDefinition(
    "method",
    b.identifier("create"),
    b.functionExpression(
      null,
      createMethodParams,
      b.blockStatement([
        // Create controller instance with socket server if available
        b.variableDeclaration("const", [
          b.variableDeclarator(
            b.identifier("controller"),
            b.newExpression(
              b.identifier("ExampleController"),
              options.webSockets ? [b.identifier("io")] : [],
            ),
          ),
        ]),

        // Get all examples
        b.expressionStatement(
          b.callExpression(
            b.memberExpression(b.identifier("router"), b.identifier("get")),
            [
              b.stringLiteral("/examples"),
              b.memberExpression(
                b.identifier("controller"),
                b.identifier("getAll"),
              ),
            ],
          ),
        ),

        // Get example by ID
        b.expressionStatement(
          b.callExpression(
            b.memberExpression(b.identifier("router"), b.identifier("get")),
            [
              b.stringLiteral("/examples/:id"),
              b.memberExpression(
                b.identifier("controller"),
                b.identifier("getById"),
              ),
            ],
          ),
        ),

        // Create new example, with authentication if enabled
        b.expressionStatement(
          b.callExpression(
            b.memberExpression(b.identifier("router"), b.identifier("post")),
            options.authentication
              ? [
                  b.stringLiteral("/examples"),
                  b.callExpression(
                    b.memberExpression(
                      b.identifier("passport"),
                      b.identifier("authenticate"),
                    ),
                    [b.stringLiteral("jwt")],
                  ),
                  b.memberExpression(
                    b.identifier("controller"),
                    b.identifier("create"),
                  ),
                ]
              : [
                  b.stringLiteral("/examples"),
                  b.memberExpression(
                    b.identifier("controller"),
                    b.identifier("create"),
                  ),
                ],
          ),
        ),

        // Update example
        b.expressionStatement(
          b.callExpression(
            b.memberExpression(b.identifier("router"), b.identifier("put")),
            [
              b.stringLiteral("/examples/:id"),
              b.memberExpression(
                b.identifier("controller"),
                b.identifier("update"),
              ),
            ],
          ),
        ),

        // Delete example
        b.expressionStatement(
          b.callExpression(
            b.memberExpression(b.identifier("router"), b.identifier("delete")),
            [
              b.stringLiteral("/examples/:id"),
              b.memberExpression(
                b.identifier("controller"),
                b.identifier("delete"),
              ),
            ],
          ),
        ),
      ]),
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
