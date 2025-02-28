/**
 * AST Template for database/prisma/index.ts
 * This file is processed by the AST template processor and generates the Prisma configuration
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';
import { IMPORTS } from '../../../constants/templates/server/index.js';

const b = recast.types.builders;

/**
 * Template options interface
 */
export interface TemplateOptions {
  [key: string]: any;
}

/**
 * Generates the Prisma configuration AST with provided options
 * @param options Template options
 * @returns AST for database/prisma/index.ts file
 */
export default function generatePrismaConfigAST(options: TemplateOptions = {}) {
  // Build the imports section
  const imports = [
    b.importDeclaration(
      [b.importSpecifier(b.identifier("PrismaClient"))],
      b.stringLiteral("@prisma/client")
    )
  ];

  // PrismaClient instance creation
  const prismaDeclaration = b.variableDeclaration("const", [
    b.variableDeclarator(
      b.identifier("prisma"),
      b.newExpression(
        b.identifier("PrismaClient"),
        [
          b.objectExpression([
            // log configuration
            b.objectProperty(
              b.identifier("log"),
              b.conditionalExpression(
                b.binaryExpression(
                  "===",
                  b.memberExpression(
                    b.memberExpression(b.identifier("process"), b.identifier("env")),
                    b.identifier("NODE_ENV")
                  ),
                  b.stringLiteral("development")
                ),
                b.arrayExpression([
                  b.stringLiteral("query"),
                  b.stringLiteral("error"),
                  b.stringLiteral("warn")
                ]),
                b.arrayExpression([
                  b.stringLiteral("error")
                ])
              )
            )
          ])
        ]
      )
    )
  ]);

  // Initialize database function
  const initializeFunction = b.exportNamedDeclaration(
    b.functionDeclaration(
      b.identifier(IMPORTS.DATABASE.INITIALIZE),
      [],
      b.blockStatement([
        // try-catch block
        b.tryStatement(
          b.blockStatement([
            // await prisma.$connect();
            b.expressionStatement(
              b.awaitExpression(
                b.callExpression(
                  b.memberExpression(b.identifier("prisma"), b.identifier("$connect")),
                  []
                )
              )
            ),
            
            // Register cleanup handler
            b.expressionStatement(
              b.callExpression(
                b.memberExpression(b.identifier("process"), b.identifier("on")),
                [
                  b.stringLiteral("SIGINT"),
                  b.arrowFunctionExpression(
                    [],
                    b.blockStatement([
                      b.expressionStatement(
                        b.awaitExpression(
                          b.callExpression(
                            b.memberExpression(b.identifier("prisma"), b.identifier("$disconnect")),
                            []
                          )
                        )
                      ),
                      b.expressionStatement(
                        b.callExpression(
                          b.memberExpression(b.identifier("process"), b.identifier("exit")),
                          [b.numericLiteral(0)]
                        )
                      )
                    ]),
                    true // async function
                  )
                ]
              )
            ),
            
            // return prisma;
            b.returnStatement(b.identifier("prisma"))
          ]),
          b.catchClause(
            b.identifier("error"),
            null,
            b.blockStatement([
              // console.error
              b.expressionStatement(
                b.callExpression(
                  b.memberExpression(b.identifier("console"), b.identifier("error")),
                  [
                    b.stringLiteral("Error connecting to database with Prisma:"),
                    b.identifier("error")
                  ]
                )
              ),
              
              // await prisma.$disconnect();
              b.expressionStatement(
                b.awaitExpression(
                  b.callExpression(
                    b.memberExpression(b.identifier("prisma"), b.identifier("$disconnect")),
                    []
                  )
                )
              ),
              
              // throw error;
              b.throwStatement(b.identifier("error"))
            ])
          )
        )
      ]),
      true, // async function
      false  // not a generator
    ),
    []
  );

  // Add return type annotation to initializeFunction
  const initFunction = initializeFunction.declaration as recast.types.namedTypes.FunctionDeclaration;
  initFunction.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.identifier("Promise"),
      b.tsTypeParameterInstantiation([
        b.tsTypeReference(b.identifier("PrismaClient"))
      ])
    )
  );

  // Close database connection function
  const closeConnectionFunction = b.exportNamedDeclaration(
    b.functionDeclaration(
      b.identifier("closeDatabaseConnection"),
      [],
      b.blockStatement([
        // await prisma.$disconnect();
        b.expressionStatement(
          b.awaitExpression(
            b.callExpression(
              b.memberExpression(b.identifier("prisma"), b.identifier("$disconnect")),
              []
            )
          )
        ),
        
        // console.log
        b.expressionStatement(
          b.callExpression(
            b.memberExpression(b.identifier("console"), b.identifier("log")),
            [b.stringLiteral("Prisma connection closed.")]
          )
        )
      ]),
      true, // async function
      false  // not a generator
    ),
    []
  );

  // Add return type annotation to closeConnectionFunction
  const closeFunction = closeConnectionFunction.declaration as recast.types.namedTypes.FunctionDeclaration;
  closeFunction.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.identifier("Promise"),
      b.tsTypeParameterInstantiation([
        b.tsVoidKeyword()
      ])
    )
  );

  // Register shutdown handlers
  const shutdownHandlers = [
    b.expressionStatement(
      b.callExpression(
        b.memberExpression(b.identifier("process"), b.identifier("on")),
        [b.stringLiteral("SIGINT"), b.identifier("handleShutdown")]
      )
    ),
    b.expressionStatement(
      b.callExpression(
        b.memberExpression(b.identifier("process"), b.identifier("on")),
        [b.stringLiteral("SIGTERM"), b.identifier("handleShutdown")]
      )
    )
  ];

  // handleShutdown function
  const handleShutdownFunction = b.functionDeclaration(
    b.identifier("handleShutdown"),
    [],
    b.blockStatement([
      // console.log
      b.expressionStatement(
        b.callExpression(
          b.memberExpression(b.identifier("console"), b.identifier("log")),
          [b.stringLiteral("Shutting down application...")]
        )
      ),
      
      // await closeDatabaseConnection();
      b.expressionStatement(
        b.awaitExpression(
          b.callExpression(
            b.identifier("closeDatabaseConnection"),
            []
          )
        )
      ),
      
      // process.exit(0);
      b.expressionStatement(
        b.callExpression(
          b.memberExpression(b.identifier("process"), b.identifier("exit")),
          [b.numericLiteral(0)]
        )
      )
    ]),
    true, // async function
    false  // not a generator
  );

  // Add return type annotation to handleShutdownFunction
  handleShutdownFunction.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.identifier("Promise"),
      b.tsTypeParameterInstantiation([
        b.tsVoidKeyword()
      ])
    )
  );

  // Export default
  const defaultExport = b.exportDefaultDeclaration(
    b.identifier("prisma")
  );

  // Build the AST program
  const program = b.program([
    ...imports,
    b.emptyStatement(),
    // Add JSDoc comment for prisma instance
    b.expressionStatement(b.stringLiteral("// Create a singleton PrismaClient instance")),
    prismaDeclaration,
    b.emptyStatement(),
    // Add JSDoc comment for initializeDatabase
    b.expressionStatement(b.stringLiteral(`
/**
 * Initialize Prisma client connection
 * @returns PrismaClient instance
 */`)),
    initializeFunction,
    // Add JSDoc comment for closeDatabaseConnection
    b.expressionStatement(b.stringLiteral(`
/**
 * Close the database connection
 */`)),
    closeConnectionFunction,
    b.emptyStatement(),
    // Add comment for shutdown handlers
    b.expressionStatement(b.stringLiteral("// Handle application shutdown")),
    ...shutdownHandlers,
    b.emptyStatement(),
    // Add JSDoc comment for handleShutdown
    b.expressionStatement(b.stringLiteral(`
/**
 * Handle application shutdown by closing database connections
 */`)),
    handleShutdownFunction,
    defaultExport
  ]);

  return program;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: any): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
} 