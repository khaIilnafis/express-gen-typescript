/**
 * AST Template for database/sequelize/index.ts
 * This file is processed by the AST template processor and generates the Sequelize configuration
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';
import { DATABASE_COMMENTS } from '../../../constants/templates/index.js';

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
 * Generates the Sequelize configuration AST with provided options
 * @param options Template options
 * @returns AST for database/sequelize/index.ts file
 */
export default function generateSequelizeConfigAST(options: TemplateOptions = {}) {
  // Default values
  const dialect = options.dialect || 'postgres';
  const databaseName = options.databaseName || 'your_database';

  // Build the imports section
  const imports = [
    b.importDeclaration(
      [b.importSpecifier(b.identifier("Sequelize"))],
      b.stringLiteral("sequelize")
    ),
    b.importDeclaration(
      [],
      b.stringLiteral("dotenv/config")
    )
  ];

  // Sequelize instance creation
  const sequelizeDeclaration = b.variableDeclaration("const", [
    b.variableDeclarator(
      b.identifier("sequelize"),
      b.newExpression(
        b.identifier("Sequelize"),
        [
          b.objectExpression([
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
                    b.stringLiteral("5432")
                  )
                ]
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
            // user
            b.objectProperty(
              b.identifier("username"),
              b.logicalExpression(
                "||",
                b.memberExpression(
                  b.memberExpression(b.identifier("process"), b.identifier("env")),
                  b.identifier("DB_USER")
                ),
                b.stringLiteral("")
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
            // dialect
            b.objectProperty(
              b.identifier("dialect"),
              b.stringLiteral(dialect)
            ),
            // logging
            b.objectProperty(
              b.identifier("logging"),
              b.conditionalExpression(
                b.binaryExpression(
                  "===",
                  b.memberExpression(
                    b.memberExpression(b.identifier("process"), b.identifier("env")),
                    b.identifier("NODE_ENV")
                  ),
                  b.stringLiteral("development")
                ),
                b.memberExpression(b.identifier("console"), b.identifier("log")),
                b.booleanLiteral(false)
              )
            ),
            // define
            b.objectProperty(
              b.identifier("define"),
              b.objectExpression([
                b.objectProperty(
                  b.identifier("timestamps"),
                  b.booleanLiteral(true)
                )
              ])
            )
          ])
        ]
      )
    )
  ]);

  // Initialize database function
  const initializeFunction = b.functionDeclaration(
      b.identifier("initializeDatabase"),
      [],
      b.blockStatement([
        // try-catch block
        b.tryStatement(
          b.blockStatement([
            // await sequelize.authenticate();
            b.expressionStatement(
              b.awaitExpression(
                b.callExpression(
                  b.memberExpression(b.identifier("sequelize"), b.identifier("authenticate")),
                  []
                )
              )
            ),
            
            // console.log("Database connection has been established successfully.");
            b.expressionStatement(
              b.callExpression(
                b.memberExpression(b.identifier("console"), b.identifier("log")),
                [b.stringLiteral("Database connection has been established successfully.")]
              )
            ),
            
            // If not production, sync models
            b.ifStatement(
              b.binaryExpression(
                "!==",
                b.memberExpression(
                  b.memberExpression(b.identifier("process"), b.identifier("env")),
                  b.identifier("NODE_ENV")
                ),
                b.stringLiteral("production")
              ),
              b.blockStatement([
                // await sequelize.sync({ alter: true });
                b.expressionStatement(
                  b.awaitExpression(
                    b.callExpression(
                      b.memberExpression(b.identifier("sequelize"), b.identifier("sync")),
                      [
                        b.objectExpression([
                          b.objectProperty(
                            b.identifier("alter"),
                            b.booleanLiteral(true)
                          )
                        ])
                      ]
                    )
                  )
                ),
                
                // console.log("Database models synchronized successfully.");
                b.expressionStatement(
                  b.callExpression(
                    b.memberExpression(b.identifier("console"), b.identifier("log")),
                    [b.stringLiteral("Database models synchronized successfully.")]
                  )
                )
              ])
            )
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
      false, 
      false 
    );

  // Add return type annotation to initializeFunction
  const initFunction = initializeFunction;
  initFunction.returnType = b.tsTypeAnnotation(
    b.tsTypeReference(
      b.identifier("Promise"),
      b.tsTypeParameterInstantiation([
        b.tsTypeReference(b.identifier("void"))
      ])
    )
  );
  initFunction.async = true;
  // Export default sequelize
  const defaultExport = b.exportDefaultDeclaration(
    b.identifier("sequelize")
  );
  const exportInitialize = b.exportNamedDeclaration(initializeFunction, []);

  exportInitialize.comments = [b.commentBlock(DATABASE_COMMENTS.INITIALIZE_DATBASE, true)];
  // Build the AST program
  const program = b.program([
    ...imports,
    sequelizeDeclaration,
    exportInitialize,
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