/**
 * AST Template for database/mongoose/index.ts
 * This file is processed by the AST template processor and generates the mongoose database configuration
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';
import { IMPORTS } from '../../../constants/templates/server/index.js';

const b = recast.types.builders;

/**
 * Template options interface
 */
export interface TemplateOptions {
  databaseName?: string;
  [key: string]: any;
}

/**
 * Generates the mongoose database index AST with provided options
 * @param options Template options
 * @returns AST for database/mongoose/index.ts file
 */
export default function generateMongooseIndexAST(options: TemplateOptions = {}) {
  // Provide defaults for options
  const opts = {
    databaseName: options.databaseName || "express_typescript_db",
    ...options
  };

  // Build the imports section
  const imports = [
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("mongoose"))],
      b.stringLiteral("mongoose")
    )
  ];

  // Create connection URI variable
  const mongoUriDeclaration = b.variableDeclaration("const", [
    b.variableDeclarator(
      b.identifier("mongoUri"),
      b.logicalExpression(
        "||",
        b.memberExpression(
          b.memberExpression(b.identifier("process"), b.identifier("env")),
          b.identifier("MONGODB_URI")
        ),
        b.stringLiteral(`mongodb://localhost:27017/${opts.databaseName}`)
      )
    )
  ]);

  // Create connection options
  const optionsDeclaration = b.variableDeclaration("const", [
    b.variableDeclarator(
      b.identifier("options"),
      b.objectExpression([
        b.objectProperty(
          b.identifier("useNewUrlParser"),
          b.booleanLiteral(true)
        ),
        b.objectProperty(
          b.identifier("useUnifiedTopology"),
          b.booleanLiteral(true)
        )
      ])
    )
  ]);

  // Create SIGINT handler for closing MongoDB connection
  const sigintHandler = b.expressionStatement(
    b.callExpression(
      b.memberExpression(b.identifier("process"), b.identifier("on")),
      [
        b.stringLiteral("SIGINT"),
        b.arrowFunctionExpression(
          [],
          b.blockStatement([
            b.tryStatement(
              b.blockStatement([
                b.expressionStatement(
                  b.awaitExpression(
                    b.callExpression(
                      b.memberExpression(
                        b.memberExpression(b.identifier("mongoose"), b.identifier("connection")),
                        b.identifier("close")
                      ),
                      []
                    )
                  )
                ),
                b.expressionStatement(
                  b.callExpression(
                    b.memberExpression(b.identifier("console"), b.identifier("log")),
                    [b.stringLiteral("Mongoose connection closed due to application termination")]
                  )
                ),
                b.expressionStatement(
                  b.callExpression(
                    b.memberExpression(b.identifier("process"), b.identifier("exit")),
                    [b.numericLiteral(0)]
                  )
                )
              ]),
              b.catchClause(
                b.identifier("err"),
                null,
                b.blockStatement([
                  b.expressionStatement(
                    b.callExpression(
                      b.memberExpression(b.identifier("console"), b.identifier("error")),
                      [
                        b.stringLiteral("Error closing Mongoose connection:"),
                        b.identifier("err")
                      ]
                    )
                  ),
                  b.expressionStatement(
                    b.callExpression(
                      b.memberExpression(b.identifier("process"), b.identifier("exit")),
                      [b.numericLiteral(1)]
                    )
                  ),
                ])
              )
            )
          ]),
          true // async
        )
      ]
    )
  );

  // Create initializeDatabase function
  const initializeDatabaseFunction = b.functionDeclaration(
    b.identifier(IMPORTS.DATABASE.INITIALIZE),
    [],
    b.blockStatement([
      b.tryStatement(
        b.blockStatement([
          b.expressionStatement(
            b.awaitExpression(
              b.callExpression(
                b.memberExpression(b.identifier("mongoose"), b.identifier("connect")),
                [
                  b.identifier("mongoUri"),
                  b.identifier("options")
                ]
              )
            )
          )
        ]),
        b.catchClause(
          b.identifier("error"),
          null,
          b.blockStatement([
            b.throwStatement(b.identifier("error"))
          ])
        )
      )
    ]),
    true, // async
    false // not generator
  );

  // Add return type annotation to initializeDatabase function
  initializeDatabaseFunction.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.tsQualifiedName(b.identifier("Promise"), b.identifier("typeof mongoose"))
    )
  );

  // Create export for initializeDatabase function
  const initializeDatabaseExport = b.exportNamedDeclaration(
    initializeDatabaseFunction,
    []
  );

  // Create default export for mongoose
  const defaultExport = b.exportDefaultDeclaration(
    b.identifier("mongoose")
  );

  // Build the AST program
  const program = b.program([
    ...imports,
    mongoUriDeclaration,
    optionsDeclaration,
    sigintHandler,
    initializeDatabaseExport,
    defaultExport
  ]);

  // Return the AST program
  return program;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: any): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
} 