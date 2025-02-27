/**
 * AST Template for websockets/ws/index.ts
 * This file is processed by the AST template processor and generates the WebSocket handler file
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';

const b = recast.types.builders;

/**
 * Template options interface
 */
export interface TemplateOptions {
  [key: string]: any;
}

/**
 * Generates the WebSocket handler AST with provided options
 * @param options Template options
 * @returns AST for websockets/ws/index.ts file
 */
export default function generateWSHandlerAST(options: TemplateOptions = {}) {
  // Build the imports section
  const imports = [
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("WebSocket"))],
      b.stringLiteral("ws")
    )
  ];

  // Create setupWebSocketHandlers function
  const setupFunction = b.variableDeclaration("const", [
    b.variableDeclarator(
      b.identifier("setupWebSocketHandlers"),
      b.arrowFunctionExpression(
        [
          // wss parameter with type annotation
          b.identifier("wss")
        ],
        b.blockStatement([
          // wss.on("connection", (ws) => { ... });
          b.expressionStatement(
            b.callExpression(
              b.memberExpression(b.identifier("wss"), b.identifier("on")),
              [
                b.stringLiteral("connection"),
                b.arrowFunctionExpression(
                  [b.identifier("ws")],
                  b.blockStatement([
                    // console.log("New client connected");
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(b.identifier("console"), b.identifier("log")),
                        [b.stringLiteral("New client connected")]
                      )
                    ),
                    
                    // Generate a unique ID for this connection
                    // const clientId = Date.now().toString();
                    b.variableDeclaration("const", [
                      b.variableDeclarator(
                        b.identifier("clientId"),
                        b.callExpression(
                          b.memberExpression(
                            b.callExpression(
                              b.memberExpression(b.identifier("Date"), b.identifier("now")),
                              []
                            ),
                            b.identifier("toString")
                          ),
                          []
                        )
                      )
                    ]),
                    
                    // ws.on("message", (message: string) => { ... });
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(b.identifier("ws"), b.identifier("on")),
                        [
                          b.stringLiteral("message"),
                          b.arrowFunctionExpression(
                            [
                              // message parameter with type annotation
                              b.identifier("message")
                            ],
                            b.blockStatement([
                              // console.log message received
                              b.expressionStatement(
                                b.callExpression(
                                  b.memberExpression(b.identifier("console"), b.identifier("log")),
                                  [
                                    b.templateLiteral(
                                      [
                                        b.templateElement({ raw: "Message received from ", cooked: "Message received from " }, false),
                                        b.templateElement({ raw: ": ", cooked: ": " }, false),
                                        b.templateElement({ raw: "", cooked: "" }, true)
                                      ],
                                      [
                                        b.identifier("clientId"),
                                        b.identifier("message")
                                      ]
                                    )
                                  ]
                                )
                              ),
                              
                              // Try-catch block for JSON parsing
                              b.tryStatement(
                                b.blockStatement([
                                  // const parsedMessage = JSON.parse(message.toString());
                                  b.variableDeclaration("const", [
                                    b.variableDeclarator(
                                      b.identifier("parsedMessage"),
                                      b.callExpression(
                                        b.memberExpression(b.identifier("JSON"), b.identifier("parse")),
                                        [
                                          b.callExpression(
                                            b.memberExpression(b.identifier("message"), b.identifier("toString")),
                                            []
                                          )
                                        ]
                                      )
                                    )
                                  ]),
                                  
                                  // Broadcast to all clients except sender
                                  b.expressionStatement(
                                    b.callExpression(
                                      b.memberExpression(
                                        b.memberExpression(b.identifier("wss"), b.identifier("clients")),
                                        b.identifier("forEach")
                                      ),
                                      [
                                        b.arrowFunctionExpression(
                                          [b.identifier("client")],
                                          b.blockStatement([
                                            // if (client !== ws && client.readyState === WebSocket.OPEN) { ... }
                                            b.ifStatement(
                                              b.logicalExpression(
                                                "&&",
                                                b.binaryExpression(
                                                  "!==",
                                                  b.identifier("client"),
                                                  b.identifier("ws")
                                                ),
                                                b.binaryExpression(
                                                  "===",
                                                  b.memberExpression(b.identifier("client"), b.identifier("readyState")),
                                                  b.memberExpression(b.identifier("WebSocket"), b.identifier("OPEN"))
                                                )
                                              ),
                                              b.blockStatement([
                                                // client.send(JSON.stringify({ ... }));
                                                b.expressionStatement(
                                                  b.callExpression(
                                                    b.memberExpression(b.identifier("client"), b.identifier("send")),
                                                    [
                                                      b.callExpression(
                                                        b.memberExpression(b.identifier("JSON"), b.identifier("stringify")),
                                                        [
                                                          b.objectExpression([
                                                            b.objectProperty(
                                                              b.identifier("user"),
                                                              b.identifier("clientId")
                                                            ),
                                                            b.objectProperty(
                                                              b.identifier("text"),
                                                              b.memberExpression(b.identifier("parsedMessage"), b.identifier("text"))
                                                            ),
                                                            b.objectProperty(
                                                              b.identifier("timestamp"),
                                                              b.newExpression(b.identifier("Date"), [])
                                                            )
                                                          ])
                                                        ]
                                                      )
                                                    ]
                                                  )
                                                )
                                              ])
                                            )
                                          ])
                                        )
                                      ]
                                    )
                                  )
                                ]),
                                b.catchClause(
                                  b.identifier("error"),
                                  null,
                                  b.blockStatement([
                                    // console.error("Error parsing message:", error);
                                    b.expressionStatement(
                                      b.callExpression(
                                        b.memberExpression(b.identifier("console"), b.identifier("error")),
                                        [
                                          b.stringLiteral("Error parsing message:"),
                                          b.identifier("error")
                                        ]
                                      )
                                    )
                                  ])
                                )
                              )
                            ])
                          )
                        ]
                      )
                    ),
                    
                    // Handle disconnect
                    // ws.on("close", () => { ... });
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(b.identifier("ws"), b.identifier("on")),
                        [
                          b.stringLiteral("close"),
                          b.arrowFunctionExpression(
                            [],
                            b.blockStatement([
                              // console.log(`Client ${clientId} disconnected`);
                              b.expressionStatement(
                                b.callExpression(
                                  b.memberExpression(b.identifier("console"), b.identifier("log")),
                                  [
                                    b.templateLiteral(
                                      [
                                        b.templateElement({ raw: "Client ", cooked: "Client " }, false),
                                        b.templateElement({ raw: " disconnected", cooked: " disconnected" }, true)
                                      ],
                                      [b.identifier("clientId")]
                                    )
                                  ]
                                )
                              )
                            ])
                          )
                        ]
                      )
                    ),
                    
                    // Handle errors
                    // ws.on("error", (error) => { ... });
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(b.identifier("ws"), b.identifier("on")),
                        [
                          b.stringLiteral("error"),
                          b.arrowFunctionExpression(
                            [b.identifier("error")],
                            b.blockStatement([
                              // console.error(`WebSocket error for client ${clientId}:`, error);
                              b.expressionStatement(
                                b.callExpression(
                                  b.memberExpression(b.identifier("console"), b.identifier("error")),
                                  [
                                    b.templateLiteral(
                                      [
                                        b.templateElement({ raw: "WebSocket error for client ", cooked: "WebSocket error for client " }, false),
                                        b.templateElement({ raw: ":", cooked: ":" }, true)
                                      ],
                                      [b.identifier("clientId")]
                                    ),
                                    b.identifier("error")
                                  ]
                                )
                              )
                            ])
                          )
                        ]
                      )
                    )
                  ])
                )
              ]
            )
          )
        ])
      )
    )
  ]);

  // Add type annotations
  const declarator = setupFunction.declarations[0] as recast.types.namedTypes.VariableDeclarator;
  const arrowFunction = declarator.init as recast.types.namedTypes.ArrowFunctionExpression;
  
  // Add type annotation to wss parameter
  const wssParam = arrowFunction.params[0] as recast.types.namedTypes.Identifier;
  wssParam.typeAnnotation = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.tsQualifiedName(b.identifier("WebSocket"), b.identifier("Server"))
    )
  );
  
  // Add return type annotation to the arrow function
  arrowFunction.returnType = b.tsTypeAnnotation(
    b.tsVoidKeyword()
  );
  
  // Add type annotation to message parameter in the message handler
  const connectionHandler = (((((arrowFunction.body as recast.types.namedTypes.BlockStatement)
    .body[0] as recast.types.namedTypes.ExpressionStatement)
    .expression as recast.types.namedTypes.CallExpression)
    .arguments[1] as recast.types.namedTypes.ArrowFunctionExpression)
    .body as recast.types.namedTypes.BlockStatement)
    .body[2] as recast.types.namedTypes.ExpressionStatement;
    
  const messageHandler = ((connectionHandler.expression as recast.types.namedTypes.CallExpression)
    .arguments[1] as recast.types.namedTypes.ArrowFunctionExpression);
    
  const messageParam = messageHandler.params[0] as recast.types.namedTypes.Identifier;
  messageParam.typeAnnotation = b.tsTypeAnnotation(
    b.tsStringKeyword()
  );

  // Create export declaration
  const exportDeclaration = b.exportNamedDeclaration(
    setupFunction,
    []
  );
  
  // Add JSDoc comment for the function (not directly attached in AST)
  const functionComment = b.commentBlock(
    "*\n * Setup WebSocket event handlers\n * @param wss - WebSocket server instance\n ",
    true,
    false
  );

  // Build the AST program
  const program = b.program([
    ...imports,
    exportDeclaration
  ]);

  // Return the AST program
  return program;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: any): string {
  return recast.print(ast, { parser: tsParser }).code;
} 