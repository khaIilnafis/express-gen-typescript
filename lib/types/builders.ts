import * as recast from "recast";
import {
  ImportConfig,
  ImportsFromConfig,
  //   ConstructorFromConfig,
  //   ConstructorItem,
  ExportsFromConfig,
  ExportConfig,
  ConstructorDefinitionIR,
  MethodDefinitionIR,
  PropertiesIR,
  PropertyIR,
} from "./config.js";
// import { GeneratorOptions } from "./setup.js";

export type ImportsBuilderFn = <T extends Record<string, ImportConfig>>(
  imports: ImportsFromConfig<T>,
) => recast.types.namedTypes.ImportDeclaration[];

export type ExportsBuilderFn = <T extends ExportConfig>(
  imports: ExportsFromConfig<T>,
) => ExportBuilderReturn;

export type ExportBuilderReturn = {
  NAMED: recast.types.namedTypes.ExportNamedDeclaration[];
  DEFAULT: recast.types.namedTypes.ExportDefaultDeclaration | undefined;
};

export type ConstructorBuilderFn = (
  constructorDef: ConstructorDefinitionIR,
) => recast.types.namedTypes.MethodDefinition;

export type PropertiesBuilderFn = <T extends Record<string, PropertyIR>>(
  propertyDef: PropertiesIR<T>,
) => recast.types.namedTypes.ClassProperty[];

export type PropertyBuilderFn = (
  propertiesDef: PropertyIR,
) => recast.types.namedTypes.ClassProperty;

export type MethodBuilderFn = (
  methodDef: MethodDefinitionIR,
) => recast.types.namedTypes.MethodDefinition;
