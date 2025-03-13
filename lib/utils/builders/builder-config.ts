import {
  ASTTEmplateOptions,
  ConstructorBuilderFn,
  ImportsBuilderFn,
  ExportsBuilderFn,
  PropertiesBuilderFn,
  PropertyBuilderFn,
  MethodBuilderFn,
} from "../../types/index.js";
import { buildProperties, buildProperty } from "./properties.js";
import { buildConstructor } from "./constructors.js";
import { buildExports } from "./exports.js";
import { buildImports } from "./imports.js";
import { buildMethod } from "./method.js";

export const astConfig: ASTTEmplateOptions = Object.freeze({
  generateImports: ((imports) => {
    const importDeclaration = buildImports(imports);
    return importDeclaration;
  }) as ImportsBuilderFn,
  generateExports: ((exports) => {
    const exportDeclaration = buildExports(exports);
    return exportDeclaration;
  }) as ExportsBuilderFn,
  generateConstructor: ((constructorDef) => {
    const constructorFn = buildConstructor(constructorDef);
    return constructorFn;
  }) as ConstructorBuilderFn,
  generateProperty: ((propertyDef) => {
    const classPropertyFn = buildProperty(propertyDef);
    return classPropertyFn;
  }) as PropertyBuilderFn,
  generateProperties: ((propertiesDef) => {
    const classPropertyFn = buildProperties(propertiesDef);
    return classPropertyFn;
  }) as PropertiesBuilderFn,
  generateMethod: ((methodDef) => {
    const methodFn = buildMethod(methodDef);
    return methodFn;
  }) as MethodBuilderFn,
});
