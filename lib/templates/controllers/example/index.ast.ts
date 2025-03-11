/**
 * AST Template for controllers/example/index.ts
 * This file is processed by the AST template processor and generates the example controller index file
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { CALLEES, GeneratorOptions } from "../../../types/index.js";
import { astConfig } from "../../../configs/builder-config.js";
const b = recast.types.builders;

/**
 * Template options interface
 */
const imports = {
  CONTROLLER: {
    NAME: "./exampleController",
    DEFAULT: {},
    NAMED: {
      GETALL: "getAllController",
      GETBYID: "getByIdController",
      CREATE: "createController",
      UPDATE: "updateController",
      DELETE: "deleteController",
    },
  },
  SOCKETIO: {
    NAME: "socket.io",
    DEFAULT: {},
    NAMED: {
      SERVER: ["Server", "SocketIOServer"],
    },
  },
};

const constructor = {
  GET_ALL: {
    METHOD: "getAll",
    CALLER: "getAllController",
    CALLE: CALLEES.THIS,
  },
  GET_BY_ID: {
    METHOD: "getById",
    CALLER: "getByIdController",
    CALLE: CALLEES.THIS,
  },
  CREATE: {
    METHOD: "create",
    CALLER: "createController",
    CALLE: CALLEES.THIS,
  },
  UPDATE: {
    METHOD: "update",
    CALLER: "updateController",
    CALLE: CALLEES.THIS,
  },
  DELETE: {
    METHOD: "delete",
    CALLER: "deleteController",
    CALLE: CALLEES.THIS,
  },
};
/**
 * Generates the example controller index AST with provided options
 * @param options Template options
 * @returns AST for controllers/example/index.ts file
 */
export default function generateExampleControllerIndexAST(
  options: GeneratorOptions,
) {
  // Build the imports section
  const controllerImports = astConfig.generateImports(imports);

  // Create class properties for the controller class
  const classProperties: recast.types.namedTypes.ClassProperty[] = [];

  // Add io property for WebSocket if needed
  if (options.webSockets) {
    const ioProperty = b.classProperty(
      b.identifier("io"),
      null,
    ) as recast.types.namedTypes.ClassProperty;

    // Set modifiers separately
    ioProperty.static = false;
    // Use proper type casting to set private property
    (ioProperty as recast.types.namedTypes.ClassProperty).access = "private";

    // Add type annotation separately
    ioProperty.typeAnnotation = b.tsTypeAnnotation(
      b.tsUnionType([
        b.tsTypeReference(b.identifier("SocketIOServer")),
        b.tsUndefinedKeyword(),
      ]),
    );

    classProperties.push(ioProperty);
  }

  // Add controller method properties with type annotations
  const controllerMethodProperties =
    astConfig.CONTROLLER.generateClassProperties(options, constructor);
  // Add constructor and assign properties
  const constructorMethod = astConfig.CONTROLLER.generateConstructor(
    options,
    constructor,
  );

  // Create the class body
  const classBody = b.classBody([
    ...classProperties,
    constructorMethod,
    ...controllerMethodProperties,
  ]);

  // Create the class declaration
  const exampleControllerClass = b.classDeclaration(
    b.identifier("ExampleController"),
    classBody,
    null, // no superclass
  );

  // Create exports
  const namedExport = b.exportNamedDeclaration(exampleControllerClass, []);

  const defaultExport = b.exportDefaultDeclaration(
    b.identifier("ExampleController"),
  );

  // Build the AST program
  const program = b.program([...controllerImports, namedExport, defaultExport]);

  // Return the AST program
  return program;
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: recast.types.ASTNode): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
}
