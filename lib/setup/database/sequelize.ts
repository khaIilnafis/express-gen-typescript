import path from "path";
import fs from "fs";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";

/**
 * Options for Sequelize setup
 */
export interface SequelizeSetupOptions {
  databaseName?: string;
  dialect?: string;
  [key: string]: any;
}

/**
 * Setup Sequelize ORM
 * @param destination - Project destination directory
 * @param options - User selected options
 */
async function setupSequelize(
  destination: string,
  options: SequelizeSetupOptions = {}
): Promise<void> {
  console.log("Setting up Sequelize ORM...");

  // Define paths for destination files
  const dbConfigPath = path.join(
    destination,
    "src",
    "database",
    "sequelize.ts"
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

  // Get dialect from options or use default
  const dialect = options.dialect || "postgres";

  // Create database config file using template
  writeTemplate(
    getTemplatePath("database/sequelize/database.ts"),
    dbConfigPath,
    {
      databaseName,
      dialect,
    }
  );

  // Create example model using template
  writeTemplate(
    getTemplatePath("models/sequelize/Example.ts"),
    exampleModelPath
  );

  // Create database init file using template
  writeTemplate(getTemplatePath("database/sequelize/init.ts"), dbInitPath);

  // Create models index.ts file
  const modelsIndexPath = path.join(destination, "src", "models", "index.ts");
  const modelsIndexContent = `// Export Example models and types
import Example from './Example';

export { Example };
`;
  fs.writeFileSync(modelsIndexPath, modelsIndexContent);
  // Update init.ts to import Example model
  if (fs.existsSync(dbInitPath)) {
    let initContent = fs.readFileSync(dbInitPath, "utf8");

    // Add import for Example model if it doesn't exist
    if (!initContent.includes('import "../models/Example"')) {
      initContent = initContent.replace(
        'import "../models/Example";',
        'import "../models/Example";// import all models here\n'
      );
      fs.writeFileSync(dbInitPath, initContent);
      console.log("Updated database init file to import Example model");
    }
  }

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

export default setupSequelize;
