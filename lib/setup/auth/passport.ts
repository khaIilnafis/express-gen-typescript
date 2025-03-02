import fs from "fs";
import path from "path";
import { PATHS } from "../constants/index.js";
import { AUTH } from "../../templates/constants/index.js";
import {
  getASTTemplatePath,
  writeASTTemplate,
} from "../../utils/templates/ast-template-processor.js";
import { GeneratorOptions } from "../../types/index.js";

/**
 * Setup Passport.js authentication
 * @param options - Generator Options
 */
async function setupPassport(options: GeneratorOptions): Promise<void> {
  console.log("Setting up Passport.js authentication...");
  const { destination } = options;
  // Create auth directory if it doesn't exist
  const authDir = path.join(
    destination,
    PATHS.DIRECTORIES.ROOT.SRC,
    PATHS.DIRECTORIES.SRC.AUTH,
  );
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Create middleware directory if it doesn't exist
  const middlewareDir = path.join(
    destination,
    PATHS.DIRECTORIES.ROOT.SRC,
    PATHS.DIRECTORIES.SRC.MIDDLEWARE,
  );
  if (!fs.existsSync(middlewareDir)) {
    fs.mkdirSync(middlewareDir, { recursive: true });
  }

  // Create passport.ts file using AST template
  await writeASTTemplate(
    getASTTemplatePath(PATHS.FILES.AUTH.CONFIG_TEMPLATE(AUTH.TYPES.PASSPORT)),
    PATHS.FILES.AUTH.CONFIG(destination, AUTH.TYPES.PASSPORT),
    options,
  );
}
export default setupPassport;
