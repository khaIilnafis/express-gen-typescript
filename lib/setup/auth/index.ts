import fs from "fs";
import path from "path";
import passportSetup from "./passport.js";
import { AUTH, PROJECT } from "../../constants/index.js";

/**
 * Setup authentication based on user selection
 * @param destination - Project destination directory
 * @param authLib - Selected authentication library
 */
async function setupAuth(destination: string, authLib: string): Promise<void> {
  console.log(`Setting up ${authLib} authentication...`);

  // Create necessary directories
  const authDir = path.join(destination, PROJECT.DIRECTORIES.ROOT.SRC, PROJECT.DIRECTORIES.SRC.AUTH);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const middlewareDir = path.join(destination, PROJECT.DIRECTORIES.ROOT.SRC, PROJECT.DIRECTORIES.SRC.MIDDLEWARE);
  if (!fs.existsSync(middlewareDir)) {
    fs.mkdirSync(middlewareDir, { recursive: true });
  }

  // Setup based on selected auth lib
  switch (authLib) {
    case AUTH.TYPES.PASSPORT:
      await setupPassport(destination);
      break;
    case AUTH.TYPES.JWT:
      await setupJWT(destination);
      break;
    case AUTH.TYPES.EXPRESS_SESSION:
      await setupExpressSession(destination);
      break;
  }
}

/**
 * Setup Passport.js authentication
 * @param destination - Project destination directory
 */
async function setupPassport(destination: string): Promise<void> {
  // Implementation will be moved to a separate file
  await passportSetup(destination);
}

/**
 * Setup JWT authentication
 * @param destination - Project destination directory
 */
async function setupJWT(destination: string): Promise<void> {
  // Implementation will be moved to a separate file
  console.log("JWT authentication setup not yet implemented");
}

/**
 * Setup Express-session authentication
 * @param destination - Project destination directory
 */
async function setupExpressSession(destination: string): Promise<void> {
  // Implementation will be moved to a separate file
  console.log("Express-session authentication setup not yet implemented");
}

export default setupAuth;
