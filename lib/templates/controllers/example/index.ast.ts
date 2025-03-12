/**
 * AST Template for controllers/example/index.ts
 * This file is processed by the AST template processor and generates the example controller index file
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { GeneratorOptions } from "../../../types/index.js";
import { CONTROLLER_CONFIG } from "../../../presets/index.js";
import { astConfig } from "../../../utils/builders/index.js";
const b = recast.types.builders;

/**
 * Generates the example controller index AST with provided options
 * @param options Template options
 * @returns AST for controllers/example/index.ts file
 */
export default function generateExampleControllerIndexAST(
  options: GeneratorOptions,
) {
  // Build the imports section
  const controllerImports = astConfig.generateImports(
    CONTROLLER_CONFIG.controllerConfig.exampleController.constructor.imports,
  );

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
  const controllerMethodProperties = astConfig.generateClassProperties(
    options,
    CONTROLLER_CONFIG.controllerConfig.exampleController.constructor.class,
  );
  // Add constructor and assign properties
  const constructorMethod = astConfig.generateConstructor(
    CONTROLLER_CONFIG.controllerConfig.exampleController.constructor.methods,
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

  //   const defaultExport = b.exportDefaultDeclaration(
  //     b.identifier("ExampleController"),
  //   );
  const defaultExport = astConfig.generateExports(
    CONTROLLER_CONFIG.controllerConfig.exampleController.constructor.exports,
  ).DEFAULT!;
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
