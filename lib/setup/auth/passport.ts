import fs from "fs";
import path from "path";
import { PATHS, TEMPLATES } from "../../constants/index.js";
import { getASTTemplatePath, writeASTTemplate } from "../../utils/ast-template-processor.js";

/**
 * Setup Passport.js authentication
 * @param destination - Project destination directory
 */
async function setupPassport(destination: string): Promise<void> {
  console.log("Setting up Passport.js authentication...");

  // Define paths for destination files
  const passportPath = path.join(
    destination, 
    PATHS.DIRECTORIES.ROOT.SRC,
    PATHS.DIRECTORIES.SRC.AUTH
  );
  // Create auth directory if it doesn't exist
  const authDir = path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, PATHS.DIRECTORIES.SRC.AUTH);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Create middleware directory if it doesn't exist
  const middlewareDir = path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, PATHS.DIRECTORIES.SRC.MIDDLEWARE);
  if (!fs.existsSync(middlewareDir)) {
    fs.mkdirSync(middlewareDir, { recursive: true });
  }

  // Create passport.ts file using AST template
  await writeASTTemplate(
    getASTTemplatePath(PATHS.FILES.AUTH.CONFIG_TEMPLATE(TEMPLATES.AUTH.TYPES.PASSPORT)),
    PATHS.FILES.AUTH.CONFIG(destination,TEMPLATES.AUTH.TYPES.PASSPORT),
    {} // No specific options needed
  );
}
export default setupPassport;
