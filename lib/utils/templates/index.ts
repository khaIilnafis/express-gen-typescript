import {
  getASTTemplatePath,
  processASTTemplate,
  writeASTTemplate,
} from "./ast-template-processor.js";
import { buildConstructor, buildImports } from "./template-helper.js";
import {
  getTemplatePath,
  loadTemplate,
  writeTemplate,
} from "./template-loader.js";
import {
  addImportIfNotExists,
  ensureDirectoryExists,
  insertContentAtMarker,
  updatePackageJson,
} from "./file-manipulation.js";

export {
  getASTTemplatePath,
  processASTTemplate,
  writeASTTemplate,
  buildConstructor,
  buildImports,
  getTemplatePath,
  loadTemplate,
  writeTemplate,
  addImportIfNotExists,
  ensureDirectoryExists,
  insertContentAtMarker,
  updatePackageJson,
};
