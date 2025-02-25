import path from "path";
import fs from "fs";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";

/**
 * Options for TypeORM setup
 */
export interface TypeORMSetupOptions {
  databaseName?: string;
  [key: string]: any;
}

/**
 * Setup TypeORM
 * @param destination - Project destination directory
 * @param options - User selected options
 */
async function setupTypeORM(
  destination: string,
  options: TypeORMSetupOptions = {}
): Promise<void> {
  console.log("Setting up TypeORM...");

  // Define paths for destination files
  const dbConfigPath = path.join(
    destination,
    "src",
    "database",
    "data-source.ts"
  );
  const exampleEntityPath = path.join(
    destination,
    "src",
    "models",
    "Example.ts"
  );
  const dbInitPath = path.join(destination, "src", "database", "init.ts");

  // Create entities directory if it doesn't exist
  const entitiesDir = path.join(destination, "src", "models");
  if (!fs.existsSync(entitiesDir)) {
    fs.mkdirSync(entitiesDir, { recursive: true });
  }

  // Get database name from options or use default
  const databaseName =
    options.databaseName ||
    path
      .basename(destination)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");

  // Create database config file using template
  writeTemplate(
    getTemplatePath("database/typeorm/data-source.ts"),
    dbConfigPath,
    {
      databaseName,
    }
  );
  // Create Example entity file using template
  writeTemplate(
    getTemplatePath("models/typeorm/Example.entity.ts"),
    exampleEntityPath
  );

  // Create database init file using template
  writeTemplate(getTemplatePath("database/typeorm/init.ts"), dbInitPath);

  // Create entities index file
  const entitiesIndexPath = path.join(destination, "src", "models", "index.ts");
  const entitiesIndexContent = `export { Example } from './Example';\n`;
  fs.writeFileSync(entitiesIndexPath, entitiesIndexContent);

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
}

export default setupTypeORM;
