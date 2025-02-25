import path from "path";
import fs from "fs";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";

/**
 * Options for Mongoose setup
 */
export interface MongooseSetupOptions {
  databaseName?: string;
  [key: string]: any;
}

/**
 * Setup Mongoose ODM
 * @param destination - Project destination directory
 * @param options - User selected options
 */
async function setupMongoose(
  destination: string,
  options: MongooseSetupOptions = {}
): Promise<void> {
  console.log("Setting up Mongoose ODM...");
  // Define paths for destination files
  const dbConfigPath = path.join(
    destination,
    "src",
    "database",
    "connection.ts"
  );
  const exampleModelPath = path.join(
    destination,
    "src",
    "models",
    "Example.ts"
  );
  const dbInitPath = path.join(destination, "src", "database", "init.ts");

  // Get database name from options or use default
  const databaseName =
    options.databaseName ||
    path
      .basename(destination)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");

  // Create database config file using template
  writeTemplate(
    getTemplatePath("database/mongoose/connection.ts"),
    dbConfigPath,
    {
      databaseName,
    }
  );

  // Create example model using template
  writeTemplate(
    getTemplatePath("models/mongoose/Example.ts"),
    exampleModelPath
  );
  // Create database init file using template
  writeTemplate(getTemplatePath("database/mongoose/init.ts"), dbInitPath);

  // Create models index.ts file
  const modelsIndexPath = path.join(destination, "src", "models", "index.ts");
  const modelsIndexContent = `export { Example } from './Example';\n`;
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
}

export default setupMongoose;
