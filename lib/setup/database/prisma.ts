import path from "path";
import fs from "fs";
import {
  TEMPLATES,
  DATABASES,
  DIRECTORIES,
  FILE_PATHS,
} from "../../constants/index.js";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";
import {
  normalizeDatabaseName,
  updateServerWithDatabaseInit,
  createModelsIndexFile,
} from "../../utils/database-helper.js";

/**
 * Options for Prisma setup
 */
export interface PrismaSetupOptions {
  databaseName?: string;
  [key: string]: any;
}

/**
 * Setup Prisma ORM
 * @param destination - Project destination directory
 * @param options - User selected options
 */
async function setupPrisma(
  destination: string,
  options: PrismaSetupOptions = {}
): Promise<void> {
  console.log("Setting up Prisma ORM...");

  // Define paths for destination files
  const prismaDir = path.join(
    destination,
    DIRECTORIES.ROOT.SRC,
    FILE_PATHS.DATABASE.DIRECTORY
  );
  const prismaSchemaPath = path.join(
    prismaDir,
    FILE_PATHS.DATABASE.FILES.CONNECTION
  );
  const dbClientPath = path.join(
    prismaDir,
    FILE_PATHS.DATABASE.FILES.CONNECTION
  );

  // Create prisma directory if it doesn't exist
  if (!fs.existsSync(prismaDir)) {
    fs.mkdirSync(prismaDir, { recursive: true });
  }

  // Get database name from options or use default
  const databaseName =
    options.databaseName || normalizeDatabaseName(path.basename(destination));

  // Create Prisma schema file using template with Example model
  writeTemplate(
    getTemplatePath(TEMPLATES.DATABASE.PRISMA.EXAMPLE_MODEL),
    prismaSchemaPath,
    {
      databaseName,
    }
  );

  // Create database client file using template
  writeTemplate(
    getTemplatePath(TEMPLATES.DATABASE.PRISMA.CONFIG),
    dbClientPath
  );

  //   // Create database init file using template
  //   writeTemplate(getTemplatePath(TEMPLATES.DATABASE.PRISMA.INIT), dbInitPath);

  // Add example model type definitions
  const modelsDir = path.join(
    destination,
    DIRECTORIES.ROOT.SRC,
    DIRECTORIES.SRC.MODELS
  );
  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
  }

  // Create models index.ts file
  createModelsIndexFile(destination, DATABASES.TYPES.PRISMA);

  // Update server.ts to initialize database on startup
  updateServerWithDatabaseInit(destination);

  // Add Prisma commands to package.json scripts
  const packageJsonPath = path.join(destination, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

      // Add Prisma-related scripts if they don't exist
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }

      // Add scripts for Prisma
      packageJson.scripts["prisma:generate"] = "prisma generate";
      packageJson.scripts["prisma:migrate"] = "prisma migrate dev";
      packageJson.scripts["prisma:studio"] = "prisma studio";

      // Write updated package.json
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log("Updated package.json with Prisma scripts");
    } catch (error) {
      console.error("Error updating package.json:", error);
    }
  }
}

export default setupPrisma;
