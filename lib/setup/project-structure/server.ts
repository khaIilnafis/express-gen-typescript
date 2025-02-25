import fs from "fs";
import path from "path";
import {
  loadTemplate,
  writeTemplate,
  getTemplatePath,
  TemplateVariables,
} from "../../utils/template-loader.js";

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
    socketRouterInit: "const router = initializeRoutes();", // Default without socket
    rootRouteHandler: "res.json({ message: 'Welcome to the API' });",
  };

  // Add database imports if a database was selected
  if (options.database && options.database !== "none") {
    try {
      const databaseImportsPath = getTemplatePath(
        `project-structure/database/${options.database.toLowerCase()}-imports.ts`
      );
      templateVars.databaseImports = fs.readFileSync(
        databaseImportsPath,
        "utf8"
      );
    } catch (error) {
      // Fallback to generated imports if template doesn't exist
      if (options.database === "sequelize") {
        templateVars.databaseImports =
          "// Database imports\nimport sequelize from './config/database';\n";
      } else if (options.database === "mongoose") {
        templateVars.databaseImports =
          "// Database imports\nimport mongoose from 'mongoose';\n";
      } else if (options.database === "prisma") {
        templateVars.databaseImports =
          "// Database imports\nimport prisma from '@prisma/client';\n";
      } else if (options.database === "typeorm") {
        templateVars.databaseImports =
          "// Database imports\nimport AppDataSource from './config/database';\n";
      }
    }

    // Add database connection method
    try {
      const databaseMethodPath = getTemplatePath(
        `project-structure/database/${options.database.toLowerCase()}-method.ts`
      );
      let methodContent = fs.readFileSync(databaseMethodPath, "utf8");

      // Replace database name placeholder if it exists
      if (options.databaseName) {
        methodContent = methodContent.replace(
          /{{databaseName}}/g,
          options.databaseName
        );
      } else {
        // Default database name based on project name
        const defaultDbName = path
          .basename(destination)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "_");
        methodContent = methodContent.replace(
          /{{databaseName}}/g,
          defaultDbName
        );
      }

      templateVars.databaseMethod = methodContent;

      // Add class properties for Prisma
      if (options.database === "prisma") {
        templateVars.classProperties += "  public prisma: PrismaClient;\n";
      }
    } catch (error) {
      // Fallback to generated methods
      if (options.database === "sequelize") {
        templateVars.databaseMethod = `
  private async connectToDatabase(): Promise<void> {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully.');
    } catch (error) {
      console.error('Database connection error:', error);
      process.exit(1);
    }
  }`;
      } else if (options.database === "mongoose") {
        templateVars.databaseMethod = `
  private async connectToDatabase(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp');
      console.log('MongoDB connected successfully.');
    } catch (error) {
      console.error('Database connection error:', error);
      process.exit(1);
    }
  }`;
      } else if (options.database === "prisma") {
        templateVars.classProperties = "  public prisma: PrismaClient;\n";
        templateVars.databaseMethod = `
  private async connectToDatabase(): Promise<void> {
    try {
      this.prisma = new PrismaClient();
      console.log('Prisma Client initialized successfully.');
    } catch (error) {
      console.error('Database connection error:', error);
      process.exit(1);
    }
  }`;
      } else if (options.database === "typeorm") {
        templateVars.databaseMethod = `
  private async connectToDatabase(): Promise<void> {
    try {
      await createConnection();
      console.log('TypeORM connected successfully.');
    } catch (error) {
      console.error('Database connection error:', error);
      process.exit(1);
    }
  }`;
      }
    }

    // Add constructor call for database
    templateVars.constructorCalls += "    this.connectToDatabase();\n";
  }

  // Add passport import if authentication is enabled
  if (options.authentication) {
    templateVars.authImports =
      "// Authentication imports\nimport passport from './auth/passport.js';\n";
  }

  // Add websocket imports and setup if selected
  if (options.websocketLib && options.websocketLib !== "none") {
    if (
      options.websocketLib === "socketio" ||
      options.websocketLib === "Socket.io"
    ) {
      templateVars.websocketImports =
        "// Websocket imports\nimport { Server as SocketIOServer } from 'socket.io';\nimport { setupSocketHandlers } from './sockets';\n";
      templateVars.classProperties += "  public io!: SocketIOServer;\n";
      templateVars.websocketMethod = `
  private initializeWebSockets(): void {
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST']
      }
    });
    
    // Setup Socket.io event handlers
    setupSocketHandlers(this.io);
  }`;
      // Pass socket to router
      templateVars.socketRouterInit =
        "const router = initializeRoutes(this.io);";
    } else if (options.websocketLib === "ws" || options.websocketLib === "WS") {
      templateVars.websocketImports =
        "// Websocket imports\nimport WebSocket from 'ws';\nimport { setupWebSocketHandlers } from './sockets';\n";
      templateVars.classProperties += "  public wss: WebSocket.Server;\n";
      templateVars.websocketMethod = `
  private initializeWebSockets(): void {
    this.wss = new WebSocket.Server({ server: this.server });
    
    // Setup WebSocket event handlers
    setupWebSocketHandlers(this.wss);
  }`;
      // Pass socket to router
      templateVars.socketRouterInit =
        "const router = initializeRoutes(this.wss);";
    }

    // Add constructor call for websockets
    templateVars.constructorCalls += "    this.initializeWebSockets();\n";
  }

  // Add view engine setup if selected
  if (options.viewEngine && options.viewEngine !== "none") {
    let viewEngineName: string;
    switch (options.viewEngine) {
      case "Pug (Jade)":
        viewEngineName = "pug";
        break;
      case "EJS":
        viewEngineName = "ejs";
        break;
      case "Handlebars":
        viewEngineName = "handlebars";
        break;
      default:
        viewEngineName = options.viewEngine.toLowerCase();
    }

    templateVars.middlewareSetup += `
    // View engine setup
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', '${viewEngineName}');\n`;

    // Change root route handler to render a view
    templateVars.rootRouteHandler = `res.render('index', { title: 'Express TypeScript Application' });`;
  }

  // Write server.ts file using the template
  const serverFilePath = path.join(destination, "src", "server.ts");
  writeTemplate(
    getTemplatePath("project-structure/server.ts"),
    serverFilePath,
    templateVars
  );

  // Generate server.d.ts file with type declarations
  generateServerTypesFile(destination, options);
}

/**
 * Generate server.d.ts file with type declarations
 * @param destination - Project destination directory
 * @param options - User selected options
 */
function generateServerTypesFile(
  destination: string,
  options: ServerGeneratorOptions
): void {
  // Create a variables object to replace placeholders in the template
  const templateVars: {
    imports: string;
    interfaceProperties: string;
  } = {
    imports:
      "import { Application } from 'express';\nimport http from 'http';\n",
    interfaceProperties: "",
  };

  // Add additional imports based on options
  if (options.database === "prisma") {
    templateVars.imports += "import { PrismaClient } from '@prisma/client';\n";
    templateVars.interfaceProperties += "  prisma: PrismaClient;\n";
  }

  if (
    options.websocketLib === "socketio" ||
    options.websocketLib === "Socket.io"
  ) {
    templateVars.imports +=
      "import { Server as SocketIOServer } from 'socket.io';\n";
    templateVars.interfaceProperties += "  io: SocketIOServer;\n";
  } else if (options.websocketLib === "ws" || options.websocketLib === "WS") {
    templateVars.imports += "import WebSocket from 'ws';\n";
    templateVars.interfaceProperties += "  wss: WebSocket.Server;\n";
  }

  // Generate server.d.ts content
  let typesContent = templateVars.imports;

  // Add Express namespace augmentation for user in request if authentication is enabled
  if (options.authentication) {
    typesContent += `\ndeclare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      firstName?: string;
      lastName?: string;
      [key: string]: any;
    }
    
    interface Request {
      user?: User;
    }
  }
}\n\n`;
  }

  // Add Server interface
  typesContent += `interface Server {
  app: Application;
  server: http.Server;
${templateVars.interfaceProperties}}\n\n`;

  typesContent += "export default Server;\n";

  // Write server.d.ts file
  const typesFilePath = path.join(destination, "src", "server.d.ts");
  fs.writeFileSync(typesFilePath, typesContent);
}

/**
 * Generate a types.d.ts file with global type declarations
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
  if (options.database === "sequelize") {
    templateVars.environmentVariables += `    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;\n`;
  } else if (options.database === "mongoose") {
    templateVars.environmentVariables += "    MONGODB_URI: string;\n";
  } else if (options.database === "prisma") {
    templateVars.environmentVariables += "    DATABASE_URL: string;\n";
  } else if (options.database === "typeorm") {
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
