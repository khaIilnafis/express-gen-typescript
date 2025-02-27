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
          b.returnStatement(b.numericLiteral(3000))
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
      b.returnStatement(b.numericLiteral(3000))
    ])
  );

  // Add normalizePort function return type annotation
  const normalizePortFnParams = normalizePortFunction.params[0] as recast.types.namedTypes.Identifier;
  normalizePortFnParams.typeAnnotation = b.tsTypeAnnotation(
    b.tsStringKeyword()
  );
  
  normalizePortFunction.returnType = b.tsTypeAnnotation(b.tsNumberKeyword());

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
    serverDeclaration,
    listenStatement,
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