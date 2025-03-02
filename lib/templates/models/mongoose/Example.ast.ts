/**
 * AST Template for models/mongoose/Example.ts
 * This file is processed by the AST template processor and generates the mongoose example model
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../../types/setup.js";

const b = recast.types.builders;

/**
 * Generates the mongoose example model AST with provided options
 * @param options Template options
 * @returns AST for models/mongoose/Example.ts file
 */
export default function generateMongooseExampleModelAST(
  _options: GeneratorOptions,
) {
  // Build the imports section
  const imports = [
    b.importDeclaration(
      [
        b.importDefaultSpecifier(b.identifier("mongoose")),
        b.importSpecifier(b.identifier("Document")),
        b.importSpecifier(b.identifier("Schema")),
      ],
      b.stringLiteral("mongoose"),
    ),
  ];

  // Create the interface declaration
  const interfaceBody = [
    // title: string;
    b.tsPropertySignature(
      b.identifier("title"),
      b.tsTypeAnnotation(b.tsStringKeyword()),
    ),

    // description: string;
    b.tsPropertySignature(
      b.identifier("description"),
      b.tsTypeAnnotation(b.tsStringKeyword()),
    ),

    // status: "pending" | "in-progress" | "completed";
    b.tsPropertySignature(
      b.identifier("status"),
      b.tsTypeAnnotation(
        b.tsUnionType([
          b.tsLiteralType(b.stringLiteral("pending")),
          b.tsLiteralType(b.stringLiteral("in-progress")),
          b.tsLiteralType(b.stringLiteral("completed")),
        ]),
      ),
    ),

    // priority: number;
    b.tsPropertySignature(
      b.identifier("priority"),
      b.tsTypeAnnotation(b.tsNumberKeyword()),
    ),

    // isActive: boolean;
    b.tsPropertySignature(
      b.identifier("isActive"),
      b.tsTypeAnnotation(b.tsBooleanKeyword()),
    ),

    // createdAt: Date;
    b.tsPropertySignature(
      b.identifier("createdAt"),
      b.tsTypeAnnotation(b.tsTypeReference(b.identifier("Date"))),
    ),

    // updatedAt: Date;
    b.tsPropertySignature(
      b.identifier("updatedAt"),
      b.tsTypeAnnotation(b.tsTypeReference(b.identifier("Date"))),
    ),
  ];

  // Create the interface declaration
  const interfaceDeclaration = b.tsInterfaceDeclaration(
    b.identifier("IExample"),
    b.tsInterfaceBody(interfaceBody),
  );

  // Create heritage clause separately and set it
  (
    interfaceDeclaration as recast.types.namedTypes.TSInterfaceDeclaration
  ).extends = [b.tsExpressionWithTypeArguments(b.identifier("Document"))];

  // Add export to the interface
  const exportedInterfaceDeclaration = b.exportNamedDeclaration(
    interfaceDeclaration,
    [],
  );

  // Create the schema instantiation
  const schemaExpression = b.newExpression(b.identifier("Schema"), [
    // Schema definition object
    b.objectExpression([
      // title: { type: String, required: true, trim: true }
      b.objectProperty(
        b.identifier("title"),
        b.objectExpression([
          b.objectProperty(b.identifier("type"), b.identifier("String")),
          b.objectProperty(b.identifier("required"), b.booleanLiteral(true)),
          b.objectProperty(b.identifier("trim"), b.booleanLiteral(true)),
        ]),
      ),

      // description: { type: String, required: false, trim: true }
      b.objectProperty(
        b.identifier("description"),
        b.objectExpression([
          b.objectProperty(b.identifier("type"), b.identifier("String")),
          b.objectProperty(b.identifier("required"), b.booleanLiteral(false)),
          b.objectProperty(b.identifier("trim"), b.booleanLiteral(true)),
        ]),
      ),

      // status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending", required: true }
      b.objectProperty(
        b.identifier("status"),
        b.objectExpression([
          b.objectProperty(b.identifier("type"), b.identifier("String")),
          b.objectProperty(
            b.identifier("enum"),
            b.arrayExpression([
              b.stringLiteral("pending"),
              b.stringLiteral("in-progress"),
              b.stringLiteral("completed"),
            ]),
          ),
          b.objectProperty(b.identifier("default"), b.stringLiteral("pending")),
          b.objectProperty(b.identifier("required"), b.booleanLiteral(true)),
        ]),
      ),

      // priority: { type: Number, default: 1, required: true }
      b.objectProperty(
        b.identifier("priority"),
        b.objectExpression([
          b.objectProperty(b.identifier("type"), b.identifier("Number")),
          b.objectProperty(b.identifier("default"), b.numericLiteral(1)),
          b.objectProperty(b.identifier("required"), b.booleanLiteral(true)),
        ]),
      ),

      // isActive: { type: Boolean, default: true, required: true }
      b.objectProperty(
        b.identifier("isActive"),
        b.objectExpression([
          b.objectProperty(b.identifier("type"), b.identifier("Boolean")),
          b.objectProperty(b.identifier("default"), b.booleanLiteral(true)),
          b.objectProperty(b.identifier("required"), b.booleanLiteral(true)),
        ]),
      ),
    ]),

    // Schema options object
    b.objectExpression([
      b.objectProperty(b.identifier("timestamps"), b.booleanLiteral(true)),
    ]),
  ]);

  // Add type parameter to Schema instantiation
  (schemaExpression as recast.types.namedTypes.NewExpression).typeArguments =
    b.tsTypeParameterInstantiation([
      b.tsTypeReference(b.identifier("IExample")),
    ]) as unknown as recast.types.namedTypes.TypeParameterInstantiation;

  // Create the schema variable declaration
  const schemaDeclaration = b.variableDeclaration("const", [
    b.variableDeclarator(b.identifier("ExampleSchema"), schemaExpression),
  ]);

  // Create the model export declaration
  const modelExport = b.exportNamedDeclaration(
    b.variableDeclaration("const", [
      b.variableDeclarator(
        b.identifier("Example"),
        b.callExpression(
          b.memberExpression(b.identifier("mongoose"), b.identifier("model")),
          [b.stringLiteral("Example"), b.identifier("ExampleSchema")],
        ),
      ),
    ]),
    [],
  );

  // Add type parameter to model export
  //@ts-expect-error: issues with recast typing. will compile and work
  const modelCall = (modelExport.declaration as unknown).declarations[0].init;
  modelCall.typeParameters = b.tsTypeParameterInstantiation([
    b.tsTypeReference(b.identifier("IExample")),
  ]);

  // Create comments for documentation
  //   const interfaceComment = b.commentBlock(
  //     "*\n * Interface for Example document\n ",
  //     true,
  //     false,
  //   );

  //   const schemaComment = b.commentBlock("*\n * Example Schema\n ", true, false);

  // Build the AST program
  const program = b.program([
    ...imports,
    exportedInterfaceDeclaration,
    schemaDeclaration,
    modelExport,
  ]);

  // Add the comments
  // Note: In real implementation, you'd attach these comments to the nodes

  // Return the AST program
  return program;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: recast.types.ASTNode): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
}
