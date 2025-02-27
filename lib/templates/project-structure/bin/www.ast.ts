/**
 * AST Template for bin/www.ts
 * This file is processed by the AST template processor and generates the entry point script for the Express application
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
 * Generates the bin/www AST with provided options
 * @param options Template options
 * @returns AST for bin/www.ts file
 */
export default function generateBinWwwAST(options: TemplateOptions = {}) {
  // Add shebang
  const shebang = b.expressionStatement(b.literal('#!/usr/bin/env ts-node'));
  shebang.comments = [{ type: 'CommentLine', value: '!', leading: true }];

  // Build the imports section
  const imports = [
    b.importDeclaration(
      [b.importSpecifier(b.identifier("Server"))],
      b.stringLiteral("../src/server")
    ),
    b.importDeclaration(
      [b.importSpecifier(b.identifier("AddressInfo"))],
      b.stringLiteral("net")
    )
  ];

  // Create normalizePort function
  const normalizePortFunction = b.functionDeclaration(
    b.identifier("normalizePort"),
    [b.identifier("val")],
    b.blockStatement([
      // const port = parseInt(val, 10)
      b.variableDeclaration("const", [
        b.variableDeclarator(
          b.identifier("port"),
          b.callExpression(
            b.identifier("parseInt"),
            [b.identifier("val"), b.numericLiteral(10)]
          )
        )
      ]),
      // if (isNaN(port)) { return val; }
      b.ifStatement(
        b.callExpression(b.identifier("isNaN"), [b.identifier("port")]),
        b.blockStatement([
          b.returnStatement(b.identifier("val"))
        ]),
        null
      ),
      // if (port >= 0) { return port; }
      b.ifStatement(
        b.binaryExpression(
          ">=",
          b.identifier("port"),
          b.numericLiteral(0)
        ),
        b.blockStatement([
          b.returnStatement(b.identifier("port"))
        ]),
        null
      ),
      // return false;
      b.returnStatement(b.booleanLiteral(false))
    ])
  );

  // Add normalizePort function return type annotation
  const normalizePortFnParams = normalizePortFunction.params[0] as recast.types.namedTypes.Identifier;
  normalizePortFnParams.typeAnnotation = b.tsTypeAnnotation(
    b.tsStringKeyword()
  );
  
  normalizePortFunction.returnType = b.tsTypeAnnotation(
    b.tsUnionType([
      b.tsNumberKeyword(),
      b.tsStringKeyword(),
      b.tsBooleanKeyword()
    ])
  );

  // Add normalizePort function JSDoc comment
  normalizePortFunction.comments = [
    b.commentBlock(
      "*\n * Normalize a port into a number, string, or false.\n ",
      true,
      false
    )
  ];

  // Create const port declaration
  const portDeclaration = b.variableDeclaration("const", [
    b.variableDeclarator(
      b.identifier("port"),
      b.callExpression(
        b.identifier("normalizePort"),
        [
          b.logicalExpression(
            "||",
            b.memberExpression(
              b.memberExpression(
                b.identifier("process"),
                b.identifier("env")
              ),
              b.identifier("PORT")
            ),
            b.stringLiteral("3000")
          )
        ]
      )
    )
  ]);

  // Add port declaration JSDoc comment
  portDeclaration.comments = [
    b.commentBlock(
      "*\n * Get port from environment and store in Express.\n ",
      true,
      false
    )
  ];

  // Create onError function
  const onErrorFunction = b.functionDeclaration(
    b.identifier("onError"),
    [b.identifier("error")],
    b.blockStatement([
      // if (error.syscall !== "listen") { throw error; }
      b.ifStatement(
        b.binaryExpression(
          "!==",
          b.memberExpression(
            b.identifier("error"),
            b.identifier("syscall")
          ),
          b.stringLiteral("listen")
        ),
        b.blockStatement([
          b.throwStatement(b.identifier("error"))
        ]),
        null
      ),
      // const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
      b.variableDeclaration("const", [
        b.variableDeclarator(
          b.identifier("bind"),
          b.conditionalExpression(
            b.binaryExpression(
              "===",
              b.unaryExpression("typeof", b.identifier("port")),
              b.stringLiteral("string")
            ),
            b.binaryExpression(
              "+",
              b.stringLiteral("Pipe "),
              b.identifier("port")
            ),
            b.binaryExpression(
              "+",
              b.stringLiteral("Port "),
              b.identifier("port")
            )
          )
        )
      ]),
      // switch (error.code) { case "EACCES": ... }
      b.switchStatement(
        b.memberExpression(
          b.identifier("error"),
          b.identifier("code")
        ),
        [
          // case "EACCES"
          b.switchCase(
            b.stringLiteral("EACCES"),
            [
              b.expressionStatement(
                b.callExpression(
                  b.memberExpression(
                    b.identifier("console"),
                    b.identifier("error")
                  ),
                  [
                    b.binaryExpression(
                      "+",
                      b.identifier("bind"),
                      b.stringLiteral(" requires elevated privileges")
                    )
                  ]
                )
              ),
              b.expressionStatement(
                b.callExpression(
                  b.memberExpression(
                    b.identifier("process"),
                    b.identifier("exit")
                  ),
                  [b.numericLiteral(1)]
                )
              ),
              b.breakStatement()
            ]
          ),
          // case "EADDRINUSE"
          b.switchCase(
            b.stringLiteral("EADDRINUSE"),
            [
              b.expressionStatement(
                b.callExpression(
                  b.memberExpression(
                    b.identifier("console"),
                    b.identifier("error")
                  ),
                  [
                    b.binaryExpression(
                      "+",
                      b.identifier("bind"),
                      b.stringLiteral(" is already in use")
                    )
                  ]
                )
              ),
              b.expressionStatement(
                b.callExpression(
                  b.memberExpression(
                    b.identifier("process"),
                    b.identifier("exit")
                  ),
                  [b.numericLiteral(1)]
                )
              ),
              b.breakStatement()
            ]
          ),
          // default
          b.switchCase(
            null,
            [
              b.throwStatement(b.identifier("error"))
            ]
          )
        ]
      )
    ])
  );

  // Add onError function parameter type annotation
  const onErrorFnParams = onErrorFunction.params[0] as recast.types.namedTypes.Identifier;
  onErrorFnParams.typeAnnotation = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.tsQualifiedName(
        b.identifier("NodeJS"),
        b.identifier("ErrnoException")
      )
    )
  );
  
  onErrorFunction.returnType = b.tsTypeAnnotation(
    b.tsVoidKeyword()
  );

  // Add onError function JSDoc comment
  onErrorFunction.comments = [
    b.commentBlock(
      "*\n * Event listener for HTTP server \"error\" event.\n ",
      true,
      false
    )
  ];

  // Create onListening function
  const onListeningFunction = b.functionDeclaration(
    b.identifier("onListening"),
    [],
    b.blockStatement([
      // const addr = server.address() as AddressInfo;
      b.variableDeclaration("const", [
        b.variableDeclarator(
          b.identifier("addr"),
          b.tsAsExpression(
            b.callExpression(
              b.memberExpression(
                b.identifier("server"),
                b.identifier("address")
              ),
              []
            ),
            b.tsTypeReference(
              b.identifier("AddressInfo")
            )
          )
        )
      ]),
      // const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
      b.variableDeclaration("const", [
        b.variableDeclarator(
          b.identifier("bind"),
          b.conditionalExpression(
            b.binaryExpression(
              "===",
              b.unaryExpression("typeof", b.identifier("addr")),
              b.stringLiteral("string")
            ),
            b.binaryExpression(
              "+",
              b.stringLiteral("pipe "),
              b.identifier("addr")
            ),
            b.binaryExpression(
              "+",
              b.stringLiteral("port "),
              b.memberExpression(
                b.identifier("addr"),
                b.identifier("port")
              )
            )
          )
        )
      ]),
      // console.log("Listening on " + bind);
      b.expressionStatement(
        b.callExpression(
          b.memberExpression(
            b.identifier("console"),
            b.identifier("log")
          ),
          [
            b.binaryExpression(
              "+",
              b.stringLiteral("Listening on "),
              b.identifier("bind")
            )
          ]
        )
      )
    ])
  );

  // Add onListening function return type annotation
  onListeningFunction.returnType = b.tsTypeAnnotation(
    b.tsVoidKeyword()
  );

  // Add onListening function JSDoc comment
  onListeningFunction.comments = [
    b.commentBlock(
      "*\n * Event listener for HTTP server \"listening\" event.\n ",
      true,
      false
    )
  ];

  // Create server declaration
  const serverDeclaration = b.variableDeclaration("const", [
    b.variableDeclarator(
      b.identifier("server"),
      b.callExpression(
        b.memberExpression(
          b.identifier("Server"),
          b.identifier("bootstrap")
        ),
        []
      )
    )
  ]);

  // Add server declaration JSDoc comment
  serverDeclaration.comments = [
    b.commentBlock(
      "*\n * Create HTTP server.\n ",
      true,
      false
    )
  ];

  // Create server.listen statement
  const listenStatement = b.expressionStatement(
    b.callExpression(
      b.memberExpression(
        b.identifier("server"),
        b.identifier("listen")
      ),
      [b.identifier("port")]
    )
  );

  // Create event listener statements
  const errorEventListener = b.expressionStatement(
    b.callExpression(
      b.memberExpression(
        b.memberExpression(
          b.identifier("server"),
          b.identifier("app")
        ),
        b.identifier("on")
      ),
      [
        b.stringLiteral("error"),
        b.identifier("onError")
      ]
    )
  );

  const listeningEventListener = b.expressionStatement(
    b.callExpression(
      b.memberExpression(
        b.memberExpression(
          b.identifier("server"),
          b.identifier("app")
        ),
        b.identifier("on")
      ),
      [
        b.stringLiteral("listening"),
        b.identifier("onListening")
      ]
    )
  );

  // Add JSDoc comment for listen statements
  listenStatement.comments = [
    b.commentBlock(
      "*\n * Listen on provided port, on all network interfaces.\n ",
      true,
      false
    )
  ];

  // Build the AST program
  const program = b.program([
    shebang,
    ...imports,
    normalizePortFunction,
    portDeclaration,
    onErrorFunction,
    onListeningFunction,
    serverDeclaration,
    listenStatement,
    errorEventListener,
    listeningEventListener
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