import * as recast from "recast";
import { ConstructorBuilderFn, ImportsBuilderFn } from "../../types/index.js";
import { astConfig } from "../../configs/builder-config.js";
import {
  ClassPropertyBuilderFn,
  ExportsBuilderFn,
} from "../../types/builders.js";
const b = recast.types.builders;

export const buildImports: ImportsBuilderFn = (
  imports,
): recast.types.namedTypes.ImportDeclaration[] => {
  const importDeclarations: recast.types.namedTypes.ImportDeclaration[] = [];

  for (const currImport of Object.keys(imports)) {
    const tmpImport = imports[currImport];
    // Assert that DEFAULT and NAMED are indexable as Record<string, string>
    const defaultObj = tmpImport.DEFAULT;
    const namedObj = tmpImport.NAMED;
    const defaultKeys = Object.keys(defaultObj);
    const namedKeys = Object.keys(namedObj);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const specifiers: any[] = [];

    // If there is a default import, add a default specifier.
    // We assume there's at most one default key.
    if (defaultKeys.length > 0) {
      // Retrieve the value from the DEFAULT object. For instance, for passport,
      // tmpImport.DEFAULT["passport"] is "passport"
      for (const _key of defaultKeys) {
        const defaultImportName = defaultObj[defaultKeys[0]];
        specifiers.push(
          b.importDefaultSpecifier(b.identifier(defaultImportName)),
        );
      }
    }
    // If there are named imports, add an import specifier for each.
    if (namedKeys.length > 0) {
      for (const key of namedKeys) {
        // The value of each key is used as the local identifier.
        const namedImportName = namedObj[key];
        console.log(namedImportName);
        if (Array.isArray(namedImportName)) {
          console.log(`array deteceted`);
          console.log(namedImportName[0]);
          console.log(namedImportName[1]);
          specifiers.push(
            b.importSpecifier(
              b.identifier(namedImportName[0]),
              b.identifier(namedImportName[1]),
            ),
          );
        } else {
          specifiers.push(b.importSpecifier(b.identifier(namedImportName)));
        }
      }
    }

    // Only add the import declaration if there's at least one specifier.
    if (specifiers.length > 0) {
      importDeclarations.push(
        b.importDeclaration(specifiers, b.stringLiteral(tmpImport.NAME)),
      );
    }
  }
  //   console.log(importDeclarations);
  return importDeclarations;
};
export const buildExports: ExportsBuilderFn = (
  exports,
): recast.types.namedTypes.ExportNamedDeclaration[] => {
  const exportAllDeclaration: recast.types.namedTypes.ExportNamedDeclaration[] =
    [];
  const namedExportDecl = b.exportNamedDeclaration(null, []);

  for (const exportModule of Object.keys(exports)) {
    const exportKeys = exports[exportModule];
    for (const key of Object.keys(exportKeys)) {
      const namedExportName = exportKeys[key];
      namedExportDecl.specifiers?.push(
        b.exportSpecifier.from({
          local: b.identifier(namedExportName),
          exported: b.identifier(namedExportName),
        }),
      );
    }
    exportAllDeclaration.push(namedExportDecl);
  }
  return exportAllDeclaration;
};
export const buildConstructor: ConstructorBuilderFn = (
  options,
  cfg,
): recast.types.namedTypes.MethodDefinition => {
  // Create constructor parameters based on options
  const constructorParams: recast.types.namedTypes.Identifier[] = [];
  // Create constructor method body
  const constructorBodyStatements: recast.types.namedTypes.BlockStatement = {
    body: [],
    type: "BlockStatement",
  };
  if (options.webSockets) {
    const ioParam = astConfig.SOCKET.getSocketParam(true, options);
    constructorParams.push(ioParam);
    //update these identifiers to be generic
    constructorBodyStatements.body.push(
      b.expressionStatement(
        b.assignmentExpression(
          "=",
          b.memberExpression(b.thisExpression(), b.identifier("io")),
          b.identifier("io"),
        ),
      ),
    );
  }
  for (const currImport of Object.keys(cfg)) {
    const tmpImport = cfg[currImport];
    constructorBodyStatements.body.push(
      b.expressionStatement(
        b.assignmentExpression(
          "=",
          b.memberExpression(
            b.thisExpression(),
            b.identifier(tmpImport.METHOD),
          ),
          b.callExpression(
            b.identifier(tmpImport.CALLER),
            //update identifier
            [b.identifier("io")],
          ),
        ),
      ),
    );
  }
  // Create constructor method
  const constructorMethod = b.methodDefinition(
    "constructor",
    b.identifier("constructor"),
    b.functionExpression(
      null,
      constructorParams,
      b.blockStatement(constructorBodyStatements.body),
    ),
  );
  return constructorMethod;
};

export const buildClassProperties: ClassPropertyBuilderFn = (
  _options,
  cfg,
): recast.types.namedTypes.ClassProperty[] => {
  const classProperties: recast.types.namedTypes.ClassProperty[] = [];
  for (const method of Object.keys(cfg)) {
    const methodProperty = b.classProperty(
      b.identifier(cfg[method].METHOD),
      null,
    ) as recast.types.namedTypes.ClassProperty;

    methodProperty.typeAnnotation = b.tsTypeAnnotation(
      b.tsTypeReference(
        b.identifier("ReturnType"),
        b.tsTypeParameterInstantiation([
          b.tsTypeQuery(b.identifier(cfg[method].CALLER)),
        ]),
      ),
    );
    classProperties.push(methodProperty);
  }
  return classProperties;
};
