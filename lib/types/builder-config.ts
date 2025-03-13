import {
  PropertyBuilderFn,
  ConstructorBuilderFn,
  ExportsBuilderFn,
  ImportsBuilderFn,
  MethodBuilderFn,
  PropertiesBuilderFn,
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
  generateProperty: PropertyBuilderFn;
  generateProperties: PropertiesBuilderFn;
  generateMethod: MethodBuilderFn;
}
