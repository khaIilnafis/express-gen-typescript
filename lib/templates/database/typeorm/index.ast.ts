/**
 * AST Template for database/typeorm/index.ts
 * This file is processed by the AST template processor and generates the TypeORM configuration
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';

const b = recast.types.builders;

/**
 * Template options interface
 */
export interface TemplateOptions {
  dialect?: string;
  databaseName?: string;
  [key: string]: any;
}

/**
 * Generates the TypeORM configuration AST with provided options
 * @param options Template options
 * @returns AST for database/typeorm/index.ts file
 */
export default function generateTypeORMConfigAST(options: TemplateOptions = {}) {
  // Default values
  const dialect = options.dialect || 'postgres';
  const databaseName = options.databaseName || 'your_database';

  // Build the imports section
  const imports = [
    b.importDeclaration(
      [b.importSpecifier(b.identifier("DataSource"))],
      b.stringLiteral("typeorm")
    ),
    b.importDeclaration(
      [],
      b.stringLiteral("reflect-metadata")
    ),
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("path"))],
      b.stringLiteral("path")
    )
  ];

  // DataSource declaration
  const dataSourceDeclaration = b.exportNamedDeclaration(
    b.variableDeclaration("const", [
      b.variableDeclarator(
        b.identifier("AppDataSource"),
        b.newExpression(
          b.identifier("DataSource"),
          [
            b.objectExpression([
              // type
              b.objectProperty(
                b.identifier("type"),
                b.stringLiteral(dialect)
              ),
              // host
              b.objectProperty(
                b.identifier("host"),
                b.logicalExpression(
                  "||",
                  b.memberExpression(
                    b.memberExpression(b.identifier("process"), b.identifier("env")),
                    b.identifier("DB_HOST")
                  ),
                  b.stringLiteral("localhost")
                )
              ),
              // port
              b.objectProperty(
                b.identifier("port"),
                b.callExpression(
                  b.identifier("parseInt"),
                  [
                    b.logicalExpression(
                      "||",
                      b.memberExpression(
                        b.memberExpression(b.identifier("process"), b.identifier("env")),
                        b.identifier("DB_PORT")
                      ),
                      b.stringLiteral("3306")
                    ),
                    b.numericLiteral(10)
                  ]
                )
              ),
              // username
              b.objectProperty(
                b.identifier("username"),
                b.logicalExpression(
                  "||",
                  b.memberExpression(
                    b.memberExpression(b.identifier("process"), b.identifier("env")),
                    b.identifier("DB_USER")
                  ),
                  b.stringLiteral("root")
                )
              ),
              // password
              b.objectProperty(
                b.identifier("password"),
                b.logicalExpression(
                  "||",
                  b.memberExpression(
                    b.memberExpression(b.identifier("process"), b.identifier("env")),
                    b.identifier("DB_PASSWORD")
                  ),
                  b.stringLiteral("")
                )
              ),
              // database
              b.objectProperty(
                b.identifier("database"),
                b.logicalExpression(
                  "||",
                  b.memberExpression(
                    b.memberExpression(b.identifier("process"), b.identifier("env")),
                    b.identifier("DB_NAME")
                  ),
                  b.stringLiteral(databaseName)
                )
              ),
              // synchronize
              b.objectProperty(
                b.identifier("synchronize"),
                b.binaryExpression(
                  "!==",
                  b.memberExpression(
                    b.memberExpression(b.identifier("process"), b.identifier("env")),
                    b.identifier("NODE_ENV")
                  ),
                  b.stringLiteral("production")
                )
              ),
              // logging
              b.objectProperty(
                b.identifier("logging"),
                b.binaryExpression(
                  "===",
                  b.memberExpression(
                    b.memberExpression(b.identifier("process"), b.identifier("env")),
                    b.identifier("NODE_ENV")
                  ),
                  b.stringLiteral("development")
                )
              ),
              // entities
              b.objectProperty(
                b.identifier("entities"),
                b.arrayExpression([
                  b.callExpression(
                    b.memberExpression(b.identifier("path"), b.identifier("join")),
                    [
                      b.memberExpression(b.identifier("__dirname"), b.identifier("..")),
                      b.stringLiteral("entity/**/*.{ts,js}")
                    ]
                  )
                ])
              ),
              // migrations
              b.objectProperty(
                b.identifier("migrations"),
                b.arrayExpression([
                  b.callExpression(
                    b.memberExpression(b.identifier("path"), b.identifier("join")),
                    [
                      b.memberExpression(b.identifier("__dirname"), b.identifier("..")),
                      b.stringLiteral("migration/**/*.{ts,js}")
                    ]
                  )
                ])
              ),
              // subscribers
              b.objectProperty(
                b.identifier("subscribers"),
                b.arrayExpression([
                  b.callExpression(
                    b.memberExpression(b.identifier("path"), b.identifier("join")),
                    [
                      b.memberExpression(b.identifier("__dirname"), b.identifier("..")),
                      b.stringLiteral("subscriber/**/*.{ts,js}")
                    ]
                  )
                ])
              )
            ])
          ]
        )
      )
    ]),
    []
  );

  // Initialize database function
  const initializeFunction = b.exportNamedDeclaration(
    b.functionDeclaration(
      b.identifier("initializeDatabase"),
      [],
      b.blockStatement([
        // try-catch block
        b.tryStatement(
          b.blockStatement([
            // if (!AppDataSource.isInitialized) { ... }
            b.ifStatement(
              b.unaryExpression(
                "!",
                b.memberExpression(b.identifier("AppDataSource"), b.identifier("isInitialized"))
              ),
              b.blockStatement([
                // await AppDataSource.initialize();
                b.expressionStatement(
                  b.awaitExpression(
                    b.callExpression(
                      b.memberExpression(b.identifier("AppDataSource"), b.identifier("initialize")),
                      []
                    )
                  )
                )
              ])
            ),
            
            // return AppDataSource;
            b.returnStatement(b.identifier("AppDataSource"))
          ]),
          b.catchClause(
            b.identifier("error"),
            null,
            b.blockStatement([
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
        b.tsTypeReference(b.identifier("DataSource"))
      ])
    )
  );

  // Export default AppDataSource
  const defaultExport = b.exportDefaultDeclaration(
    b.identifier("AppDataSource")
  );

  // Build the AST program
  const program = b.program([
    ...imports,
    dataSourceDeclaration,
    // Add JSDoc comment for initializeDatabase as a comment block before the function
    b.expressionStatement(
      b.stringLiteral(`
/**
 * Initialize TypeORM connection
 * @returns DataSource instance
 */`)
    ),
    initializeFunction,
    defaultExport
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