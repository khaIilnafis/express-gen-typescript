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
        b.importSpecifier(b.identifier("DataTypes")),
        b.importSpecifier(b.identifier("Model")),
        b.importSpecifier(b.identifier("Optional"))
      ],
      b.stringLiteral("sequelize")
    ),
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier("sequelize"))],
      b.stringLiteral("../database")
    )
  ];

  // Create the ExampleAttributes interface
  const exampleInterface = b.tsInterfaceDeclaration(
    b.identifier("ExampleAttributes"),
    b.tsInterfaceBody([
      // id property
      b.tsPropertySignature(
        b.identifier("id"),
        b.tsTypeAnnotation(b.tsNumberKeyword())
      ),
      // title property
      b.tsPropertySignature(
        b.identifier("title"),
        b.tsTypeAnnotation(b.tsStringKeyword())
      ),
      // description property
      b.tsPropertySignature(
        b.identifier("description"),
        b.tsTypeAnnotation(b.tsStringKeyword())
      ),
      // status property
      b.tsPropertySignature(
        b.identifier("status"),
        b.tsTypeAnnotation(b.tsStringKeyword())
      ),
      // priority property
      b.tsPropertySignature(
        b.identifier("priority"),
        b.tsTypeAnnotation(b.tsNumberKeyword())
      ),
      // isActive property
      b.tsPropertySignature(
        b.identifier("isActive"),
        b.tsTypeAnnotation(b.tsBooleanKeyword())
      ),
      // createdAt property
      b.tsPropertySignature(
        b.identifier("createdAt"),
        b.tsTypeAnnotation(b.tsTypeReference(b.identifier("Date")))
      ),
      // updatedAt property
      b.tsPropertySignature(
        b.identifier("updatedAt"),
        b.tsTypeAnnotation(b.tsTypeReference(b.identifier("Date")))
      )
    ])
  );

  // Create the ExampleCreationAttributes interface
  const exampleCreationInterface = b.tsInterfaceDeclaration(
    b.identifier("ExampleCreationAttributes"),
    b.tsInterfaceBody([])
  );
  
  // Create heritage clause for ExampleCreationAttributes
  exampleCreationInterface.extends = [
    b.tsExpressionWithTypeArguments(
      b.identifier("Optional"),
      b.tsTypeParameterInstantiation([
        b.tsTypeReference(b.identifier("ExampleAttributes")),
        b.tsUnionType([
          b.tsLiteralType(b.stringLiteral("id")),
          b.tsLiteralType(b.stringLiteral("createdAt")),
          b.tsLiteralType(b.stringLiteral("updatedAt"))
        ])
      ])
    )
  ];

  // Create Example class that extends Model
  const exampleClass = b.classDeclaration(
    b.identifier("Example"),
    b.classBody([
      // id property
      b.classProperty(
        b.identifier("id"),
        null,
        b.tsTypeAnnotation(b.tsNumberKeyword()),
        false
      ),
      // title property
      b.classProperty(
        b.identifier("title"),
        null,
        b.tsTypeAnnotation(b.tsStringKeyword()),
        false
      ),
      // description property
      b.classProperty(
        b.identifier("description"),
        null,
        b.tsTypeAnnotation(b.tsStringKeyword()),
        false
      ),
      // status property
      b.classProperty(
        b.identifier("status"),
        null,
        b.tsTypeAnnotation(b.tsStringKeyword()),
        false
      ),
      // priority property
      b.classProperty(
        b.identifier("priority"),
        null,
        b.tsTypeAnnotation(b.tsNumberKeyword()),
        false
      ),
      // isActive property
      b.classProperty(
        b.identifier("isActive"),
        null,
        b.tsTypeAnnotation(b.tsBooleanKeyword()),
        false
      ),
      // createdAt property
      b.classProperty(
        b.identifier("createdAt"),
        null,
        b.tsTypeAnnotation(b.tsTypeReference(b.identifier("Date"))),
        false
      ),
      // updatedAt property
      b.classProperty(
        b.identifier("updatedAt"),
        null,
        b.tsTypeAnnotation(b.tsTypeReference(b.identifier("Date"))),
        false
      )
    ]),
    b.identifier("Model")
  );

  // Add implements clause to the Example class
  exampleClass.implements = [
    b.tsExpressionWithTypeArguments(
      b.identifier("ExampleAttributes")
    )
  ];

  // Add type parameters to the Example class extending Model
  const typeParams = [
    b.tsTypeParameter("ExampleAttributes"),
    b.tsTypeParameter("ExampleCreationAttributes")
  ];
  exampleClass.typeParameters = b.tsTypeParameterDeclaration(typeParams);

  // Create Example.init call
  const exampleInit = b.expressionStatement(
    b.callExpression(
      b.memberExpression(b.identifier("Example"), b.identifier("init")),
      [
        // First argument: attributes
        b.objectExpression([
          // id
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
          // title
          b.objectProperty(
            b.identifier("title"),
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
          // description
          b.objectProperty(
            b.identifier("description"),
            b.objectExpression([
              b.objectProperty(
                b.identifier("type"),
                b.memberExpression(b.identifier("DataTypes"), b.identifier("TEXT"))
              ),
              b.objectProperty(
                b.identifier("allowNull"),
                b.booleanLiteral(true)
              )
            ])
          ),
          // status
          b.objectProperty(
            b.identifier("status"),
            b.objectExpression([
              b.objectProperty(
                b.identifier("type"),
                b.callExpression(
                  b.memberExpression(
                    b.identifier("DataTypes"),
                    b.identifier("ENUM")
                  ),
                  [
                    b.stringLiteral("pending"),
                    b.stringLiteral("in-progress"),
                    b.stringLiteral("completed")
                  ]
                )
              ),
              b.objectProperty(
                b.identifier("defaultValue"),
                b.stringLiteral("pending")
              )
            ])
          ),
          // priority
          b.objectProperty(
            b.identifier("priority"),
            b.objectExpression([
              b.objectProperty(
                b.identifier("type"),
                b.memberExpression(b.identifier("DataTypes"), b.identifier("INTEGER"))
              ),
              b.objectProperty(
                b.identifier("defaultValue"),
                b.numericLiteral(1)
              )
            ])
          ),
          // isActive
          b.objectProperty(
            b.identifier("isActive"),
            b.objectExpression([
              b.objectProperty(
                b.identifier("type"),
                b.memberExpression(b.identifier("DataTypes"), b.identifier("BOOLEAN"))
              ),
              b.objectProperty(
                b.identifier("defaultValue"),
                b.booleanLiteral(true)
              )
            ])
          )
        ]),
        // Second argument: options
        b.objectExpression([
          b.objectProperty(
            b.identifier("sequelize"),
            b.identifier("sequelize")
          ),
          b.objectProperty(
            b.identifier("modelName"),
            b.stringLiteral("Example")
          ),
          b.objectProperty(
            b.identifier("tableName"),
            b.stringLiteral("examples")
          ),
          b.objectProperty(
            b.identifier("timestamps"),
            b.booleanLiteral(true)
          )
        ])
      ]
    )
  );

  // Create exports
  const exportExampleClass = b.exportDefaultDeclaration(b.identifier("Example"));
  
  const exportInterfaces = b.exportNamedDeclaration(
    null,
    [
      createExportSpecifier(
        b.identifier("ExampleAttributes"), 
        b.identifier("ExampleAttributes")
      ),
      createExportSpecifier(
        b.identifier("ExampleCreationAttributes"), 
        b.identifier("ExampleCreationAttributes")
      )
    ]
  );

  // Build the AST program
  const program = b.program([
    ...imports,
    exampleInterface,
    exampleCreationInterface,
    exampleClass,
    exampleInit,
    exportExampleClass,
    exportInterfaces
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