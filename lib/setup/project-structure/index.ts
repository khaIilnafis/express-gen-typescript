import fs from "fs";
import path from "path";
import serverGenerator from "./server.js";
import setupPassport from "../auth/passport.js";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";
import setupDatabase from "../database/index.js";
/**
 * Options for project structure setup
 */
export interface ProjectSetupOptions {
  database?: string;
  databaseName?: string;
  dialect?: string;
  authentication?: boolean;
  websocketLib?: string;
  viewEngine?: string;
  [key: string]: any;
}

/**
 * Server generator parameters expected structure
 */
export interface ServerGeneratorOptions {
  database: string;
  authentication: boolean;
  websocketLib: string;
  viewEngine: string;
  [key: string]: any;
}

/**
 * Setup project structure based on user options
 * @param destination - Project destination directory
 * @param options - User selected options
 */
async function setupProjectStructure(
  destination: string,
  options: ProjectSetupOptions
): Promise<void> {
  console.log("Setting up project structure...");

  // Create core directories
  createCoreDirectories(destination);

  // Create server.ts and type files
  // Prepare options for server generator with required properties
  const serverOptions: ServerGeneratorOptions = {
    database: options.database || "none",
    authentication: Boolean(options.authentication),
    websocketLib: options.websocketLib || "none",
    viewEngine: options.viewEngine || "none",
    databaseName: options.databaseName,
    dialect: options.dialect,
    ...options,
  };

  serverGenerator.generateServerFile(destination, serverOptions);
  serverGenerator.generateGlobalTypesFile(destination, serverOptions);

  // Create bin directory with startup files
  createBinFiles(destination);

  // Setup authentication if enabled
  if (options.authentication) {
    await setupPassport(destination);
  }

  // Setup database config and models
  if (options.database && options.database !== "none") {
    await setupDatabaseConfig(destination, options.database, options);
  }

  // Setup websockets if enabled
  if (options.websocketLib && options.websocketLib !== "none") {
    await setupWebsocketsConfig(destination, options.websocketLib);
  }

  // Setup views if enabled
  if (options.viewEngine && options.viewEngine !== "none") {
    await setupViewsConfig(destination, options.viewEngine);
  }

  // Create basic routes structure
  setupRoutesStructure(destination);

  // Create README.md file
  createReadme(destination, options);
}

/**
 * Create bin directory files
 * @param destination - Project destination directory
 */
function createBinFiles(destination: string): void {
  const binDir = path.join(destination, "bin");

  // Create bin directory if it doesn't exist
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir);
  }

  // Create www.ts file
  const wwwPath = path.join(binDir, "www.ts");
  writeTemplate(getTemplatePath("project-structure/bin/www.ts"), wwwPath);

  // Create start.js file
  const startPath = path.join(binDir, "start.js");
  writeTemplate(getTemplatePath("project-structure/bin/start.js"), startPath);

  // Make start.js file executable
  fs.chmodSync(startPath, "755");
}

/**
 * Create core project directories
 * @param destination - Project destination directory
 */
function createCoreDirectories(destination: string): void {
  const directories = [
    "bin",
    "controllers",
    "models",
    "public",
    "public/css",
    "public/js",
    "public/images",
    "routes",
    "services",
    "sockets",
    "utils",
    "config",
    "middleware",
    "migrations",
  ];

  // Create directories
  directories.forEach((dir) => {
    const dirPath = path.join(destination, "src", dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

/**
 * Setup database configuration and models
 * @param destination - Project destination directory
 * @param database - Selected database type
 * @param options - User selected options
 */
async function setupDatabaseConfig(
  destination: string,
  database: string,
  options: ProjectSetupOptions = {}
): Promise<void> {
  //   console.log(`Setting up ${database} database configuration...`);

  // Get database name from options or use default
  const databaseName =
    options.databaseName ||
    path
      .basename(destination)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");

  // Use the database setup modules
  await setupDatabase(destination, database, {
    databaseName,
    dialect: options.dialect || "postgres",
  });
}

/**
 * Setup websockets configuration
 * @param destination - Project destination directory
 * @param websocketLib - Selected websocket library
 */
async function setupWebsocketsConfig(
  destination: string,
  websocketLib: string
): Promise<void> {
  console.log(`Setting up ${websocketLib} websocket configuration...`);

  // Create sockets directory if it doesn't exist
  const socketsDir = path.join(destination, "src", "sockets");
  if (!fs.existsSync(socketsDir)) {
    fs.mkdirSync(socketsDir, { recursive: true });
  }

  if (websocketLib === "socketio" || websocketLib === "Socket.io") {
    // Create main socket.io handlers file
    const handlersPath = path.join(socketsDir, "index.ts");
    writeTemplate(
      getTemplatePath("websockets/socketio/index.ts"),
      handlersPath
    );
  } else if (websocketLib === "ws" || websocketLib === "WS") {
    // Create main websocket handlers file
    const handlersPath = path.join(socketsDir, "index.ts");
    writeTemplate(getTemplatePath("websockets/ws/index.ts"), handlersPath);
  }
}

/**
 * Setup views configuration
 * @param destination - Project destination directory
 * @param viewEngine - Selected view engine
 */
async function setupViewsConfig(
  destination: string,
  viewEngine: string
): Promise<void> {
  console.log(`Setting up ${viewEngine} view engine...`);

  // Create views directory if it doesn't exist
  const viewsDir = path.join(destination, "src", "views");
  if (!fs.existsSync(viewsDir)) {
    fs.mkdirSync(viewsDir, { recursive: true });
  }

  // Create layout directory
  const layoutsDir = path.join(viewsDir, "layouts");
  if (!fs.existsSync(layoutsDir)) {
    fs.mkdirSync(layoutsDir, { recursive: true });
  }

  // Create partials directory
  const partialsDir = path.join(viewsDir, "partials");
  if (!fs.existsSync(partialsDir)) {
    fs.mkdirSync(partialsDir, { recursive: true });
  }

  // Create views based on selected engine
  if (viewEngine === "pug") {
    // Create layout file
    const layoutPath = path.join(layoutsDir, "main.pug");
    writeTemplate(getTemplatePath("views/pug/layouts/main.pug"), layoutPath);

    // Create header partial
    const headerPath = path.join(partialsDir, "header.pug");
    writeTemplate(getTemplatePath("views/pug/partials/header.pug"), headerPath);

    // Create footer partial
    const footerPath = path.join(partialsDir, "footer.pug");
    writeTemplate(getTemplatePath("views/pug/partials/footer.pug"), footerPath);

    // Create index view
    const indexPath = path.join(viewsDir, "index.pug");
    writeTemplate(getTemplatePath("views/pug/index.pug"), indexPath);
  } else if (viewEngine === "ejs") {
    // Create layout file
    const layoutPath = path.join(layoutsDir, "main.ejs");
    writeTemplate(getTemplatePath("views/ejs/layouts/main.ejs"), layoutPath);

    // Create header partial
    const headerPath = path.join(partialsDir, "header.ejs");
    writeTemplate(getTemplatePath("views/ejs/partials/header.ejs"), headerPath);

    // Create footer partial
    const footerPath = path.join(partialsDir, "footer.ejs");
    writeTemplate(getTemplatePath("views/ejs/partials/footer.ejs"), footerPath);

    // Create index view
    const indexPath = path.join(viewsDir, "index.ejs");
    writeTemplate(getTemplatePath("views/ejs/index.ejs"), indexPath);
  } else if (viewEngine === "handlebars") {
    // Create layout file
    const layoutPath = path.join(layoutsDir, "main.handlebars");
    writeTemplate(
      getTemplatePath("views/handlebars/layouts/main.handlebars"),
      layoutPath
    );

    // Create header partial
    const headerPath = path.join(partialsDir, "header.handlebars");
    writeTemplate(
      getTemplatePath("views/handlebars/partials/header.handlebars"),
      headerPath
    );

    // Create footer partial
    const footerPath = path.join(partialsDir, "footer.handlebars");
    writeTemplate(
      getTemplatePath("views/handlebars/partials/footer.handlebars"),
      footerPath
    );

    // Create index view
    const indexPath = path.join(viewsDir, "index.handlebars");
    writeTemplate(
      getTemplatePath("views/handlebars/index.handlebars"),
      indexPath
    );
  }
}

/**
 * Setup basic routes structure
 * @param destination - Project destination directory
 */
function setupRoutesStructure(destination: string): void {
  const routesDir = path.join(destination, "src", "routes");
  const controllersDir = path.join(destination, "src", "controllers");
  const exampleControllerDir = path.join(controllersDir, "example");

  // Create example controller directory if it doesn't exist
  if (!fs.existsSync(exampleControllerDir)) {
    fs.mkdirSync(exampleControllerDir, { recursive: true });
  }

  // Create index router if it doesn't exist
  const indexRouterPath = path.join(routesDir, "index.ts");
  if (!fs.existsSync(indexRouterPath)) {
    writeTemplate(getTemplatePath("routes/index.ts"), indexRouterPath);
  }

  // Create example routes
  const exampleRoutesPath = path.join(routesDir, "example.routes.ts");
  writeTemplate(getTemplatePath("routes/example.routes.ts"), exampleRoutesPath);

  // Create example controller files
  const exampleControllerIndexPath = path.join(
    exampleControllerDir,
    "index.ts"
  );
  writeTemplate(
    getTemplatePath("controllers/example/index.ts"),
    exampleControllerIndexPath
  );

  const exampleControllerLogicPath = path.join(
    exampleControllerDir,
    "exampleController.ts"
  );
  writeTemplate(
    getTemplatePath("controllers/example/exampleController.ts"),
    exampleControllerLogicPath
  );
}

/**
 * Create README.md file
 * @param destination - Project destination directory
 * @param options - User selected options
 */
function createReadme(destination: string, options: ProjectSetupOptions): void {
  const readmePath = path.join(destination, "README.md");

  let databaseName = "none";
  if (options.database && options.database !== "none") {
    databaseName = options.database;
  }

  let authEnabled = options.authentication ? "enabled" : "disabled";

  let websocketLib = "none";
  if (options.websocketLib && options.websocketLib !== "none") {
    websocketLib = options.websocketLib;
  }

  let viewEngine = "none";
  if (options.viewEngine && options.viewEngine !== "none") {
    viewEngine = options.viewEngine;
  }

  // Prepare template variables
  const websocketDirs =
    options.websocketLib !== "none"
      ? "sockets/          # WebSocket handlers\n"
      : "";

  const viewDirs =
    options.viewEngine !== "none" ? "views/            # View templates\n" : "";

  // Prepare database prerequisites
  let databasePrereqs = "";
  if (options.database === "mongo" || options.database === "mongoose") {
    databasePrereqs += "- MongoDB\n";
  }
  if (
    options.database === "postgres" ||
    options.database === "typeorm" ||
    options.database === "prisma"
  ) {
    databasePrereqs += "- PostgreSQL\n";
  }
  if (options.database === "mysql" || options.database === "sequelize") {
    databasePrereqs += "- MySQL/MariaDB\n";
  }

  // Prepare database environment variables
  let databaseEnvVars = "";
  if (options.database === "sequelize") {
    databaseEnvVars +=
      "DB_HOST=localhost\nDB_PORT=3306\nDB_NAME=mydb\nDB_USER=root\nDB_PASSWORD=\n";
  } else if (options.database === "mongoose") {
    databaseEnvVars += "MONGODB_URI=mongodb://localhost:27017/myapp\n";
  } else if (options.database === "prisma") {
    databaseEnvVars +=
      "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mydb?schema=public\n";
  } else if (options.database === "typeorm") {
    databaseEnvVars +=
      "DB_HOST=localhost\nDB_PORT=5432\nDB_NAME=mydb\nDB_USER=postgres\nDB_PASSWORD=postgres\n";
  }

  // Prepare authentication environment variables
  const authEnvVars = options.authentication
    ? "JWT_SECRET=your-secret-key\nJWT_EXPIRES_IN=24h\n"
    : "";

  // Create README using template
  writeTemplate(getTemplatePath("project-structure/README.md"), readmePath, {
    databaseName,
    authEnabled,
    websocketLib,
    viewEngine,
    websocketDirs: websocketDirs + viewDirs,
    databasePrereqs,
    databaseEnvVars,
    authEnvVars,
  });
  console.log("Created README.md file");
}

export default setupProjectStructure;
