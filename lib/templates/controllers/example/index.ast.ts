/**
 * AST Template for controllers/example/index.ts
 * This file is processed by the AST template processor and generates the example controller index file
 */

import * as recast from 'recast';
import * as tsParser from 'recast/parsers/typescript.js';

const b = recast.types.builders;

/**
 * Template options interface
 */
export interface TemplateOptions {
  websocketLib?: string;
  [key: string]: any;
}

/**
 * Generates the example controller index AST with provided options
 * @param options Template options
 * @returns AST for controllers/example/index.ts file
 */
export default function generateExampleControllerIndexAST(options: TemplateOptions = {}) {
  // Provide defaults for options
  const opts = {
    websocketLib: options.websocketLib || "none",
    ...options
  };

  // Build the imports section
  const controllerImports = [
    // Import controller functions from exampleController.ts
    b.importDeclaration(
      [
        b.importSpecifier(b.identifier("createGetAllController")),
        b.importSpecifier(b.identifier("createGetByIdController")),
        b.importSpecifier(b.identifier("createCreateController")),
        b.importSpecifier(b.identifier("createUpdateController")),
        b.importSpecifier(b.identifier("createDeleteController"))
      ],
      b.stringLiteral("./exampleController")
    )
  ];

  // Add WebSocket imports if needed
  if (opts.websocketLib === "socketio") {
    controllerImports.push(
      b.importDeclaration(
        [b.importSpecifier(b.identifier("Server"), b.identifier("SocketIOServer"))],
        b.stringLiteral("socket.io")
      )
    );
  }

  // Create class properties for the controller class
  const classProperties: recast.types.namedTypes.ClassProperty[] = [];
  
  // Add io property for WebSocket if needed
  if (opts.websocketLib === "socketio") {
    const ioProperty = b.classProperty(
      b.identifier("io"),
      null
    ) as recast.types.namedTypes.ClassProperty;
    
    // Set modifiers separately
    ioProperty.static = false;
    // Use proper type casting to set private property
    (ioProperty as any).private = true;

    // Add type annotation separately
    ioProperty.typeAnnotation = b.tsTypeAnnotation(
        b.tsUnionType([
			b.tsTypeReference(b.identifier("SocketIOServer")),
			b.tsUndefinedKeyword()
		  ])
    );
    
    classProperties.push(ioProperty);
  }

  // Add controller method properties with type annotations
  const controllerMethodProperties: recast.types.namedTypes.ClassProperty[] = [];
  
  // Create and add method properties
  const methodNames = ["getAll", "getById", "create", "update", "delete"];
  const controllerCreators = [
    "createGetAllController", 
    "createGetByIdController", 
    "createCreateController", 
    "createUpdateController", 
    "createDeleteController"
  ];
  
  for (let i = 0; i < methodNames.length; i++) {
    const methodProperty = b.classProperty(
      b.identifier(methodNames[i]),
      null
    ) as recast.types.namedTypes.ClassProperty;
    
    methodProperty.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(
        b.identifier("ReturnType"),
        b.tsTypeParameterInstantiation([
          b.tsTypeQuery(b.identifier(controllerCreators[i]))
        ])
      )
    );
    
    controllerMethodProperties.push(methodProperty);
  }
  
  // Create constructor parameters based on options
  const constructorParams: recast.types.namedTypes.Identifier[] = [];
  if (opts.websocketLib === "socketio") {
    const ioParam = b.identifier("io");
	ioParam.optional = true;
    ioParam.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier("SocketIOServer"))
    );
    constructorParams.push(ioParam);
  }

  // Create constructor method body
  const constructorBodyStatements: recast.types.namedTypes.Statement[] = [];
  
  // Assign io parameter to class property if websockets are enabled
  if (opts.websocketLib === "socketio") {
    constructorBodyStatements.push(
      b.expressionStatement(
        b.assignmentExpression(
          "=",
          b.memberExpression(b.thisExpression(), b.identifier("io")),
          b.identifier("io")
        )
      )
    );
  }
  
  // Initialize controller methods
  for (let i = 0; i < methodNames.length; i++) {
    constructorBodyStatements.push(
      b.expressionStatement(
        b.assignmentExpression(
          "=",
          b.memberExpression(b.thisExpression(), b.identifier(methodNames[i])),
          b.callExpression(
            b.identifier(controllerCreators[i]),
            opts.websocketLib === "socketio" ? [b.identifier("io")] : []
          )
        )
      )
    );
  }

  // Create constructor method
  const constructorMethod = b.methodDefinition(
    "constructor",
    b.identifier("constructor"),
    b.functionExpression(
      null,
      constructorParams,
      b.blockStatement(constructorBodyStatements as any)
    )
  );

  // Create the class body
  const classBody = b.classBody([
    ...classProperties,
    constructorMethod,
    ...controllerMethodProperties
  ]);

  // Create the class declaration
  const exampleControllerClass = b.classDeclaration(
    b.identifier("ExampleController"),
    classBody,
    null // no superclass
  );
  
  // Create exports
  const namedExport = b.exportNamedDeclaration(
    exampleControllerClass,
    []
  );
  
  const defaultExport = b.exportDefaultDeclaration(
    b.identifier("ExampleController")
  );

  // Create JSDoc comment for class
  const classComment = b.commentBlock(
    "*\n * Example controller class that centralizes all example-related controllers\n ",
    true,
    false
  );

  // Add JSDoc comments to class properties
  const propertyComments = [
    {index: 5, text: "* Get all examples controller "},
    {index: 6, text: "* Get example by ID controller "},
    {index: 7, text: "* Create example controller "},
    {index: 8, text: "* Update example controller "},
    {index: 9, text: "* Delete example controller "}
  ];

  // Build the AST program
  const program = b.program([
    ...controllerImports,
    namedExport,
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