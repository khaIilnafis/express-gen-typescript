/**
 * AST Template for server.ts
 * This file is processed by the AST template processor and generates the main server file
 */

import * as recast from "recast";
import * as tsParser from "recast/parsers/typescript.js";
import { COMMENTS } from "../constants/index.js";
import { GeneratorOptions } from "../../types/index.js";
import { astConfig } from "../../utils/builders/builder-config.js";
import { SERVER_PRESET } from "../../presets/index.js";
import { buildMethod } from "../../utils/builders/index.js";
const b = recast.types.builders;

/**
 * Generates the server AST with provided options
 * @param options Template options
 * @returns AST for server.ts file
 */
export default function generateServerAST(_opts: GeneratorOptions) {
  // Build the AST for our server.ts file
  const imports = astConfig.generateImports(SERVER_PRESET.IMPORTS);

  const classProperties = astConfig.generateProperties(
    SERVER_PRESET.PROPERTIES,
  );
  const bootstrapMethod = astConfig.generateMethod(SERVER_PRESET.BOOSTRAP);
  bootstrapMethod.comments = [
    b.commentBlock(COMMENTS.SERVER.BOOTSTRAP_METHOD, true),
  ];
  const constructorMethod = astConfig.generateConstructor(
    SERVER_PRESET.CONSTRUCTOR,
  );
  constructorMethod.comments = [
    b.commentBlock(COMMENTS.SERVER.CONSTRUCTOR_METHOD, true),
  ];
  const middlewareMethod = buildMethod(SERVER_PRESET.MIDDLEWARE);
  middlewareMethod.comments = [
    b.commentBlock(COMMENTS.SERVER.INITIALIZE_MIDDLEWARES, true),
  ];
  const dbMethod = astConfig.generateMethod(SERVER_PRESET.DB_CONNECT);
  dbMethod.comments = [b.commentBlock(COMMENTS.SERVER.CONNECT_DATABASE, true)];

  const wsMethod = astConfig.generateMethod(SERVER_PRESET.WEBSOCKETS);
  wsMethod.comments = [
    b.commentBlock(COMMENTS.SERVER.INITIALIZE_WEBSOCKETS, true),
  ];

  const initRoutesMethod = astConfig.generateMethod(SERVER_PRESET.ROUTES);
  initRoutesMethod.comments = [
    b.commentBlock(COMMENTS.SERVER.INITIALIZE_ROUTES, true),
  ];

  const errorHandlingMethod = astConfig.generateMethod(
    SERVER_PRESET.ERROR_HANDLING,
  );
  errorHandlingMethod.comments = [
    b.commentBlock(COMMENTS.SERVER.INITIALIZE_ERROR_HANDLING, true),
  ];

  const listenMethod = astConfig.generateMethod(SERVER_PRESET.LISTEN);
  listenMethod.comments = [b.commentBlock(COMMENTS.SERVER.LISTEN_METHOD, true)];
  // export class Server { ... }
  const serverDecl = b.exportNamedDeclaration(
    b.classDeclaration(
      b.identifier("Server"),
      b.classBody([
        // Class properties
        ...classProperties,
        // static bootstrap(): Server { return new Server(); }
        bootstrapMethod,
        // constructor() { ... }
        constructorMethod,
        // private initializeMiddlewares(): void { ... }
        middlewareMethod,
        // Database method if needed
        dbMethod,
        // WebSocket method if needed
        wsMethod,
        // initializeRoutes(): void {}
        initRoutesMethod,
        // private initializeErrorHandling(): void { ... }
        errorHandlingMethod,
        // public listen(port: number): void { ... }
        listenMethod,
      ]),
      null, // no superclass
    ),
    [],
  );
  // Add the server class comment to the export declaration, not the class
  serverDecl.comments = [b.commentBlock(COMMENTS.SERVER.SERVER_CLASS, true)];

  return b.program([...imports, serverDecl]);
}

/**
 * Export a print function to convert the AST to code
 */
export function print(ast: recast.types.ASTNode): string {
  return recast.prettyPrint(ast, { parser: tsParser }).code;
}
