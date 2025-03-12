import * as recast from "recast";
import {
  ClassPropertyBuilderFn,
  ConstructorBuilderFn,
  ExportsBuilderFn,
  ImportsBuilderFn,
} from "./builders.js";
import { GeneratorOptions } from "./setup.js";

/**
 * Template variables interfaces
 */
export interface TemplateVariables {
  [key: string]: string | number | boolean;
}

export type TemplateOptions = TemplateVariables | GeneratorOptions;

export interface ASTTEmplateOptions {
  generateImports: ImportsBuilderFn;
  generateExports: ExportsBuilderFn;
  generateConstructor: ConstructorBuilderFn;
  generateClassProperties: ClassPropertyBuilderFn;

  CONTROLLER: {
    generateClassProperties: ClassPropertyBuilderFn;
  };

  SOCKET: {
    generateSocketImport: ImportsBuilderFn;
    getSocketParam: (
      optional: boolean,
      ops: GeneratorOptions,
    ) => recast.types.namedTypes.Identifier;
  };
}
