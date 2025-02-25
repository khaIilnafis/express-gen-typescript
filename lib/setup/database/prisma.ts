import path from "path";
import fs from "fs";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";

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
  const prismaDir = path.join(destination, "src", "database");
  const prismaSchemaPath = path.join(prismaDir, "schema.prisma");
  const dbClientPath = path.join(prismaDir, "client.ts");
  const dbInitPath = path.join(prismaDir, "init.ts");

  // Create prisma directory if it doesn't exist
  if (!fs.existsSync(prismaDir)) {
    fs.mkdirSync(prismaDir, { recursive: true });
  }

  // Get database name from options or use default
  const databaseName =
    options.databaseName ||
    path
      .basename(destination)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");

  // Create Prisma schema file using template with Example model
  writeTemplate(
    getTemplatePath("database/prisma/schema.prisma"),
    prismaSchemaPath,
    {
      databaseName,
    }
  );

  // Create database client file using template
  writeTemplate(getTemplatePath("database/prisma/client.ts"), dbClientPath);

  // Create database init file using template
  writeTemplate(getTemplatePath("database/prisma/init.ts"), dbInitPath);

  // Add example model type definitions
  const modelsDir = path.join(destination, "src", "models");
  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
  }

  // Create models index.ts file
  const modelsIndexPath = path.join(modelsDir, "index.ts");
  const modelsIndexContent = `// Export Prisma models and types
import prisma from '@prisma/client';

export { prisma };
`;
  fs.writeFileSync(modelsIndexPath, modelsIndexContent);

  // Update server.ts to initialize database on startup
  const serverFilePath = path.join(destination, "src", "server.ts");

  if (fs.existsSync(serverFilePath)) {
    let serverFileContent = fs.readFileSync(serverFilePath, "utf8");

    // Add import for database initialization if it doesn't already exist
    if (!serverFileContent.includes("import { initializeDatabase }")) {
      const lastImportIndex = serverFileContent.lastIndexOf("import");
      const lastImportLineEnd = serverFileContent.indexOf(
        "\n",
        lastImportIndex
      );
      serverFileContent =
        serverFileContent.substring(0, lastImportLineEnd + 1) +
        "import { initializeDatabase } from './database/init';\n" +
        serverFileContent.substring(lastImportLineEnd + 1);
    }

    // Add database initialization to start method if it doesn't already exist
    if (!serverFileContent.includes("await initializeDatabase()")) {
      const startMethodIndex = serverFileContent.indexOf(
        "public async start()"
      );
      if (startMethodIndex !== -1) {
        const startMethodBodyIndex =
          serverFileContent.indexOf("{", startMethodIndex) + 1;
        serverFileContent =
          serverFileContent.substring(0, startMethodBodyIndex) +
          "\n    // Initialize database\n    await initializeDatabase();\n" +
          serverFileContent.substring(startMethodBodyIndex);
      }
    }

    fs.writeFileSync(serverFilePath, serverFileContent);
    // console.log("Updated server.ts to initialize database");
  } else {
    console.log(
      "Warning: server.ts not found, skipping database initialization setup"
    );
  }

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
