import fs from "fs";
import path from "path";
import serverGenerator from "./server.js";
import setupPassport from "../auth/passport.js";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";
import setupDatabase from "../database/index.js";
import {
  getDefaultDatabaseName,
  getDatabaseEnvVars,
  normalizeDatabaseName,
} from "../../utils/database-helper.js";
import { createEnvFile } from "../../utils/config-helper.js";
import {
	PROJECT,
  TEMPLATES,
  COMMON,
  DATABASE,
  WEBSOCKETS,
  VIEW_ENGINES,
  APP,
  AUTH,
  SERVER,
} from "../../constants/index.js";
import setupViewEngine from "../views/index.js";
import setupWebsockets from "../websockets/index.js";
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
  console.log(COMMON.MESSAGES.SETUP.PROJECT_STRUCTURE);

  // Create core directories
  createCoreDirectories(destination);

  // Create .env file with appropriate environment variables
  createEnvironmentFile(destination, options);

  // Create server.ts and type files
  // Prepare options for server generator with required properties
  const serverOptions: ServerGeneratorOptions = {
    database: options.database || DATABASE.TYPES.NONE,
    authentication: Boolean(options.authentication),
    websocketLib: options.websocketLib || WEBSOCKETS.LIBRARIES.NONE,
    viewEngine: options.viewEngine || VIEW_ENGINES.TYPES.NONE,
    databaseName: options.databaseName,
    dialect: options.dialect,
    ...options,
  };

  // Generate server files
  serverGenerator.generateServerFiles(destination, serverOptions);
  serverGenerator.generateGlobalTypesFile(destination, serverOptions);

  // Create bin directory with startup files
  createBinFiles(destination);

  // Setup authentication if enabled
  if (options.authentication) {
    await setupPassport(destination);
  }

  // Setup database config and models
  if (options.database && options.database !== DATABASE.TYPES.NONE) {
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
  setupRoutesStructure(destination, options.viewEngine);

  // Create README.md file
  createReadme(destination, options);
}

/**
 * Create bin directory files
 * @param destination - Project destination directory
 */
function createBinFiles(destination: string): void {
  const binDir = path.join(destination, PROJECT.DIRECTORIES.ROOT.BIN);

  // Create bin directory if it doesn't exist
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir);
  }

  // Create www.ts file
  const wwwPath = path.join(binDir, PROJECT.FILES.BIN.SERVER);
  writeTemplate(getTemplatePath(TEMPLATES.PROJECT_STRUCTURE.BIN.WWW), wwwPath);
}

/**
 * Create core project directories
 * @param destination - Project destination directory
 */
function createCoreDirectories(destination: string): void {
  const { ROOT, SRC, PUBLIC } = PROJECT.DIRECTORIES;

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
    SRC.DATABASE,
    SRC.VIEWS,
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
  if (!database || database === DATABASE.TYPES.NONE) {
    return;
  }

  console.log(`${COMMON.MESSAGES.SETUP.DATABASE(database)}`);

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
  // Skip if no websocket library or none was selected
  if (!websocketLib || websocketLib === WEBSOCKETS.LIBRARIES.NONE) {
    return;
  }
  
  console.log(COMMON.MESSAGES.SETUP.WEBSOCKETS(websocketLib));
  
  // Use the dedicated websockets setup
  await setupWebsockets(destination, websocketLib);
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
  // Skip if no view engine or none was selected
  if (!viewEngine || viewEngine === VIEW_ENGINES.TYPES.NONE) {
    return;
  }
  console.log(`engine`);
  console.log(COMMON.MESSAGES.SETUP.VIEW_ENGINE(viewEngine));
  
  // Use the dedicated view engine setup
  await setupViewEngine(destination, viewEngine, {
    appName: path.basename(destination)
  });
}

/**
 * Setup basic routes structure
 * @param destination - Project destination directory
 * @param viewEngine - Selected view engine (optional)
 */
function setupRoutesStructure(destination: string, viewEngine?: string): void {
  const { ROOT, SRC } = PROJECT.DIRECTORIES;

  const routesDir = path.join(destination, ROOT.SRC, SRC.ROUTES);
  const controllersDir = path.join(destination, ROOT.SRC, SRC.CONTROLLERS);
  const exampleControllerDir = path.join(controllersDir, "example");

  // Create example controller directory if it doesn't exist
  if (!fs.existsSync(exampleControllerDir)) {
    fs.mkdirSync(exampleControllerDir, { recursive: true });
  }

  // Create index router if it doesn't exist
  const indexRouterPath = path.join(routesDir, PROJECT.FILES.ROUTES.INDEX);
  if (!fs.existsSync(indexRouterPath)) {
    // Determine which root route handler to use based on view engine
    const templateVars = {
      rootRouteHandler: SERVER.ROOT_ROUTE_HANDLER.DEFAULT
    };
    
    writeTemplate(getTemplatePath(TEMPLATES.ROUTES.INDEX), indexRouterPath, templateVars);
  }

  // Create example routes
  const exampleRoutesPath = path.join(routesDir, PROJECT.FILES.ROUTES.EXAMPLE);
  writeTemplate(getTemplatePath(TEMPLATES.ROUTES.EXAMPLE), exampleRoutesPath);

  // Create example controller files
  const exampleControllerIndexPath = path.join(
    exampleControllerDir,
    PROJECT.FILES.CONTROLLERS.INDEX
  );
  writeTemplate(
    getTemplatePath(TEMPLATES.CONTROLLERS.EXAMPLE.INDEX),
    exampleControllerIndexPath
  );

  const exampleControllerLogicPath = path.join(
    exampleControllerDir,
    PROJECT.FILES.CONTROLLERS.EXAMPLE
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
  const readmePath = path.join(destination, PROJECT.FILES.COMMON.README);

  let databaseName: string = DATABASE.TYPES.NONE;
  if (options.database && options.database !== DATABASE.TYPES.NONE) {
    databaseName = options.database;
  }

  let authEnabled = options.authentication ? "enabled" : "disabled";

  let websocketLib: typeof WEBSOCKETS.LIBRARIES.NONE | typeof WEBSOCKETS.LIBRARIES.SOCKETIO | typeof WEBSOCKETS.LIBRARIES.WS = WEBSOCKETS.LIBRARIES.NONE;
  if (
    options.websocketLib &&
    options.websocketLib !== WEBSOCKETS.LIBRARIES.NONE
  ) {
    websocketLib = options.websocketLib as typeof WEBSOCKETS.LIBRARIES.SOCKETIO | typeof WEBSOCKETS.LIBRARIES.WS;
  }

  let viewEngine: typeof VIEW_ENGINES.TYPES.NONE | typeof VIEW_ENGINES.TYPES.PUG | typeof VIEW_ENGINES.TYPES.EJS | typeof VIEW_ENGINES.TYPES.HANDLEBARS = VIEW_ENGINES.TYPES.NONE;
  if (options.viewEngine && options.viewEngine !== VIEW_ENGINES.TYPES.NONE) {
    viewEngine = options.viewEngine as typeof VIEW_ENGINES.TYPES.PUG | typeof VIEW_ENGINES.TYPES.EJS | typeof VIEW_ENGINES.TYPES.HANDLEBARS;
  }

  // Prepare template variables
  const websocketDirs =
    options.websocketLib !== WEBSOCKETS.LIBRARIES.NONE
      ? `${PROJECT.DIRECTORIES.SRC.SOCKETS}/          # WebSocket handlers\n`
      : "";

  const viewDirs =
    options.viewEngine !== VIEW_ENGINES.TYPES.NONE
      ? `${PROJECT.DIRECTORIES.SRC.VIEWS}/            # View templates\n`
      : "";

  // Prepare database prerequisites
  let databasePrereqs = "";
  if (options.database === DATABASE.TYPES.MONGOOSE) {
    databasePrereqs += "- MongoDB\n";
  }
  if (
    options.database === DATABASE.TYPES.TYPEORM ||
    options.database === DATABASE.TYPES.PRISMA
  ) {
    databasePrereqs += "- PostgreSQL\n";
  }
  if (options.database === DATABASE.TYPES.SEQUELIZE) {
    databasePrereqs += "- MySQL/MariaDB\n";
  }

  // Prepare database environment variables
  let databaseEnvVars = "";
  if (options.database === DATABASE.TYPES.SEQUELIZE) {
    const { HOST, PORT, DEFAULT_DB_NAME, USER, PASSWORD } =
      DATABASE.DEFAULTS.MYSQL;
    databaseEnvVars += `DB_HOST=${HOST}\nDB_PORT=${PORT}\nDB_NAME=${DEFAULT_DB_NAME}\nDB_USER=${USER}\nDB_PASSWORD=${PASSWORD}\n`;
  } else if (options.database === DATABASE.TYPES.MONGOOSE) {
    const dbName =
      options.databaseName || DATABASE.DEFAULTS.MONGODB.DEFAULT_DB_NAME;
    databaseEnvVars += `MONGODB_URI=${DATABASE.DEFAULTS.MONGODB.URI(
      dbName
    )}\n`;
  } else if (options.database === DATABASE.TYPES.PRISMA) {
    const dbName =
      options.databaseName || DATABASE.DEFAULTS.POSTGRES.DEFAULT_DB_NAME;
    databaseEnvVars += `DATABASE_URL=${DATABASE.DEFAULTS.POSTGRES.URI(
      dbName
    )}\n`;
  } else if (options.database === DATABASE.TYPES.TYPEORM) {
    const { HOST, PORT, DEFAULT_DB_NAME, USER, PASSWORD } =
      DATABASE.DEFAULTS.POSTGRES;
    databaseEnvVars += `DB_HOST=${HOST}\nDB_PORT=${PORT}\nDB_NAME=${DEFAULT_DB_NAME}\nDB_USER=${USER}\nDB_PASSWORD=${PASSWORD}\n`;
  }

  // Prepare authentication environment variables
  const authEnvVars = options.authentication
    ? `JWT_SECRET=your-secret-key\nJWT_EXPIRES_IN=${AUTH.CONFIG.JWT.EXPIRATION.ACCESS}\n`
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
  console.log(COMMON.MESSAGES.SUCCESS.README);
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
  console.log(COMMON.MESSAGES.SETUP.ENV_FILE);

  // Start with default environment variables
  const envVars: Record<string, string> = {
    PORT: APP.DEFAULTS.PORT.toString(),
    NODE_ENV: APP.ENV.DEVELOPMENT,
  };

  // Add database-specific environment variables
  if (options.database && options.database !== DATABASE.TYPES.NONE) {
    const dbName =
      options.databaseName ||
      getDefaultDatabaseName(path.basename(destination), options.database);
    const dbEnvVars = getDatabaseEnvVars(options.database, dbName);
    Object.assign(envVars, dbEnvVars);
  }

  // Add authentication environment variables if needed
  if (options.authentication) {
    envVars.JWT_SECRET = "your-jwt-secret-key-change-in-production";
    envVars.JWT_EXPIRES_IN = AUTH.CONFIG.JWT.EXPIRATION.ACCESS;
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
