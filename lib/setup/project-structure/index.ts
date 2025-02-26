import fs from "fs";
import path from "path";
import serverGenerator from "./server.js";
import setupPassport from "../auth/passport.js";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";
import setupDatabase from "../database/index.js";
import {
  getDefaultDatabaseName,
  getDatabaseDialect,
  getDatabaseEnvVars,
  normalizeDatabaseName,
} from "../../utils/database-helper.js";
import { createEnvFile } from "../../utils/config-helper.js";
import {
  DIRECTORIES,
  TEMPLATES,
  MESSAGES,
  DATABASES,
  WEBSOCKETS,
  VIEW_ENGINES,
  APP,
} from "../../constants/index.js";
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
  console.log(MESSAGES.SETUP.PROJECT_STRUCTURE);

  // Create core directories
  createCoreDirectories(destination);

  // Create .env file with appropriate environment variables
  createEnvironmentFile(destination, options);

  // Create server.ts and type files
  // Prepare options for server generator with required properties
  const serverOptions: ServerGeneratorOptions = {
    database: options.database || DATABASES.TYPES.NONE,
    authentication: Boolean(options.authentication),
    websocketLib: options.websocketLib || WEBSOCKETS.LIBRARIES.NONE,
    viewEngine: options.viewEngine || VIEW_ENGINES.TYPES.NONE,
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
  if (options.database && options.database !== DATABASES.TYPES.NONE) {
    await setupDatabaseConfig(destination, options.database, options);
  }

  // Setup websockets if enabled
  if (
    options.websocketLib &&
    options.websocketLib !== WEBSOCKETS.LIBRARIES.NONE
  ) {
    await setupWebsocketsConfig(destination, options.websocketLib);
  }

  // Setup views if enabled
  if (options.viewEngine && options.viewEngine !== VIEW_ENGINES.TYPES.NONE) {
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
  const binDir = path.join(destination, DIRECTORIES.ROOT.BIN);

  // Create bin directory if it doesn't exist
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir);
  }

  // Create www.ts file
  const wwwPath = path.join(binDir, "www.ts");
  writeTemplate(getTemplatePath(TEMPLATES.PROJECT_STRUCTURE.BIN.WWW), wwwPath);
}

/**
 * Create core project directories
 * @param destination - Project destination directory
 */
function createCoreDirectories(destination: string): void {
  const { ROOT, SRC, PUBLIC } = DIRECTORIES;

  // Define all directories to create
  const directories = [
    SRC.CONTROLLERS,
    SRC.MODELS,
    SRC.PUBLIC,
    `${SRC.PUBLIC}/${PUBLIC.CSS}`,
    `${SRC.PUBLIC}/${PUBLIC.JS}`,
    `${SRC.PUBLIC}/${PUBLIC.IMAGES}`,
    SRC.ROUTES,
    SRC.SERVICES,
    SRC.SOCKETS,
    SRC.UTILS,
    SRC.TYPES,
    SRC.CONFIG,
    SRC.MIDDLEWARE,
    SRC.MIGRATIONS,
  ];

  // Create directories
  directories.forEach((dir) => {
    const dirPath = path.join(destination, ROOT.SRC, dir);
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
  // Skip if no database or none was selected
  if (!database || database === DATABASES.TYPES.NONE) {
    return;
  }

  console.log("Starting database setup from project structure setup...");

  // Check if database setup is already in progress (flag set by database-setup-helper.ts)
  if ((global as any).databaseSetupInProgress) {
    console.log(
      "Database setup already in progress, skipping from project structure setup"
    );
    return;
  }

  // Use the database setup module with all necessary options
  await setupDatabase({
    destination,
    database,
    databaseName:
      options.databaseName || normalizeDatabaseName(path.basename(destination)),
    ...options,
  });

  console.log("Completed database setup from project structure setup");
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
  console.log(MESSAGES.SETUP.WEBSOCKETS(websocketLib));

  // Create sockets directory if it doesn't exist
  const socketsDir = path.join(
    destination,
    DIRECTORIES.ROOT.SRC,
    DIRECTORIES.SRC.SOCKETS
  );
  if (!fs.existsSync(socketsDir)) {
    fs.mkdirSync(socketsDir, { recursive: true });
  }

  if (websocketLib === WEBSOCKETS.LIBRARIES.SOCKETIO) {
    // Create main socket.io handlers file
    const handlersPath = path.join(socketsDir, "index.ts");
    writeTemplate(
      getTemplatePath(TEMPLATES.WEBSOCKETS.SOCKETIO.INDEX),
      handlersPath
    );
  } else if (websocketLib === WEBSOCKETS.LIBRARIES.WS) {
    // Create main websocket handlers file
    const handlersPath = path.join(socketsDir, "index.ts");
    writeTemplate(getTemplatePath(TEMPLATES.WEBSOCKETS.WS.INDEX), handlersPath);
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
  console.log(MESSAGES.SETUP.VIEW_ENGINE(viewEngine));

  // Create views directory if it doesn't exist
  const viewsDir = path.join(
    destination,
    DIRECTORIES.ROOT.SRC,
    DIRECTORIES.SRC.VIEWS
  );
  if (!fs.existsSync(viewsDir)) {
    fs.mkdirSync(viewsDir, { recursive: true });
  }

  // Create layout directory
  const layoutsDir = path.join(viewsDir, DIRECTORIES.VIEWS.LAYOUTS);
  if (!fs.existsSync(layoutsDir)) {
    fs.mkdirSync(layoutsDir, { recursive: true });
  }

  // Create partials directory
  const partialsDir = path.join(viewsDir, DIRECTORIES.VIEWS.PARTIALS);
  if (!fs.existsSync(partialsDir)) {
    fs.mkdirSync(partialsDir, { recursive: true });
  }

  // Create views based on selected engine
  if (viewEngine === VIEW_ENGINES.TYPES.PUG) {
    // Create layout file
    const layoutPath = path.join(layoutsDir, "main.pug");
    writeTemplate(
      getTemplatePath(TEMPLATES.VIEWS.PUG.LAYOUTS.MAIN),
      layoutPath
    );

    // Create header partial
    const headerPath = path.join(partialsDir, "header.pug");
    writeTemplate(
      getTemplatePath(TEMPLATES.VIEWS.PUG.PARTIALS.HEADER),
      headerPath
    );

    // Create footer partial
    const footerPath = path.join(partialsDir, "footer.pug");
    writeTemplate(
      getTemplatePath(TEMPLATES.VIEWS.PUG.PARTIALS.FOOTER),
      footerPath
    );

    // Create index view
    const indexPath = path.join(viewsDir, "index.pug");
    writeTemplate(getTemplatePath(TEMPLATES.VIEWS.PUG.INDEX), indexPath);
  } else if (viewEngine === VIEW_ENGINES.TYPES.EJS) {
    // Create layout file
    const layoutPath = path.join(layoutsDir, "main.ejs");
    writeTemplate(
      getTemplatePath(TEMPLATES.VIEWS.EJS.LAYOUTS.MAIN),
      layoutPath
    );

    // Create header partial
    const headerPath = path.join(partialsDir, "header.ejs");
    writeTemplate(
      getTemplatePath(TEMPLATES.VIEWS.EJS.PARTIALS.HEADER),
      headerPath
    );

    // Create footer partial
    const footerPath = path.join(partialsDir, "footer.ejs");
    writeTemplate(
      getTemplatePath(TEMPLATES.VIEWS.EJS.PARTIALS.FOOTER),
      footerPath
    );

    // Create index view
    const indexPath = path.join(viewsDir, "index.ejs");
    writeTemplate(getTemplatePath(TEMPLATES.VIEWS.EJS.INDEX), indexPath);
  } else if (viewEngine === VIEW_ENGINES.TYPES.HANDLEBARS) {
    // Create layout file
    const layoutPath = path.join(layoutsDir, "main.handlebars");
    writeTemplate(
      getTemplatePath(TEMPLATES.VIEWS.HANDLEBARS.LAYOUTS.MAIN),
      layoutPath
    );

    // Create header partial
    const headerPath = path.join(partialsDir, "header.handlebars");
    writeTemplate(
      getTemplatePath(TEMPLATES.VIEWS.HANDLEBARS.PARTIALS.HEADER),
      headerPath
    );

    // Create footer partial
    const footerPath = path.join(partialsDir, "footer.handlebars");
    writeTemplate(
      getTemplatePath(TEMPLATES.VIEWS.HANDLEBARS.PARTIALS.FOOTER),
      footerPath
    );

    // Create index view
    const indexPath = path.join(viewsDir, "index.handlebars");
    writeTemplate(getTemplatePath(TEMPLATES.VIEWS.HANDLEBARS.INDEX), indexPath);
  }
}

/**
 * Setup basic routes structure
 * @param destination - Project destination directory
 */
function setupRoutesStructure(destination: string): void {
  const { ROOT, SRC } = DIRECTORIES;

  const routesDir = path.join(destination, ROOT.SRC, SRC.ROUTES);
  const controllersDir = path.join(destination, ROOT.SRC, SRC.CONTROLLERS);
  const exampleControllerDir = path.join(controllersDir, "example");

  // Create example controller directory if it doesn't exist
  if (!fs.existsSync(exampleControllerDir)) {
    fs.mkdirSync(exampleControllerDir, { recursive: true });
  }

  // Create index router if it doesn't exist
  const indexRouterPath = path.join(routesDir, "index.ts");
  if (!fs.existsSync(indexRouterPath)) {
    writeTemplate(getTemplatePath(TEMPLATES.ROUTES.INDEX), indexRouterPath);
  }

  // Create example routes
  const exampleRoutesPath = path.join(routesDir, "example.routes.ts");
  writeTemplate(getTemplatePath(TEMPLATES.ROUTES.EXAMPLE), exampleRoutesPath);

  // Create example controller files
  const exampleControllerIndexPath = path.join(
    exampleControllerDir,
    "index.ts"
  );
  writeTemplate(
    getTemplatePath(TEMPLATES.CONTROLLERS.EXAMPLE.INDEX),
    exampleControllerIndexPath
  );

  const exampleControllerLogicPath = path.join(
    exampleControllerDir,
    "exampleController.ts"
  );
  writeTemplate(
    getTemplatePath(TEMPLATES.CONTROLLERS.EXAMPLE.CONTROLLER),
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

  let databaseName = DATABASES.TYPES.NONE;
  if (options.database && options.database !== DATABASES.TYPES.NONE) {
    databaseName = options.database;
  }

  let authEnabled = options.authentication ? "enabled" : "disabled";

  let websocketLib = WEBSOCKETS.LIBRARIES.NONE;
  if (
    options.websocketLib &&
    options.websocketLib !== WEBSOCKETS.LIBRARIES.NONE
  ) {
    websocketLib = options.websocketLib;
  }

  let viewEngine = VIEW_ENGINES.TYPES.NONE;
  if (options.viewEngine && options.viewEngine !== VIEW_ENGINES.TYPES.NONE) {
    viewEngine = options.viewEngine;
  }

  // Prepare template variables
  const websocketDirs =
    options.websocketLib !== WEBSOCKETS.LIBRARIES.NONE
      ? "sockets/          # WebSocket handlers\n"
      : "";

  const viewDirs =
    options.viewEngine !== VIEW_ENGINES.TYPES.NONE
      ? "views/            # View templates\n"
      : "";

  // Prepare database prerequisites
  let databasePrereqs = "";
  if (options.database === DATABASES.TYPES.MONGOOSE) {
    databasePrereqs += "- MongoDB\n";
  }
  if (
    options.database === DATABASES.TYPES.TYPEORM ||
    options.database === DATABASES.TYPES.PRISMA
  ) {
    databasePrereqs += "- PostgreSQL\n";
  }
  if (options.database === DATABASES.TYPES.SEQUELIZE) {
    databasePrereqs += "- MySQL/MariaDB\n";
  }

  // Prepare database environment variables
  let databaseEnvVars = "";
  if (options.database === DATABASES.TYPES.SEQUELIZE) {
    const { HOST, PORT, DEFAULT_DB_NAME, USER, PASSWORD } =
      DATABASES.DEFAULTS.MYSQL;
    databaseEnvVars += `DB_HOST=${HOST}\nDB_PORT=${PORT}\nDB_NAME=${DEFAULT_DB_NAME}\nDB_USER=${USER}\nDB_PASSWORD=${PASSWORD}\n`;
  } else if (options.database === DATABASES.TYPES.MONGOOSE) {
    const dbName =
      options.databaseName || DATABASES.DEFAULTS.MONGODB.DEFAULT_DB_NAME;
    databaseEnvVars += `MONGODB_URI=${DATABASES.DEFAULTS.MONGODB.URI(
      dbName
    )}\n`;
  } else if (options.database === DATABASES.TYPES.PRISMA) {
    const dbName =
      options.databaseName || DATABASES.DEFAULTS.POSTGRES.DEFAULT_DB_NAME;
    databaseEnvVars += `DATABASE_URL=${DATABASES.DEFAULTS.POSTGRES.URI(
      dbName
    )}\n`;
  } else if (options.database === DATABASES.TYPES.TYPEORM) {
    const { HOST, PORT, DEFAULT_DB_NAME, USER, PASSWORD } =
      DATABASES.DEFAULTS.POSTGRES;
    databaseEnvVars += `DB_HOST=${HOST}\nDB_PORT=${PORT}\nDB_NAME=${DEFAULT_DB_NAME}\nDB_USER=${USER}\nDB_PASSWORD=${PASSWORD}\n`;
  }

  // Prepare authentication environment variables
  const authEnvVars = options.authentication
    ? "JWT_SECRET=your-secret-key\nJWT_EXPIRES_IN=24h\n"
    : "";

  // Create README using template
  writeTemplate(
    getTemplatePath(TEMPLATES.PROJECT_STRUCTURE.README),
    readmePath,
    {
      databaseName,
      authEnabled,
      websocketLib,
      viewEngine,
      websocketDirs: websocketDirs + viewDirs,
      databasePrereqs,
      databaseEnvVars,
      authEnvVars,
    }
  );
  console.log(MESSAGES.SUCCESS.README);
}

/**
 * Create .env file with environment variables based on project options
 * @param destination - Project destination directory
 * @param options - Project setup options
 */
function createEnvironmentFile(
  destination: string,
  options: ProjectSetupOptions
): void {
  console.log(MESSAGES.SETUP.ENV_FILE);

  // Start with default environment variables
  const envVars: Record<string, string> = {
    PORT: APP.DEFAULTS.PORT.toString(),
    NODE_ENV: APP.ENV.DEVELOPMENT,
  };

  // Add database-specific environment variables
  if (options.database && options.database !== DATABASES.TYPES.NONE) {
    const dbName =
      options.databaseName ||
      getDefaultDatabaseName(path.basename(destination), options.database);
    const dbEnvVars = getDatabaseEnvVars(options.database, dbName);
    Object.assign(envVars, dbEnvVars);
  }

  // Add authentication environment variables if needed
  if (options.authentication) {
    envVars.JWT_SECRET = "your-jwt-secret-key-change-in-production";
    envVars.JWT_EXPIRES_IN = "24h";
  }

  // Create the .env file
  createEnvFile(destination, envVars);

  // Also create a .env.example file as a template
  const envExamplePath = path.join(destination, ".env.example");
  const envExampleContent = Object.entries(envVars)
    .map(([key, value]) => {
      // Replace actual secrets with placeholders in the example
      if (key === "JWT_SECRET") {
        return `${key}=your-secret-key-here`;
      }
      return `${key}=${value}`;
    })
    .join("\n");

  fs.writeFileSync(envExamplePath, envExampleContent, "utf8");
}

export default setupProjectStructure;
