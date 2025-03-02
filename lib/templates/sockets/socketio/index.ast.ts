/**
 * AST Template for websockets/socketio/index.ts
 * This file is processed by the AST template processor and generates the Socket.IO handler file
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../../types/setup.js";

const b = recast.types.builders;

/**
 * Generates the Socket.IO handler AST with provided options
 * @param options Template options
 * @returns AST for websockets/socketio/index.ts file
 */
export default function generateSocketIOHandlerAST(_options: GeneratorOptions) {
  // Build the imports section
  const imports = [
    b.importDeclaration(
      [
        b.importSpecifier(
          b.identifier("Server"),
          b.identifier("SocketIOServer"),
        ),
      ],
      b.stringLiteral("socket.io"),
    ),
  ];

  // Create setupSocketHandlers function
  const setupFunction = b.variableDeclaration("const", [
    b.variableDeclarator(
      b.identifier("setupSocketHandlers"),
      b.arrowFunctionExpression(
        [
          // io parameter with type annotation
          b.identifier("io"),
        ],
        b.blockStatement([
          // io.on("connection", (socket) => { ... });
          b.expressionStatement(
            b.callExpression(
              b.memberExpression(b.identifier("io"), b.identifier("on")),
              [
                b.stringLiteral("connection"),
                b.arrowFunctionExpression(
                  [b.identifier("socket")],
                  b.blockStatement([
                    // console.log("New client connected:", socket.id);
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(
                          b.identifier("console"),
                          b.identifier("log"),
                        ),
                        [
                          b.stringLiteral("New client connected:"),
                          b.memberExpression(
                            b.identifier("socket"),
                            b.identifier("id"),
                          ),
                        ],
                      ),
                    ),

                    // socket.on("message", (data) => { ... });
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(
                          b.identifier("socket"),
                          b.identifier("on"),
                        ),
                        [
                          b.stringLiteral("message"),
                          b.arrowFunctionExpression(
                            [b.identifier("data")],
                            b.blockStatement([
                              // console.log("Message received:", data);
                              b.expressionStatement(
                                b.callExpression(
                                  b.memberExpression(
                                    b.identifier("console"),
                                    b.identifier("log"),
                                  ),
                                  [
                                    b.stringLiteral("Message received:"),
                                    b.identifier("data"),
                                  ],
                                ),
                              ),

                              // socket.broadcast.emit("message", { ... });
                              b.expressionStatement(
                                b.callExpression(
                                  b.memberExpression(
                                    b.memberExpression(
                                      b.identifier("socket"),
                                      b.identifier("broadcast"),
                                    ),
                                    b.identifier("emit"),
                                  ),
                                  [
                                    b.stringLiteral("message"),
                                    b.objectExpression([
                                      b.objectProperty(
                                        b.identifier("user"),
                                        b.memberExpression(
                                          b.identifier("socket"),
                                          b.identifier("id"),
                                        ),
                                      ),
                                      b.objectProperty(
                                        b.identifier("text"),
                                        b.memberExpression(
                                          b.identifier("data"),
                                          b.identifier("text"),
                                        ),
                                      ),
                                      b.objectProperty(
                                        b.identifier("timestamp"),
                                        b.newExpression(
                                          b.identifier("Date"),
                                          [],
                                        ),
                                      ),
                                    ]),
                                  ],
                                ),
                              ),
                            ]),
                          ),
                        ],
                      ),
                    ),

                    // socket.on("disconnect", () => { ... });
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(
                          b.identifier("socket"),
                          b.identifier("on"),
                        ),
                        [
                          b.stringLiteral("disconnect"),
                          b.arrowFunctionExpression(
                            [],
                            b.blockStatement([
                              // console.log("Client disconnected:", socket.id);
                              b.expressionStatement(
                                b.callExpression(
                                  b.memberExpression(
                                    b.identifier("console"),
                                    b.identifier("log"),
                                  ),
                                  [
                                    b.stringLiteral("Client disconnected:"),
                                    b.memberExpression(
                                      b.identifier("socket"),
                                      b.identifier("id"),
                                    ),
                                  ],
                                ),
                              ),
                            ]),
                          ),
                        ],
                      ),
                    ),
                  ]),
                ),
              ],
            ),
          ),
        ]),
      ),
    ),
  ]);

  // Add type annotation to io parameter
  const declarator = setupFunction
    .declarations[0] as recast.types.namedTypes.VariableDeclarator;
  const arrowFunction =
    declarator.init as recast.types.namedTypes.ArrowFunctionExpression;
  const ioParam = arrowFunction.params[0] as recast.types.namedTypes.Identifier;

  ioParam.typeAnnotation = b.tsTypeAnnotation(
    b.tsTypeReference(b.identifier("SocketIOServer")),
  );

  // Add return type annotation to the arrow function
  arrowFunction.returnType = b.tsTypeAnnotation(b.tsVoidKeyword());

  // Create export declaration
  const exportDeclaration = b.exportNamedDeclaration(setupFunction, []);

  // Add JSDoc comment for the function
  //   const functionComment = b.commentBlock(
  //     "*\n * Setup Socket.io event handlers\n * @param io - Socket.io server instance\n ",
  //     true,
  //     false,
  //   );

  // Build the AST program
  const program = b.program([...imports, exportDeclaration]);

  // Return the AST program
  return program;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: recast.types.ASTNode): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
}
