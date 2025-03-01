import * as recast from 'recast';
import { ImportsFromConfig } from "./types.js";
import { IMPORTS } from "../constants/templates/imports/index.js";

export function buildImports(
	b: recast.types.builders,
	imports: ImportsFromConfig<typeof IMPORTS>
): recast.types.namedTypes.ImportDeclaration[]{

	const importDeclarations:recast.types.namedTypes.ImportDeclaration[] = [];

	for (const currImport of Object.keys(imports) as Array<keyof typeof IMPORTS>) {
		const tmpImport = IMPORTS[currImport];
		// Assert that DEFAULT and NAMED are indexable as Record<string, string>
		const defaultObj = tmpImport.DEFAULT as Record<string, string>;
		const namedObj = tmpImport.NAMED as Record<string, string>;

		const defaultKeys = Object.keys(defaultObj);
    	const namedKeys = Object.keys(namedObj);

		const specifiers: any[] = [];
	  
		// If there is a default import, add a default specifier.
		// We assume there's at most one default key.
		if (defaultKeys.length > 0) {
		  // Retrieve the value from the DEFAULT object. For instance, for passport,
		  // tmpImport.DEFAULT["passport"] is "passport"
		  const defaultImportName = defaultObj[defaultKeys[0]];
		  specifiers.push(b.importDefaultSpecifier(b.identifier(defaultImportName)));
		}
	  
		// If there are named imports, add an import specifier for each.
		if (namedKeys.length > 0) {
		  for (const key of namedKeys) {
			// The value of each key is used as the local identifier.
			const namedImportName = namedObj[key];
			specifiers.push(b.importSpecifier(b.identifier(namedImportName)));
		  }
		}
	  
		// Only add the import declaration if there's at least one specifier.
		if (specifiers.length > 0) {
		  importDeclarations.push(
			b.importDeclaration(
			  specifiers,
			  b.stringLiteral(tmpImport.NAME)
			)
		  );
		}
	  }
	return importDeclarations;
}