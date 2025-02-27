/**
 * AST Template for models/sequelize/index.ts
 * This file is processed by the AST template processor and generates the Sequelize models index file
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';

const b = recast.types.builders;

/**
 * Helper function to create a properly configured export specifier
 * @param local - Local identifier
 * @param exported - Exported identifier
 * @returns Properly configured export specifier
 */
function createExportSpecifier(local: any, exported: any): any {
  // Use the .from() method to properly set all required properties
  return b.exportSpecifier.from({
    local: local,
    exported: exported
  });
}

/**
 * Template options interface
 */
export interface TemplateOptions {
  dialect?: string;
  databaseName?: string;
  [key: string]: any;
}

/**
 * Generates the Sequelize models index AST with provided options
 * @param options Template options
 * @returns AST for models/sequelize/index.ts file
 */
export default function generateSequelizeModelsIndexAST(options: TemplateOptions = {}) {
  // Get dialect from options or use default
  const dialect = options.dialect || 'postgres';
  
  // Get database name from options or use default
  const databaseName = options.databaseName || 'database';
  
  // Build the imports section
  const imports = [
    b.importDeclaration(
      [
        b.importSpecifier(b.identifier("Sequelize")),
        b.importSpecifier(b.identifier("Options"))
      ],
      b.stringLiteral("sequelize")
    ),
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("Example"))],
      b.stringLiteral("./Example")
    ),
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("config"))],
      b.stringLiteral("../config")
    )
  ];
  
  // Sequelize instance declaration
  const sequelizeDeclaration = b.variableDeclaration(
    "const",
    [
      b.variableDeclarator(
        b.identifier("dbConfig"),
        b.memberExpression(
          b.identifier("config"),
          b.identifier("database")
        )
      )
    ]
  );

  // Create member expressions for environment variables
  const processEnv = b.memberExpression(
    b.identifier("process"),
    b.identifier("env")
  );

  // Helper function to create optional member expression
  const createOptionalEnvVar = (varName: string) => {
    const memberExpr = b.memberExpression(
      processEnv,
      b.identifier(varName)
    );
    // Set optional flag through type assertion
    (memberExpr as any).optional = true;
    return memberExpr;
  };

  // Determine environment variables
  const envConfig = b.variableDeclaration(
    "const",
    [
      b.variableDeclarator(
        b.identifier("sequelizeOptions"),
        b.objectExpression([
          b.objectProperty(
            b.identifier("host"),
            createOptionalEnvVar("DB_HOST")
          ),
          b.objectProperty(
            b.identifier("port"),
            b.callExpression(
              b.identifier("Number"),
              [createOptionalEnvVar("DB_PORT")]
            )
          ),
          b.objectProperty(
            b.identifier("logging"),
            b.binaryExpression(
              "===",
              b.memberExpression(
                processEnv,
                b.identifier("NODE_ENV")
              ),
              b.stringLiteral("development")
            )
          ),
          b.spreadElement(
            b.identifier("dbConfig")
          )
        ])
      )
    ]
  );
  
  // Create Sequelize instance
  const sequelizeInstanceDeclaration = b.variableDeclaration(
    "const",
    [
      b.variableDeclarator(
        b.identifier("sequelize"),
        b.newExpression(
          b.identifier("Sequelize"),
          [
            b.memberExpression(
              processEnv,
              b.identifier("DB_NAME")
            ),
            b.memberExpression(
              processEnv,
              b.identifier("DB_USER")
            ),
            b.memberExpression(
              processEnv,
              b.identifier("DB_PASSWORD")
            ),
            b.identifier("sequelizeOptions")
          ]
        )
      )
    ]
  );

  // Add TypeScript type annotation to sequelize variable
  (sequelizeInstanceDeclaration.declarations[0] as any).id.typeAnnotation = 
    b.tsTypeAnnotation(
      b.tsTypeReference(
        b.identifier("Sequelize")
      )
    );

  // Initialize models with sequelize instance
  const modelInitialization = b.expressionStatement(
    b.callExpression(
      b.memberExpression(
        b.identifier("Example"),
        b.identifier("initialize")
      ),
      [b.identifier("sequelize")]
    )
  );
  
  // Export sequelize instance and models
  const exportSequelize = b.exportNamedDeclaration(
    null,
    [createExportSpecifier(
      b.identifier("sequelize"), 
      b.identifier("sequelize")
    )]
  );
  
  const exportModels = b.exportNamedDeclaration(
    null,
    [createExportSpecifier(
      b.identifier("Example"), 
      b.identifier("Example")
    )]
  );
  
  const exportDefault = b.exportDefaultDeclaration(
    b.objectExpression([
      b.objectProperty(b.identifier("sequelize"), b.identifier("sequelize")),
      b.objectProperty(b.identifier("Sequelize"), b.identifier("Sequelize")),
      b.objectProperty(b.identifier("Example"), b.identifier("Example"))
    ])
  );
  
  // Build the AST program
  const program = b.program([
    ...imports,
    sequelizeDeclaration,
    envConfig,
    sequelizeInstanceDeclaration,
    modelInitialization,
    exportSequelize,
    exportModels,
    exportDefault
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