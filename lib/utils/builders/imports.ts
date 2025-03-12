import * as recast from "recast";
import { ImportsBuilderFn } from "../../types/index.js";
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
        if (Array.isArray(namedImportName)) {
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
  return importDeclarations;
};
