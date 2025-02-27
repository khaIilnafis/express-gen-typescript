/**
 * AST Template for models/sequelize/Example.ts
 * This file is processed by the AST template processor and generates the Sequelize Example model
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';

const b = recast.types.builders;
const n = recast.types.namedTypes;

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
  [key: string]: any;
}

/**
 * Generates the Sequelize Example model AST with provided options
 * @param options Template options
 * @returns AST for models/sequelize/Example.ts file
 */
export default function generateSequelizeExampleModelAST(options: TemplateOptions = {}) {
  // Build the imports section
  const imports = [
    b.importDeclaration(
      [
        // Import DataTypes (and optionally Sequelize if needed)
        b.importSpecifier(b.identifier("DataTypes"))
      ],
      b.stringLiteral("sequelize")
    ),
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("sequelize"))],
      b.stringLiteral("../database")
    )
  ];

  // Create the Example define call as an expression statement
  const exampleDefine = b.variableDeclaration("const", [
    b.variableDeclarator(
      b.identifier("Example"),
      b.callExpression(
        b.memberExpression(b.identifier("sequelize"), b.identifier("define")),
        [
          b.stringLiteral("Example"),
          // Attributes object
          b.objectExpression([
            // id attribute
            b.objectProperty(
              b.identifier("id"),
              b.objectExpression([
                b.objectProperty(
                  b.identifier("type"),
                  b.memberExpression(b.identifier("DataTypes"), b.identifier("INTEGER"))
                ),
                b.objectProperty(
                  b.identifier("primaryKey"),
                  b.booleanLiteral(true)
                ),
                b.objectProperty(
                  b.identifier("autoIncrement"),
                  b.booleanLiteral(true)
                )
              ])
            ),
            // firstName attribute
            b.objectProperty(
              b.identifier("firstName"),
              b.objectExpression([
                b.objectProperty(
                  b.identifier("type"),
                  b.memberExpression(b.identifier("DataTypes"), b.identifier("STRING"))
                ),
                b.objectProperty(
                  b.identifier("allowNull"),
                  b.booleanLiteral(false)
                )
              ])
            ),
            // lastName attribute
            b.objectProperty(
              b.identifier("lastName"),
              b.objectExpression([
                b.objectProperty(
                  b.identifier("type"),
                  b.memberExpression(b.identifier("DataTypes"), b.identifier("STRING"))
                )
                // allowNull defaults to true if not specified
              ])
            ),
            // email attribute
            b.objectProperty(
              b.identifier("email"),
              b.objectExpression([
                b.objectProperty(
                  b.identifier("type"),
                  b.memberExpression(b.identifier("DataTypes"), b.identifier("STRING"))
                )
              ])
            )
          ]),
          // Options object (empty options, you can customize if needed)
          b.objectExpression([
            // You can insert options here; for now we leave a comment placeholder.
            // e.g., b.objectProperty(b.identifier("timestamps"), b.booleanLiteral(true))
          ])
        ]
      )
    )
  ]);

  // Create export default declaration
  const exportDefault = b.exportDefaultDeclaration(b.identifier("Example"));

  // Build the AST program
  const program = b.program([
    ...imports,
    exampleDefine,
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
