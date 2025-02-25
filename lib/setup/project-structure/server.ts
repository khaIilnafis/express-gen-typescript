import fs from "fs";
import path from "path";
import {
  loadTemplate,
  writeTemplate,
  getTemplatePath,
  TemplateVariables,
} from "../../utils/template-loader.js";
import {
  DATABASES,
  WEBSOCKETS,
  TEMPLATES,
  ERRORS,
  APP,
  SERVER_IMPORTS,
  SERVER_CLASS_PROPERTIES,
  SERVER_CONSTRUCTOR_CALLS,
  SERVER_WEBSOCKET_METHODS,
  SERVER_ROUTER_INIT,
  SERVER_VIEW_ENGINE_SETUP,
  SERVER_ROOT_ROUTE_HANDLER,
  SERVER_TYPE_DECLARATIONS,
  VIEW_ENGINES,
} from "../../constants/index.js";
import { getDatabaseConnectionCode } from "../../utils/database-helper.js";

// Import interface from index.ts
import { ServerGeneratorOptions } from "./index.js";

/**
 * Template variables interface for server generation
 */
interface ServerTemplateVars {
  databaseImports: string;
  authImports: string;
  websocketImports: string;
  viewImports: string;
  classProperties: string;
  constructorCalls: string;
  middlewareSetup: string;
  databaseMethod: string;
  websocketMethod: string;
  socketRouterInit: string;
  rootRouteHandler: string;
  [key: string]: any;
}

/**
 * Generate server.ts file with customizations based on user options
 * @param destination - Project destination directory
 * @param options - User selected options
 */
function generateServerFile(
  destination: string,
  options: ServerGeneratorOptions
): void {
  // Create a variables object to replace placeholders in the template
  const templateVars: ServerTemplateVars = {
    databaseImports: "",
    authImports: "",
    websocketImports: "",
    viewImports: "",
    classProperties: "",
    constructorCalls: "",
    middlewareSetup: "",
    databaseMethod: "",
    websocketMethod: "",
    socketRouterInit: SERVER_ROUTER_INIT.DEFAULT,
    rootRouteHandler: SERVER_ROOT_ROUTE_HANDLER.DEFAULT,
  };

  // Add database imports if a database was selected
  if (options.database && options.database !== DATABASES.TYPES.NONE) {
    // Add database imports based on selected database
    switch (options.database) {
      case DATABASES.TYPES.SEQUELIZE:
        templateVars.databaseImports = SERVER_IMPORTS.DATABASE.SEQUELIZE;
        break;
      case DATABASES.TYPES.MONGOOSE:
        templateVars.databaseImports = SERVER_IMPORTS.DATABASE.MONGOOSE;
        break;
      case DATABASES.TYPES.PRISMA:
        templateVars.databaseImports = SERVER_IMPORTS.DATABASE.PRISMA;
        templateVars.classProperties += SERVER_CLASS_PROPERTIES.PRISMA;
        break;
      case DATABASES.TYPES.TYPEORM:
        templateVars.databaseImports = SERVER_IMPORTS.DATABASE.TYPEORM;
        break;
    }

    // Generate proper database connection method using the utility function
    const dbName =
      options.databaseName ||
      path
        .basename(destination)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_");

    templateVars.databaseMethod = getDatabaseConnectionCode(options.database, {
      databaseName: dbName,
      pgUser: DATABASES.DEFAULTS.POSTGRES.USER,
      pgPassword: DATABASES.DEFAULTS.POSTGRES.PASSWORD,
      pgHost: DATABASES.DEFAULTS.POSTGRES.HOST,
      pgPort: DATABASES.DEFAULTS.POSTGRES.PORT,
    });

    // Add constructor call for database
    templateVars.constructorCalls += SERVER_CONSTRUCTOR_CALLS.DATABASE;
  }

  // Add passport import if authentication is enabled
  if (options.authentication) {
    templateVars.authImports = SERVER_IMPORTS.AUTH.PASSPORT;
  }

  // Add websocket imports if a websocket library was selected
  if (
    options.websocketLib &&
    options.websocketLib !== WEBSOCKETS.LIBRARIES.NONE
  ) {
    try {
      const websocketImportsPath = getTemplatePath(
        `${TEMPLATES.WEBSOCKETS.SOCKETIO.IMPORTS.replace(
          "socketio",
          options.websocketLib.toLowerCase()
        )}`
      );
      templateVars.websocketImports = fs.readFileSync(
        websocketImportsPath,
        "utf8"
      );
    } catch (error) {
      // Fallback to generated imports if template doesn't exist
      if (options.websocketLib === WEBSOCKETS.LIBRARIES.SOCKETIO) {
        templateVars.websocketImports = SERVER_IMPORTS.WEBSOCKET.SOCKETIO;
      } else if (options.websocketLib === WEBSOCKETS.LIBRARIES.WS) {
        templateVars.websocketImports = SERVER_IMPORTS.WEBSOCKET.WS;
      }
    }

    // Add websocket method if selected
    try {
      const methodPath = getTemplatePath(
        `${TEMPLATES.WEBSOCKETS.SOCKETIO.METHOD.replace(
          "socketio",
          options.websocketLib.toLowerCase()
        )}`
      );
      templateVars.websocketMethod = fs.readFileSync(methodPath, "utf8");
    } catch (error) {
      // Fallback to generated methods if template doesn't exist
      if (options.websocketLib === WEBSOCKETS.LIBRARIES.SOCKETIO) {
        templateVars.classProperties += SERVER_CLASS_PROPERTIES.SOCKETIO;
        templateVars.websocketMethod = SERVER_WEBSOCKET_METHODS.SOCKETIO;
        templateVars.socketRouterInit = SERVER_ROUTER_INIT.SOCKETIO;
      } else if (options.websocketLib === WEBSOCKETS.LIBRARIES.WS) {
        templateVars.classProperties += SERVER_CLASS_PROPERTIES.WS;
        templateVars.websocketMethod = SERVER_WEBSOCKET_METHODS.WS;
        templateVars.socketRouterInit = SERVER_ROUTER_INIT.WS;
      }
    }

    // Add constructor call for websockets
    templateVars.constructorCalls += SERVER_CONSTRUCTOR_CALLS.WEBSOCKET;
  }

  // Add view engine imports if a view engine was selected
  if (options.viewEngine && options.viewEngine !== VIEW_ENGINES.TYPES.NONE) {
    // Convert view engine name to a key for accessing templates
    let viewEngineKey: "PUG" | "EJS" | "HANDLEBARS";

    if (options.viewEngine === VIEW_ENGINES.TYPES.PUG) {
      viewEngineKey = "PUG";
    } else if (options.viewEngine === VIEW_ENGINES.TYPES.EJS) {
      viewEngineKey = "EJS";
    } else if (options.viewEngine === VIEW_ENGINES.TYPES.HANDLEBARS) {
      viewEngineKey = "HANDLEBARS";
    } else {
      // Default to PUG if not recognized
      viewEngineKey = "PUG";
    }

    try {
      const viewImportsPath = getTemplatePath(
        TEMPLATES.VIEWS[viewEngineKey].IMPORTS
      );
      templateVars.viewImports = fs.readFileSync(viewImportsPath, "utf8");
    } catch (error) {
      // Use default imports if template file not found
      templateVars.viewImports =
        "// View engine imports\nimport path from 'path';\n";
      if (options.viewEngine === VIEW_ENGINES.TYPES.EJS) {
        templateVars.viewImports +=
          "import expressLayouts from 'express-ejs-layouts';\n";
      } else if (options.viewEngine === VIEW_ENGINES.TYPES.HANDLEBARS) {
        templateVars.viewImports +=
          "import { engine as handlebars } from 'express-handlebars';\n";
      }
    }

    // Add view engine initialization
    try {
      const viewMiddlewarePath = getTemplatePath(
        TEMPLATES.VIEWS[viewEngineKey].MIDDLEWARE
      );
      templateVars.middlewareSetup += fs.readFileSync(
        viewMiddlewarePath,
        "utf8"
      );
    } catch (error) {
      // Fallback to generated middleware if template doesn't exist
      if (options.viewEngine === VIEW_ENGINES.TYPES.PUG) {
        templateVars.middlewareSetup += SERVER_VIEW_ENGINE_SETUP.PUG;
      } else if (options.viewEngine === VIEW_ENGINES.TYPES.EJS) {
        templateVars.middlewareSetup += SERVER_VIEW_ENGINE_SETUP.EJS;
      } else if (options.viewEngine === VIEW_ENGINES.TYPES.HANDLEBARS) {
        templateVars.middlewareSetup += SERVER_VIEW_ENGINE_SETUP.HANDLEBARS;
      }
    }

    // Set the root route handler for view engines
    templateVars.rootRouteHandler = SERVER_ROOT_ROUTE_HANDLER.VIEW_ENGINE;
  }

  // Generate server.ts content from template
  const serverTemplatePath = getTemplatePath(
    TEMPLATES.PROJECT_STRUCTURE.SERVER.MAIN
  );
  const serverContent = loadTemplate(serverTemplatePath, templateVars);

  // Write server.ts file
  const serverFilePath = path.join(destination, "src", "server.ts");
  fs.writeFileSync(serverFilePath, serverContent);

  // Generate server.d.ts with type declarations
  generateServerTypesFile(destination, options);
}

/**
 * Generate server.d.ts file with type declarations based on options
 * @param destination - Project destination directory
 * @param options - User selected options
 */
function generateServerTypesFile(
  destination: string,
  options: ServerGeneratorOptions
): void {
  // Create template vars for types file
  const templateVars = {
    imports: SERVER_TYPE_DECLARATIONS.BASE_IMPORTS,
    interfaceProperties: "",
  };

  // Add additional imports based on options
  if (options.database === DATABASES.TYPES.PRISMA) {
    templateVars.imports += "import { PrismaClient } from '@prisma/client';\n";
    templateVars.interfaceProperties +=
      SERVER_TYPE_DECLARATIONS.INTERFACE_PROPERTIES.PRISMA;
  }

  if (
    options.websocketLib === WEBSOCKETS.LIBRARIES.SOCKETIO ||
    options.websocketLib === WEBSOCKETS.LIBRARIES.SOCKETIO
  ) {
    templateVars.imports +=
      "import { Server as SocketIOServer } from 'socket.io';\n";
    templateVars.interfaceProperties +=
      SERVER_TYPE_DECLARATIONS.INTERFACE_PROPERTIES.SOCKETIO;
  } else if (
    options.websocketLib === WEBSOCKETS.LIBRARIES.WS ||
    options.websocketLib === WEBSOCKETS.LIBRARIES.WS
  ) {
    templateVars.imports += "import WebSocket from 'ws';\n";
    templateVars.interfaceProperties +=
      SERVER_TYPE_DECLARATIONS.INTERFACE_PROPERTIES.WS;
  }

  // Generate server.d.ts content
  let typesContent = templateVars.imports;

  // Add Express namespace augmentation for user in request if authentication is enabled
  if (options.authentication) {
    typesContent += SERVER_TYPE_DECLARATIONS.AUTH_NAMESPACE;
  }

  // Add Server interface
  typesContent += SERVER_TYPE_DECLARATIONS.BASE_INTERFACE;
  typesContent += templateVars.interfaceProperties;
  typesContent += SERVER_TYPE_DECLARATIONS.INTERFACE_CLOSING;

  // Write server.d.ts file
  const typesFilePath = path.join(destination, "src", "server.d.ts");
  fs.writeFileSync(typesFilePath, typesContent);
}

/**
 * Generate global.d.ts file with environment type declarations
 * @param destination - Project destination directory
 * @param options - User selected options
 */
function generateGlobalTypesFile(
  destination: string,
  options: ServerGeneratorOptions
): void {
  // Create a variables object to replace placeholders in the template
  const templateVars: {
    environmentVariables: string;
  } = {
    environmentVariables: "",
  };

  // Add database environment variables
  if (options.database === DATABASES.TYPES.SEQUELIZE) {
    templateVars.environmentVariables += `    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;\n`;
  } else if (options.database === DATABASES.TYPES.MONGOOSE) {
    templateVars.environmentVariables += "    MONGODB_URI: string;\n";
  } else if (options.database === DATABASES.TYPES.PRISMA) {
    templateVars.environmentVariables += "    DATABASE_URL: string;\n";
  } else if (options.database === DATABASES.TYPES.TYPEORM) {
    templateVars.environmentVariables += `    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;\n`;
  }

  // Add authentication environment variables
  if (options.authentication) {
    templateVars.environmentVariables += `    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;\n`;
  }

  // Create the content
  let typesContent = `// Global type declarations

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
${templateVars.environmentVariables}    CLIENT_URL: string;
    [key: string]: string | undefined;
  }
}\n`;

  // Write types.d.ts file
  const typesFilePath = path.join(destination, "src", "types.d.ts");
  fs.writeFileSync(typesFilePath, typesContent);
}

// Export the module functions
export default {
  generateServerFile,
  generateServerTypesFile,
  generateGlobalTypesFile,
};
