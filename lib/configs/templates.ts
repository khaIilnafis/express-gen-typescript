import * as recast from "recast";
import {
  ASTTEmplateOptions,
  ConstructorBuilderFn,
  GeneratorOptions,
  ImportsBuilderFn,
} from "../types/index.js";
import {
  buildClassProperties,
  buildConstructor,
  buildImports,
} from "../utils/templates/template-helper.js";
import { ClassPropertyBuilderFn } from "../types/builders.js";

const b = recast.types.builders;

export const astConfig: ASTTEmplateOptions = Object.freeze({
  AUTHENTICATION: {
    config: () => {},
    getImports: () => {},
    builtInit: () => {},
  },
  MODEL: {
    config: () => {},
    buildIndex: () => {},
    buildModel: () => {},
  },
  DATABASE: {
    config: () => {},
    buildIndex: () => {},
  },
  CONTROLLER: {
    conifg: () => {},
    buildIndex: () => {},
    buildController: () => {},
    updateIndex: () => {},
    generateImports: ((imports) => {
      const importDeclaration = buildImports(imports);
      return importDeclaration;
    }) as ImportsBuilderFn,
    generateConstructor: ((options, cfg) => {
      const constructorFn = buildConstructor(options, cfg);
      return constructorFn;
    }) as ConstructorBuilderFn,
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
  ROUTE: {
    config: () => {},
    buildInit: () => {},
    buildClass: () => {},
  },
  VIEW: {
    config: () => {},
    generate: () => {},
  },
  SERVER: {
    config: () => {},
  },
});
