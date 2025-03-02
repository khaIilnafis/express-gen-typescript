/**
 * AST Template for routes/index.ts
 * This file is processed by the AST template processor and generates the main routes file
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../types/setup.js";

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
  const routeImports = [
    // Base import for Express Router
    b.importDeclaration(
      [b.importSpecifier(b.identifier("Router"))],
      b.stringLiteral("express"),
    ),
    // Import the example routes
    b.importDeclaration(
      [b.importSpecifier(b.identifier("ExampleRoutes"))],
      b.stringLiteral("./example"),
    ),
  ];
  console.log(opts.websocketLib);
  // Add WebSocket imports if needed
  if (opts.websocketLib === "socketio") {
    routeImports.push(
      b.importDeclaration(
        [
          b.importSpecifier(
            b.identifier("Server"),
            b.identifier("SocketIOServer"),
          ),
        ],
        b.stringLiteral("socket.io"),
      ),
    );
  } else if (opts.websocketLib === "ws") {
    routeImports.push(
      b.importDeclaration(
        [b.importDefaultSpecifier(b.identifier("WebSocket"))],
        b.stringLiteral("ws"),
      ),
    );
  }

  // Create the initializeRoutes function with appropriate parameters
  const functionParams: unknown[] = [];
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

  // Build the root route handler
  // Default JSON response
  const rootRouteHandler = b.blockStatement([
    b.expressionStatement(
      b.callExpression(
        b.memberExpression(b.identifier("res"), b.identifier("json")),
        [
          b.objectExpression([
            b.objectProperty(
              b.identifier("message"),
              b.stringLiteral("Welcome to Express TypeScript API"),
            ),
          ]),
        ],
      ),
    ),
  ]);

  // Create the function body
  const functionBody = [
    // const router = Router();
    b.variableDeclaration("const", [
      b.variableDeclarator(
        b.identifier("router"),
        b.callExpression(b.identifier("Router"), []),
      ),
    ]),

    // Base route handler
    b.expressionStatement(
      b.callExpression(
        b.memberExpression(b.identifier("router"), b.identifier("get")),
        [
          b.stringLiteral("/"),
          b.arrowFunctionExpression(
            [b.identifier("req"), b.identifier("res")],
            rootRouteHandler,
          ),
        ],
      ),
    ),

    // Register example routes
    b.expressionStatement(
      b.callExpression(
        b.memberExpression(
          b.identifier("ExampleRoutes"),
          b.identifier("create"),
        ),
        opts.websocketLib !== "none"
          ? [
              b.identifier("router"),
              b.identifier(opts.websocketLib === "socketio" ? "io" : "wss"),
            ]
          : [b.identifier("router")],
      ),
    ),

    // Return the router
    b.returnStatement(b.identifier("router")),
  ];

  // Create the initialize routes function
  const functionDecl = b.functionDeclaration(
    b.identifier("initializeRoutes"),
    //@ts-expect-error: recast type issues
    functionParams,
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
