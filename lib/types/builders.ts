import * as recast from "recast";
import {
  ImportConfig,
  ImportsFromConfig,
  ConstructorFromConfig,
  ConstructorItem,
  ExportsFromConfig,
  ExportConfig,
} from "./config.js";
import { GeneratorOptions } from "./setup.js";

export type ImportsBuilderFn = <T extends Record<string, ImportConfig>>(
  imports: ImportsFromConfig<T>,
) => recast.types.namedTypes.ImportDeclaration[];

export type ExportsBuilderFn = <T extends ExportConfig>(
  imports: ExportsFromConfig<T>,
) => recast.types.namedTypes.ExportNamedDeclaration[];

export type ConstructorBuilderFn = <T extends Record<string, ConstructorItem>>(
  options: GeneratorOptions,
  cfg: ConstructorFromConfig<T>,
) => recast.types.namedTypes.MethodDefinition;

export type ClassPropertyBuilderFn = <
  T extends Record<string, ConstructorItem>,
>(
  options: GeneratorOptions,
  cfg: ConstructorFromConfig<T>,
) => recast.types.namedTypes.ClassProperty[];
