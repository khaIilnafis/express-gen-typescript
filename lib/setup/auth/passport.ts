import fs from "fs";
import path from "path";
import { AUTH, PROJECT } from "../../constants/index.js";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";

/**
 * Setup Passport.js authentication
 * @param destination - Project destination directory
 */
async function setupPassport(destination: string): Promise<void> {
  console.log("Setting up Passport.js authentication...");

  // Define paths for destination files
  const passportPath = path.join(
    destination, 
    PROJECT.DIRECTORIES.ROOT.SRC,
    AUTH.PATHS.FILES.PASSPORT.CONFIG
  );
  
  const authMiddlewarePath = path.join(
    destination,
    PROJECT.DIRECTORIES.ROOT.SRC,
    AUTH.PATHS.FILES.MIDDLEWARE.AUTH
  );

  // Create auth directory if it doesn't exist
  const authDir = path.join(destination, "src", "auth");
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Create middleware directory if it doesn't exist
  const middlewareDir = path.join(destination, "src", "middleware");
  if (!fs.existsSync(middlewareDir)) {
    fs.mkdirSync(middlewareDir, { recursive: true });
  }

  // Create passport.ts file using template
  writeTemplate(getTemplatePath("auth/passport/passport.ts"), passportPath);
}
export default setupPassport;
