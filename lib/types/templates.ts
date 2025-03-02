import * as recast from "recast";
import {
  ClassPropertyBuilderFn,
  ConstructorBuilderFn,
  ImportsBuilderFn,
} from "./builders.js";
import { GeneratorOptions } from "./setup.js";

/**
 * Template variables interface
 */
export interface TemplateVariables {
  [key: string]: string | number | boolean;
}

export type TemplateOptions = TemplateVariables | GeneratorOptions;

export interface ASTTEmplateOptions {
  AUTHENTICATION: {
    config: () => void;
    getImports: () => void;
    builtInit: () => void;
  };
  MODEL: {
    config: () => void;
    buildIndex: () => void;
    buildModel: () => void;
  };
  DATABASE: {
    config: () => void;
    buildIndex: () => void;
  };
  CONTROLLER: {
    conifg: () => void;
    buildIndex: () => void;
    buildController: () => void;
    updateIndex: () => void;
    generateImports: ImportsBuilderFn;
    generateConstructor: ConstructorBuilderFn;
    generateClassProperties: ClassPropertyBuilderFn;
  };
  ROUTE: {
    config: () => void;
    buildInit: () => void;
    buildClass: () => void;
  };
  VIEW: {
    config: () => void;
    generate: () => void;
  };
  SERVER: {
    config: () => void;
  };
  SOCKET: {
    generateSocketImport: ImportsBuilderFn;
    getSocketParam: (
      optional: boolean,
      ops: GeneratorOptions,
    ) => recast.types.namedTypes.Identifier;
  };
}
