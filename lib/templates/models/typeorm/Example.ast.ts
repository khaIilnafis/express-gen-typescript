import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../../types/setup.js";
const b = recast.types.builders;

export function generateTypeORMExampleEntityAST(
  _options: GeneratorOptions,
): recast.types.namedTypes.Program {
  // Imports section
  const imports = [
    b.importDeclaration(
      [
        b.importSpecifier(b.identifier("Entity")),
        b.importSpecifier(b.identifier("PrimaryGeneratedColumn")),
        b.importSpecifier(b.identifier("Column")),
        b.importSpecifier(b.identifier("CreateDateColumn")),
        b.importSpecifier(b.identifier("UpdateDateColumn")),
      ],
      b.stringLiteral("typeorm"),
    ),
  ];

  // Class properties with decorators directly added
  const classProperties = [
    // id property with PrimaryGeneratedColumn decorator
    b.classProperty(
      b.identifier("id"),
      null,
      b.tsTypeAnnotation(b.tsNumberKeyword()),
      false,
    ),

    // title property with Column decorator
    b.classProperty(
      b.identifier("title"),
      null,
      b.tsTypeAnnotation(b.tsStringKeyword()),
      false,
    ),

    // description property with Column({ nullable: true, type: "text" }) decorator
    b.classProperty(
      b.identifier("description"),
      null,
      b.tsTypeAnnotation(b.tsStringKeyword()),
      false,
    ),

    // status property with Column enum decorator
    b.classProperty(
      b.identifier("status"),
      null,
      b.tsTypeAnnotation(
        b.tsUnionType([
          b.tsLiteralType(b.stringLiteral("pending")),
          b.tsLiteralType(b.stringLiteral("in-progress")),
          b.tsLiteralType(b.stringLiteral("completed")),
        ]),
      ),
      false,
    ),

    // priority property with Column({ default: 1 }) decorator
    b.classProperty(
      b.identifier("priority"),
      null,
      b.tsTypeAnnotation(b.tsNumberKeyword()),
      false,
    ),

    // isActive property with Column({ default: true }) decorator
    b.classProperty(
      b.identifier("isActive"),
      null,
      b.tsTypeAnnotation(b.tsBooleanKeyword()),
      false,
    ),

    // createdAt property with CreateDateColumn decorator
    b.classProperty(
      b.identifier("createdAt"),
      null,
      b.tsTypeAnnotation(b.tsTypeReference(b.identifier("Date"))),
      false,
    ),

    // updatedAt property with UpdateDateColumn decorator
    b.classProperty(
      b.identifier("updatedAt"),
      null,
      b.tsTypeAnnotation(b.tsTypeReference(b.identifier("Date"))),
      false,
    ),
  ];

  // Manually add decorators to each property
  // id property
  //@ts-expect-error: recast issues, will resolve
  (classProperties[0] as unknown).decorators = [
    b.decorator(b.callExpression(b.identifier("PrimaryGeneratedColumn"), [])),
  ];

  // title property
  //@ts-expect-error: recast issues, will resolve
  (classProperties[1] as unknown).decorators = [
    b.decorator(b.callExpression(b.identifier("Column"), [])),
  ];

  // description property
  //@ts-expect-error: recast issues, will resolve
  (classProperties[2] as unknown).decorators = [
    b.decorator(
      b.callExpression(b.identifier("Column"), [
        b.objectExpression([
          b.objectProperty(b.identifier("nullable"), b.booleanLiteral(true)),
          b.objectProperty(b.identifier("type"), b.stringLiteral("text")),
        ]),
      ]),
    ),
  ];

  // status property
  //@ts-expect-error: recast issues, will resolve
  (classProperties[3] as unknown).decorators = [
    b.decorator(
      b.callExpression(b.identifier("Column"), [
        b.objectExpression([
          b.objectProperty(b.identifier("type"), b.stringLiteral("enum")),
          b.objectProperty(
            b.identifier("enum"),
            b.arrayExpression([
              b.stringLiteral("pending"),
              b.stringLiteral("in-progress"),
              b.stringLiteral("completed"),
            ]),
          ),
          b.objectProperty(b.identifier("default"), b.stringLiteral("pending")),
        ]),
      ]),
    ),
  ];

  // priority property
  //@ts-expect-error: recast issues, will resolve
  (classProperties[4] as unknown).decorators = [
    b.decorator(
      b.callExpression(b.identifier("Column"), [
        b.objectExpression([
          b.objectProperty(b.identifier("default"), b.numericLiteral(1)),
        ]),
      ]),
    ),
  ];

  // isActive property
  //@ts-expect-error: recast issues, will resolve
  (classProperties[5] as unknown).decorators = [
    b.decorator(
      b.callExpression(b.identifier("Column"), [
        b.objectExpression([
          b.objectProperty(b.identifier("default"), b.booleanLiteral(true)),
        ]),
      ]),
    ),
  ];

  // createdAt property
  //@ts-expect-error: recast issues, will resolve
  (classProperties[6] as unknown).decorators = [
    b.decorator(b.callExpression(b.identifier("CreateDateColumn"), [])),
  ];

  // updatedAt property
  //@ts-expect-error: recast issues, will resolve
  (classProperties[7] as unknown).decorators = [
    b.decorator(b.callExpression(b.identifier("UpdateDateColumn"), [])),
  ];

  // Entity decorator
  const entityDecorator = b.decorator(
    b.callExpression(b.identifier("Entity"), [b.stringLiteral("examples")]),
  );

  // Example class definition
  const exampleClass = b.classDeclaration(
    b.identifier("Example"),
    b.classBody(classProperties),
  );

  // Add decorator to class
  //@ts-expect-error: recast issues, will resolve
  (exampleClass as unknown).decorators = [entityDecorator];

  // Add JSDoc comment for the class
  const classComment = b.commentBlock(" Example entity ", true, false);
  exampleClass.comments = [classComment];

  // Build the program
  const program = b.program([
    ...imports,
    b.exportNamedDeclaration(exampleClass, []),
  ]);

  // Cast to the appropriate type for TypeScript compatibility
  return program;
}

export const print = (ast: recast.types.namedTypes.Program): string => {
  return recast.prettyPrint(ast, { parser: tsParser, tabWidth: 2 }).code;
};

export default generateTypeORMExampleEntityAST;
