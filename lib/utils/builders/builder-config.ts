import * as recast from "recast";
import {
  ASTTEmplateOptions,
  ConstructorBuilderFn,
  GeneratorOptions,
  ImportsBuilderFn,
  ExportsBuilderFn,
} from "../../types/index.js";
import { buildClassProperties } from "./class.js";
import { buildConstructor } from "./constructors.js";
import { buildExports } from "./exports.js";
import { buildImports } from "./imports.js";
import { ClassPropertyBuilderFn } from "../../types/builders.js";

const b = recast.types.builders;

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
  generateClassProperties: ((options, cfg) => {
    const classPropertyFn = buildClassProperties(options, cfg);
    return classPropertyFn;
  }) as ClassPropertyBuilderFn,
  CONTROLLER: {
    generateClassProperties: ((options, cfg) => {
      const classPropertyFn = buildClassProperties(options, cfg);
      return classPropertyFn;
    }) as ClassPropertyBuilderFn,
  },
  SOCKET: {
    generateSocketImport: ((_imports) => {}) as ImportsBuilderFn,
    //param identifier and type identifier would need to be available
    getSocketParam: (
      optional: boolean,
      _opts: GeneratorOptions,
    ): recast.types.namedTypes.Identifier => {
      const ioParam = b.identifier("io");
      ioParam.optional = optional;
      ioParam.typeAnnotation = b.tsTypeAnnotation(
        b.tsTypeReference(b.identifier("SocketIOServer")),
      );
      return ioParam;
    },
  },
});
