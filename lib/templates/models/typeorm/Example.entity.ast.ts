import * as recast from "recast";
import * as typescript from "typescript";

export interface TemplateOptions {
  // No options needed for this template
}

export function generateTypeORMExampleEntityAST(options: TemplateOptions): typeof recast.types.namedTypes.Program {
  const builders = recast.types.builders;
  const n = builders;
  
  // Imports section
  const imports = [
    n.importDeclaration(
      [
        n.importSpecifier(n.identifier("Entity")),
        n.importSpecifier(n.identifier("PrimaryGeneratedColumn")),
        n.importSpecifier(n.identifier("Column")),
        n.importSpecifier(n.identifier("CreateDateColumn")),
        n.importSpecifier(n.identifier("UpdateDateColumn")),
      ],
      n.stringLiteral("typeorm")
    ),
  ];
  
  // Class properties with decorators directly added
  const classProperties = [
    // id property with PrimaryGeneratedColumn decorator
    n.classProperty(
      n.identifier("id"),
      null,
      n.tsTypeAnnotation(
        n.tsNumberKeyword()
      ),
      false
    ),
    
    // title property with Column decorator
    n.classProperty(
      n.identifier("title"),
      null,
      n.tsTypeAnnotation(
        n.tsStringKeyword()
      ),
      false
    ),
    
    // description property with Column({ nullable: true, type: "text" }) decorator
    n.classProperty(
      n.identifier("description"),
      null,
      n.tsTypeAnnotation(
        n.tsStringKeyword()
      ),
      false
    ),
    
    // status property with Column enum decorator
    n.classProperty(
      n.identifier("status"),
      null,
      n.tsTypeAnnotation(
        n.tsUnionType([
          n.tsLiteralType(n.stringLiteral("pending")),
          n.tsLiteralType(n.stringLiteral("in-progress")),
          n.tsLiteralType(n.stringLiteral("completed"))
        ])
      ),
      false
    ),
    
    // priority property with Column({ default: 1 }) decorator
    n.classProperty(
      n.identifier("priority"),
      null,
      n.tsTypeAnnotation(
        n.tsNumberKeyword()
      ),
      false
    ),
    
    // isActive property with Column({ default: true }) decorator
    n.classProperty(
      n.identifier("isActive"),
      null,
      n.tsTypeAnnotation(
        n.tsBooleanKeyword()
      ),
      false
    ),
    
    // createdAt property with CreateDateColumn decorator
    n.classProperty(
      n.identifier("createdAt"),
      null,
      n.tsTypeAnnotation(
        n.tsTypeReference(
          n.identifier("Date")
        )
      ),
      false
    ),
    
    // updatedAt property with UpdateDateColumn decorator
    n.classProperty(
      n.identifier("updatedAt"),
      null,
      n.tsTypeAnnotation(
        n.tsTypeReference(
          n.identifier("Date")
        )
      ),
      false
    ),
  ];
  
  // Manually add decorators to each property
  // id property
  (classProperties[0] as any).decorators = [
    n.decorator(n.callExpression(n.identifier("PrimaryGeneratedColumn"), []))
  ];
  
  // title property
  (classProperties[1] as any).decorators = [
    n.decorator(n.callExpression(n.identifier("Column"), []))
  ];
  
  // description property
  (classProperties[2] as any).decorators = [
    n.decorator(n.callExpression(n.identifier("Column"), [
      n.objectExpression([
        n.objectProperty(n.identifier("nullable"), n.booleanLiteral(true)),
        n.objectProperty(n.identifier("type"), n.stringLiteral("text"))
      ])
    ]))
  ];
  
  // status property
  (classProperties[3] as any).decorators = [
    n.decorator(n.callExpression(n.identifier("Column"), [
      n.objectExpression([
        n.objectProperty(n.identifier("type"), n.stringLiteral("enum")),
        n.objectProperty(
          n.identifier("enum"), 
          n.arrayExpression([
            n.stringLiteral("pending"),
            n.stringLiteral("in-progress"),
            n.stringLiteral("completed")
          ])
        ),
        n.objectProperty(n.identifier("default"), n.stringLiteral("pending"))
      ])
    ]))
  ];
  
  // priority property
  (classProperties[4] as any).decorators = [
    n.decorator(n.callExpression(n.identifier("Column"), [
      n.objectExpression([
        n.objectProperty(n.identifier("default"), n.numericLiteral(1))
      ])
    ]))
  ];
  
  // isActive property
  (classProperties[5] as any).decorators = [
    n.decorator(n.callExpression(n.identifier("Column"), [
      n.objectExpression([
        n.objectProperty(n.identifier("default"), n.booleanLiteral(true))
      ])
    ]))
  ];
  
  // createdAt property
  (classProperties[6] as any).decorators = [
    n.decorator(n.callExpression(n.identifier("CreateDateColumn"), []))
  ];
  
  // updatedAt property
  (classProperties[7] as any).decorators = [
    n.decorator(n.callExpression(n.identifier("UpdateDateColumn"), []))
  ];
  
  // Entity decorator
  const entityDecorator = n.decorator(
    n.callExpression(
      n.identifier("Entity"),
      [n.stringLiteral("examples")]
    )
  );
  
  // Example class definition
  const exampleClass = n.classDeclaration(
    n.identifier("Example"),
    n.classBody(classProperties)
  );
  
  // Add decorator to class
  (exampleClass as any).decorators = [entityDecorator];
  
  // Add JSDoc comment for the class
  const classComment = n.commentBlock(" Example entity ", true, false);
  exampleClass.comments = [classComment];
  
  // Build the program
  const program = n.program([
    ...imports,
    n.exportNamedDeclaration(exampleClass, [])
  ]);
  
  // Cast to the appropriate type for TypeScript compatibility
  return program as any;
}

export const print = (ast: recast.types.namedTypes.Program): string => {
  return recast.print(ast, { tabWidth: 2 }).code;
};

export default generateTypeORMExampleEntityAST; 