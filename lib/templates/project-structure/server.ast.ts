/**
 * AST Template for server.ts
 * This file is processed by the AST template processor and generates the main server file
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { COMMENTS } from "../constants/index.js";
import { GeneratorOptions } from "../../types/index.js";
import { astConfig } from "../../utils/builders/builder-config.js";
import { SERVER_PRESET } from "../../presets/index.js";
import { buildMethod } from "../../utils/builders/index.js";
const b = recast.types.builders;

/**
 * Function to conditionally add imports based on options
 * @returns Array of import declarations
 */
function getImports(_options: GeneratorOptions) {
  const imports = astConfig.generateImports(SERVER_PRESET.IMPORTS);

  return imports;
}

/**
 * Function to get class properties based on options
 */
function getClassProperties(options: GeneratorOptions) {
  const properties: unknown[] = [];
  const appProp = b.classProperty(
    b.identifier("app"),
    null,
    b.tsTypeAnnotation(b.tsTypeReference(b.identifier("Application"))),
  );
  appProp.access = "public";
  properties.push(appProp);
  const serverProp = b.classProperty(
    b.identifier("server"),
    null,
    b.tsTypeAnnotation(b.tsTypeReference(b.identifier("http.Server"))),
  );
  serverProp.access = "public";
  properties.push(serverProp);
  const portProp = b.classProperty(
    b.identifier("port"),
    null,
    b.tsTypeAnnotation(
      b.tsUnionType([b.tsNumberKeyword(), b.tsStringKeyword()]),
    ),
  );
  portProp.access = "public";
  properties.push(portProp);
  // Add WebSocket server property if using socket.io
  if (options.websocketLib === "socketio") {
    const ioProperty = b.classProperty(
      b.identifier("io!"),
      null,
      b.tsTypeAnnotation(b.tsTypeReference(b.identifier("SocketIOServer"))),
    );
    ioProperty.access = "public";
    properties.push(ioProperty);
  } else if (options.websocketLib === "ws") {
    const wssProperty = b.classProperty(
      b.identifier("wss"),
      null,
      b.tsTypeAnnotation(b.tsTypeReference(b.identifier("WebSocket.Server"))),
    );
    wssProperty.access = "public";
    properties.push(wssProperty);
  }

  // Add database client if using Prisma
  if (options.databaseOrm === "prisma") {
    const prismaProperty = b.classProperty(
      b.identifier("prisma"),
      null,
      b.tsTypeAnnotation(b.tsTypeReference(b.identifier("PrismaClient"))),
    );
    prismaProperty.access = "public";
    properties.push(prismaProperty);
  }

  return properties;
}

/**
 * Function to generate the router initialization code
 * @returns Expression statement for router initialization
 */
function getRouterInit(options: GeneratorOptions) {
  if (options.websocketLib === "socketio") {
    return b.variableDeclaration("const", [
      b.variableDeclarator(
        b.identifier("router"),
        b.callExpression(b.identifier("initializeRoutes"), [
          b.memberExpression(b.thisExpression(), b.identifier("io")),
        ]),
      ),
    ]);
  } else if (options.websocketLib === "ws") {
    return b.variableDeclaration("const", [
      b.variableDeclarator(
        b.identifier("router"),
        b.callExpression(b.identifier("initializeRoutes"), [
          b.memberExpression(b.thisExpression(), b.identifier("wss")),
        ]),
      ),
    ]);
  } else {
    return b.variableDeclaration("const", [
      b.variableDeclarator(
        b.identifier("router"),
        b.callExpression(b.identifier("initializeRoutes"), []),
      ),
    ]);
  }
}

/**
 * Function to get the view route handler
 * @returns Expression statement for view route handler or null if no view engine selected
 */
function getViewRouteHandler(options: GeneratorOptions) {
  if (options.viewEngine !== "none") {
    return b.expressionStatement(
      b.callExpression(
        b.memberExpression(
          b.memberExpression(b.thisExpression(), b.identifier("app")),
          b.identifier("get"),
        ),
        [
          b.stringLiteral("/"),
          b.arrowFunctionExpression(
            [b.identifier("req"), b.identifier("res")],
            b.blockStatement([
              b.expressionStatement(
                b.callExpression(
                  b.memberExpression(
                    b.identifier("res"),
                    b.identifier("render"),
                  ),
                  [
                    b.stringLiteral("index"),
                    b.objectExpression([
                      b.objectProperty(
                        b.identifier("title"),
                        b.stringLiteral("Express TypeScript App"),
                      ),
                    ]),
                  ],
                ),
              ),
            ]),
          ),
        ],
      ),
    );
  }
  // Return an empty statement as a fallback to prevent null return
  return b.emptyStatement();
}

// Gets the arrow function from getViewRouteHandler and adds type annotations to its parameters
function getTypedViewRouteHandler(options: GeneratorOptions) {
  if (options.viewEngine !== "none") {
    const exprStatement = getViewRouteHandler(options);
    if (exprStatement.type === "EmptyStatement") {
      return exprStatement;
    }

    // Get the call expression
    const callExpr = exprStatement.expression as unknown;

    // Get the arrow function (second argument of the call)
    //@ts-expect-error: recast type issues
    const arrowFunc = callExpr.arguments[1] as unknown;

    // Add type annotations to req and res parameters
    //@ts-expect-error: recast type issues
    const reqParam = arrowFunc.params[0];
    reqParam.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier("Request")),
    );
    //@ts-expect-error: recast type issues
    const resParam = arrowFunc.params[1];
    resParam.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(b.identifier("Response")),
    );

    return exprStatement;
  }
  // Return an empty statement as a fallback to prevent null return
  return b.emptyStatement();
}

/**
 * Helper function to add type annotations to route handler parameters
 * @param arrowFunc Arrow function expression to modify
 */
function addTypeAnnotationsToRouteHandler(arrowFunc: unknown) {
  // Add type annotations to route handler parameters if they exist
  //@ts-expect-error: recast type issues
  if (arrowFunc.params.length >= 2) {
    // Check if this is an error handler (4 parameters with first one named 'error')
    //@ts-expect-error: recast type issues
    if (arrowFunc.params.length >= 4 && arrowFunc.params[0].name === "error") {
      // error: any
      //@ts-expect-error: recast type issues
      const errorParam = arrowFunc.params[0];
      errorParam.typeAnnotation = b.tsTypeAnnotation(b.tsAnyKeyword());

      // req: Request (2nd parameter in error handler)
      //@ts-expect-error: recast type issues
      const reqParam = arrowFunc.params[1];
      reqParam.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier("Request")),
      );

      // res: Response (3rd parameter in error handler)
      //@ts-expect-error: recast type issues
      const resParam = arrowFunc.params[2];
      resParam.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier("Response")),
      );

      // next: NextFunction (4th parameter in error handler)
      //@ts-expect-error: recast type issues
      const nextParam = arrowFunc.params[3];
      nextParam.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier("NextFunction")),
      );
    } else {
      // Regular route handler
      // req: Request
      //@ts-expect-error: recast type issues
      const reqParam = arrowFunc.params[0];
      reqParam.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier("Request")),
      );

      // res: Response
      //@ts-expect-error: recast type issues
      const resParam = arrowFunc.params[1];
      resParam.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier("Response")),
      );

      // next: NextFunction (if present)
      //@ts-expect-error: recast type issues
      if (arrowFunc.params.length >= 3) {
        //@ts-expect-error: recast type issues
        const nextParam = arrowFunc.params[2];
        nextParam.typeAnnotation = b.tsTypeAnnotation(
          b.tsTypeReference(b.identifier("NextFunction")),
        );
      }
    }
  }
}

/**
 * Generates the server AST with provided options
 * @param options Template options
 * @returns AST for server.ts file
 */
export default function generateServerAST(opts: GeneratorOptions) {
  // Build the AST for our server.ts file
  return b.program([
    ...getImports(opts),
    // export class Server { ... }
    (() => {
      // Create the export declaration
      const exportDecl = b.exportNamedDeclaration(
        b.classDeclaration(
          b.identifier("Server"),
          b.classBody([
            // Class properties from options
            //@ts-expect-error: recast type issues
            ...getClassProperties(opts),
            // static bootstrap(): Server { return new Server(); }
            //@ts-expect-error: recast type issues
            (() => {
              const bootstrapMethod = astConfig.generateMethod(
                SERVER_PRESET.BOOSTRAP,
              );
              //   b.methodDefinition(
              //     "method",
              //     b.identifier("bootstrap"),
              //     b.functionExpression(
              //       null,
              //       [],
              //       b.blockStatement([
              //         b.returnStatement(
              //           b.newExpression(b.identifier("Server"), []),
              //         ),
              //       ]),
              //     ),
              //     true, // static method
              //   );
              bootstrapMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.BOOTSTRAP_METHOD, true),
              ];
              return bootstrapMethod;
            })(),
            // constructor() { ... }
            //@ts-expect-error: recast type issues
            (() => {
              //
              const constructorMethod = astConfig.generateConstructor(
                SERVER_PRESET.CONSTRUCTOR,
              );
              constructorMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.CONSTRUCTOR_METHOD, true),
              ];
              return constructorMethod;
            })(),
            // private initializeMiddlewares(): void { ... }
            //@ts-expect-error: recast type issues
            (() => {
              const middlewareMethod = buildMethod(SERVER_PRESET.MIDDLEWARE);
              middlewareMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.INITIALIZE_MIDDLEWARES, true),
              ];
              return middlewareMethod;
            })(),
            // Database method if needed
            //@ts-expect-error: recast type issues
            (() => {
              const dbMethod = astConfig.generateMethod(
                SERVER_PRESET.DB_CONNECT,
              );
              dbMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.CONNECT_DATABASE, true),
              ];
              return dbMethod;
            })(),
            // WebSocket method if needed
            //@ts-expect-error: recast type issues
            (() => {
              const wsMethod = astConfig.generateMethod(
                SERVER_PRESET.WEBSOCKETS,
              );
              wsMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.INITIALIZE_WEBSOCKETS, true),
              ];
              return wsMethod;
            })(),
            // ...(getWebSocketMethod(opts)
            //   ? [
            //       (() => {
            //         const wsMethod = getWebSocketMethod(opts);
            //         if (wsMethod) {

            //         }
            //         return wsMethod;
            //       })(),
            //     ]
            //   : []),
            // private initializeRoutes(): void { ... }
            //@ts-expect-error: recast type issues
            (() => {
              const initRoutesMethod = b.methodDefinition(
                "method",
                b.identifier("initializeRoutes"),
                b.functionExpression(
                  null,
                  [],
                  b.blockStatement([
                    // Initialize router with or without websocket server
                    getRouterInit(opts),
                    // this.app.use('/api', router);
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(
                          b.memberExpression(
                            b.thisExpression(),
                            b.identifier("app"),
                          ),
                          b.identifier("use"),
                        ),
                        [b.stringLiteral("/api"), b.identifier("router")],
                      ),
                    ),
                    // this.app.use("/api/*", (req, res) => { ... });
                    (() => {
                      const notFoundHandler = b.expressionStatement(
                        b.callExpression(
                          b.memberExpression(
                            b.memberExpression(
                              b.thisExpression(),
                              b.identifier("app"),
                            ),
                            b.identifier("use"),
                          ),
                          [
                            b.stringLiteral("/api/*"),
                            b.arrowFunctionExpression(
                              [b.identifier("req"), b.identifier("res")],
                              b.blockStatement([
                                b.expressionStatement(
                                  b.callExpression(
                                    b.memberExpression(
                                      b.callExpression(
                                        b.memberExpression(
                                          b.identifier("res"),
                                          b.identifier("status"),
                                        ),
                                        [b.numericLiteral(404)],
                                      ),
                                      b.identifier("json"),
                                    ),
                                    [
                                      b.objectExpression([
                                        b.objectProperty(
                                          b.identifier("error"),
                                          b.stringLiteral("Not Found"),
                                        ),
                                      ]),
                                    ],
                                  ),
                                ),
                              ]),
                            ),
                          ],
                        ),
                      );

                      // Add type annotations to route handler parameters
                      const callExpr = notFoundHandler.expression as unknown;
                      //@ts-expect-error: recast type issues
                      const arrowFunc = callExpr.arguments[1];
                      addTypeAnnotationsToRouteHandler(arrowFunc);

                      return notFoundHandler;
                    })(),
                    // Add view route handler if needed
                    ...(getTypedViewRouteHandler(opts)
                      ? [getTypedViewRouteHandler(opts)]
                      : []),
                  ]),
                ),
              );
              initRoutesMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.INITIALIZE_ROUTES, true),
              ];
              return initRoutesMethod;
            })(),
            // private initializeErrorHandling(): void { ... }
            //@ts-expect-error: recast type issues
            (() => {
              const errorHandlingMethod = b.methodDefinition(
                "method",
                b.identifier("initializeErrorHandling"),
                b.functionExpression(
                  null,
                  [],
                  b.blockStatement([
                    // 404 handler
                    (() => {
                      const notFoundHandler = b.expressionStatement(
                        b.callExpression(
                          b.memberExpression(
                            b.memberExpression(
                              b.thisExpression(),
                              b.identifier("app"),
                            ),
                            b.identifier("use"),
                          ),
                          [
                            b.arrowFunctionExpression(
                              [b.identifier("req"), b.identifier("res")],
                              b.blockStatement([
                                b.expressionStatement(
                                  b.callExpression(
                                    b.memberExpression(
                                      b.callExpression(
                                        b.memberExpression(
                                          b.identifier("res"),
                                          b.identifier("status"),
                                        ),
                                        [b.numericLiteral(404)],
                                      ),
                                      b.identifier("json"),
                                    ),
                                    [
                                      b.objectExpression([
                                        b.objectProperty(
                                          b.identifier("message"),
                                          b.stringLiteral("Not Found"),
                                        ),
                                      ]),
                                    ],
                                  ),
                                ),
                              ]),
                            ),
                          ],
                        ),
                      );

                      // Add type annotations to route handler parameters
                      const callExpr = notFoundHandler.expression as unknown;
                      //@ts-expect-error: recast type issues
                      const arrowFunc = callExpr.arguments[0];
                      addTypeAnnotationsToRouteHandler(arrowFunc);

                      return notFoundHandler;
                    })(),
                    // Global error handler
                    (() => {
                      const errorHandler = b.expressionStatement(
                        b.callExpression(
                          b.memberExpression(
                            b.memberExpression(
                              b.thisExpression(),
                              b.identifier("app"),
                            ),
                            b.identifier("use"),
                          ),
                          [
                            b.arrowFunctionExpression(
                              [
                                b.identifier("error"),
                                b.identifier("req"),
                                b.identifier("res"),
                                b.identifier("next"),
                              ],
                              b.blockStatement([
                                b.expressionStatement(
                                  b.callExpression(
                                    b.memberExpression(
                                      b.identifier("console"),
                                      b.identifier("error"),
                                    ),
                                    [b.identifier("error")],
                                  ),
                                ),
                                b.expressionStatement(
                                  b.callExpression(
                                    b.memberExpression(
                                      b.callExpression(
                                        b.memberExpression(
                                          b.identifier("res"),
                                          b.identifier("status"),
                                        ),
                                        [b.numericLiteral(500)],
                                      ),
                                      b.identifier("json"),
                                    ),
                                    [
                                      b.objectExpression([
                                        b.objectProperty(
                                          b.identifier("message"),
                                          b.stringLiteral(
                                            "Internal Server Error",
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
                      );

                      // Add type annotations to route handler parameters
                      const callExpr = errorHandler.expression as unknown;
                      //@ts-expect-error: recast type issues
                      const arrowFunc = callExpr.arguments[0];
                      addTypeAnnotationsToRouteHandler(arrowFunc);

                      return errorHandler;
                    })(),
                  ]),
                ),
              );
              errorHandlingMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.INITIALIZE_ERROR_HANDLING, true),
              ];
              return errorHandlingMethod;
            })(),
            // public listen(port: number): void { ... }
            //@ts-expect-error: recast type issues
            (() => {
              const errorHandlingBlock = b.blockStatement([
                // const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
                b.variableDeclaration("const", [
                  b.variableDeclarator(
                    b.identifier("bind"),
                    b.conditionalExpression(
                      b.binaryExpression(
                        "===",
                        b.unaryExpression("typeof", b.identifier("port"), true),
                        b.stringLiteral("string"),
                      ),
                      b.binaryExpression(
                        "+",
                        b.stringLiteral("Pipe "),
                        b.identifier("port"),
                      ),
                      b.binaryExpression(
                        "+",
                        b.stringLiteral("Port "),
                        b.identifier("port"),
                      ),
                    ),
                  ),
                ]),
                // switch (error.code) { ... }
                b.switchStatement(
                  b.memberExpression(b.identifier("err"), b.identifier("name")),
                  [
                    // case "EACCES":
                    b.switchCase(b.stringLiteral("EACCES"), [
                      b.expressionStatement(
                        b.callExpression(
                          b.memberExpression(
                            b.identifier("console"),
                            b.identifier("error"),
                          ),
                          [
                            b.binaryExpression(
                              "+",
                              b.identifier("bind"),
                              b.identifier("err.message"),
                            ),
                          ],
                        ),
                      ),
                      b.expressionStatement(
                        b.callExpression(
                          b.memberExpression(
                            b.identifier("process"),
                            b.identifier("exit"),
                          ),
                          [b.numericLiteral(1)],
                        ),
                      ),
                      b.breakStatement(),
                    ]),
                    // case "EADDRINUSE":
                    b.switchCase(b.stringLiteral("EADDRINUSE"), [
                      b.expressionStatement(
                        b.callExpression(
                          b.memberExpression(
                            b.identifier("console"),
                            b.identifier("error"),
                          ),
                          [
                            b.binaryExpression(
                              "+",
                              b.identifier("bind"),
                              b.identifier("err.message"),
                            ),
                          ],
                        ),
                      ),
                      b.expressionStatement(
                        b.callExpression(
                          b.memberExpression(
                            b.identifier("process"),
                            b.identifier("exit"),
                          ),
                          [b.numericLiteral(1)],
                        ),
                      ),
                      b.breakStatement(),
                    ]),
                    // default:
                    b.switchCase(null, [b.throwStatement(b.identifier("err"))]),
                  ],
                ),
              ]);

              const listenMethod = b.methodDefinition(
                "method",
                b.identifier("listen"),
                b.functionExpression(
                  null,
                  [b.identifier("port")],
                  b.blockStatement([
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(
                          b.memberExpression(
                            b.thisExpression(),
                            b.identifier("server"),
                          ),
                          b.identifier("listen"),
                        ),
                        [
                          b.identifier("port"),
                          b.arrowFunctionExpression(
                            [],
                            b.blockStatement([
                              b.expressionStatement(
                                b.callExpression(
                                  b.memberExpression(
                                    b.identifier("console"),
                                    b.identifier("log"),
                                  ),
                                  [
                                    b.templateLiteral(
                                      [
                                        b.templateElement(
                                          {
                                            raw: "Server running on port ",
                                            cooked: "Server running on port ",
                                          },
                                          false,
                                        ),
                                        b.templateElement(
                                          { raw: "", cooked: "" },
                                          true,
                                        ),
                                      ],
                                      [b.identifier("port")],
                                    ),
                                  ],
                                ),
                              ),
                            ]),
                          ),
                        ],
                      ),
                    ),
                    b.expressionStatement(
                      b.callExpression(
                        b.memberExpression(
                          b.memberExpression(
                            b.thisExpression(),
                            b.identifier("server"),
                          ),
                          b.identifier("on"),
                        ),
                        [
                          b.stringLiteral("error"),
                          b.arrowFunctionExpression(
                            [b.identifier("err")],
                            errorHandlingBlock,
                          ),
                        ],
                      ),
                    ),
                  ]),
                ),
              );

              // Add type annotation to port parameter
              const portParam = listenMethod.value.params[0] as unknown;
              //@ts-expect-error: recast type issues
              portParam.typeAnnotation = b.tsTypeAnnotation(
                b.tsNumberKeyword(),
              );

              // Add return type annotation to the method
              listenMethod.value.returnType = b.tsTypeAnnotation(
                b.tsVoidKeyword(),
              );

              listenMethod.comments = [
                b.commentBlock(COMMENTS.SERVER.LISTEN_METHOD, true),
              ];
              return listenMethod;
            })(),
          ]),
          null, // no superclass
        ),
        [],
      );

      // Add the server class comment to the export declaration, not the class
      exportDecl.comments = [
        b.commentBlock(COMMENTS.SERVER.SERVER_CLASS, true),
      ];

      return exportDecl;
    })(),
  ]);
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: recast.types.ASTNode): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
}
