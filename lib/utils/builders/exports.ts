import * as recast from "recast";
import { ExportBuilderReturn, ExportsBuilderFn } from "../../types/index.js";

const b = recast.types.builders;

export const buildExports: ExportsBuilderFn = (
  exports,
): ExportBuilderReturn => {
  const exportAllDeclaration: recast.types.namedTypes.ExportNamedDeclaration[] =
    [];
  const namedExportDecl = b.exportNamedDeclaration(null, []);
  let defaultExportDecl;
  const namedObjs = exports.NAMED;
  const defaultObjs = exports.DEFAULT;
  for (const exportModule of Object.keys(namedObjs)) {
    namedExportDecl.specifiers?.push(
      b.exportSpecifier.from({
        local: b.identifier(namedObjs[exportModule]),
        exported: b.identifier(namedObjs[exportModule]),
      }),
    );
    exportAllDeclaration.push(namedExportDecl);
  }
  for (const exportModule of Object.keys(defaultObjs)) {
    defaultExportDecl = b.exportDefaultDeclaration(
      b.identifier(defaultObjs[exportModule]),
    );
    exportAllDeclaration.push(namedExportDecl);
  }

  const templateExports = {
    NAMED: exportAllDeclaration,
    DEFAULT: defaultExportDecl,
  };
  return templateExports;
};
