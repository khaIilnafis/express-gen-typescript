/**
 * Constants related to server generation
 */

/**
 * Server import statements for different features
 */
export const SERVER_IMPORTS = Object.freeze({
  // Base imports that are always included
  BASE: {
    EXPRESS:
      "import { Application } from 'express';\nimport http from 'http';\n",
  },

  // Database-specific imports
  DATABASE: {
    SEQUELIZE:
      "// Database imports\nimport { sequelize } from './models/index.js';\n",
    MONGOOSE: "// Database imports\nimport mongoose from 'mongoose';\n",
    PRISMA:
      "// Database imports\nimport { PrismaClient } from '@prisma/client';\n",
    TYPEORM:
      "// Database imports\nimport { createConnection } from 'typeorm';\n",
  },

  // Authentication imports
  AUTH: {
    PASSPORT:
      "// Authentication imports\nimport passport from './auth/passport.js';\n",
  },

  // WebSocket imports (fallbacks when templates don't exist)
  WEBSOCKET: {
    SOCKETIO:
      "// WebSocket imports\nimport { Server as SocketIOServer } from 'socket.io';\nimport setupSocketIO from './sockets';\n",
    WS: "// WebSocket imports\nimport WebSocket from 'ws';\nimport setupWebSocketServer from './sockets';\n",
  },

  // View engine imports
  VIEW_ENGINE: {
    EJS: "// View engine imports\nimport path from 'path';\nimport expressLayouts from 'express-ejs-layouts';\n",
    PUG: "// View engine imports\nimport path from 'path';\n",
    HANDLEBARS:
      "// View engine imports\nimport path from 'path';\nimport exphbs from 'express-handlebars';\n",
  },
});

/**
 * Server class properties for different features
 */
export const SERVER_CLASS_PROPERTIES = Object.freeze({
  PRISMA: "public prisma: PrismaClient;\n",
  SOCKETIO: "public io!: SocketIOServer;\n",
  WS: "public wss!: WebSocket.Server;\n",
});

/**
 * Server constructor calls for different features
 */
export const SERVER_CONSTRUCTOR_CALLS = Object.freeze({
  DATABASE: " this.connectToDatabase();\n",
  WEBSOCKET: "    this.initializeWebSockets();\n",
});

/**
 * Authentication middleware setup
 */
export const SERVER_AUTH_MIDDLEWARE = Object.freeze({
  PASSPORT:
    "\n    // Initialize Passport.js authentication\n    this.app.use(passport.initialize());",
});

/**
 * Database method placeholder
 */
export const SERVER_DATABASE_PLACEHOLDER =
  "// This will be replaced by actual database connection method";

/**
 * WebSocket method implementations (fallbacks when templates don't exist)
 */
export const SERVER_WEBSOCKET_METHODS = Object.freeze({
  SOCKETIO: `
  private initializeWebSockets(): void {
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST']
      }
    });
    
    // Setup Socket.io event handlers
    setupSocketIO(this.io);
  }`,
  WS: `
  private initializeWebSockets(): void {
    this.wss = new WebSocket.Server({ server: this.server });
    
    // Setup WebSocket event handlers
    setupWebSocketServer(this.wss);
  }`,
});

/**
 * Router initialization code for different WebSocket libraries
 */
export const SERVER_ROUTER_INIT = Object.freeze({
  DEFAULT: "const router = initializeRoutes();",
  SOCKETIO: "const router = initializeRoutes(this.io);",
  WS: "const router = initializeRoutes(this.wss);",
});

/**
 * View engine middleware setup (fallbacks when templates don't exist)
 */
export const SERVER_VIEW_ENGINE_SETUP = Object.freeze({
  PUG: `
    // Set up view engine
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'pug');`,
  EJS: `
    // Set up view engine
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');
    this.app.use(expressLayouts);`,
  HANDLEBARS: `
    // Set up view engine
    this.app.engine('handlebars', handlebars({
      layoutsDir: path.join(__dirname, 'views/layouts'),
      defaultLayout: 'main',
      extname: '.handlebars'
    }));
    this.app.set('view engine', 'handlebars');
    this.app.set('views', path.join(__dirname, 'views'));`,
});

/**
 * Root route handler for different view engines
 */
export const SERVER_ROOT_ROUTE_HANDLER = Object.freeze({
  DEFAULT: "res.json({ message: 'Welcome to the API' });",
  VIEW_ENGINE: "res.render('index', { title: 'Express TypeScript' });",
});

/**
 * Server type declaration templates
 */
export const SERVER_TYPE_DECLARATIONS = Object.freeze({
  // Base imports for server.d.ts
  BASE_IMPORTS:
    "import { Application } from 'express';\nimport http from 'http';\n",

  // Database-specific properties for Server interface
  INTERFACE_PROPERTIES: {
    PRISMA: "  prisma: PrismaClient;\n",
    SOCKETIO: "  io: SocketIOServer;\n",
    WS: "  wss: WebSocket.Server;\n",
  },

  // Express namespace augmentation for auth
  AUTH_NAMESPACE: `declare global {
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
}\n\n`,

  // Base Server interface
  BASE_INTERFACE: `interface Server {
  app: Application;
  server: http.Server;
`,

  // Interface closing and export
  INTERFACE_CLOSING: "}\n\nexport default Server;\n",

  // Environment variable declarations for global.d.ts
  ENVIRONMENT_VARIABLES: {
    // Base environment variables
    BASE: `    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    CLIENT_URL: string;
    [key: string]: string | undefined;`,

    // Database-specific environment variables
    DATABASE: {
      SEQUELIZE: `    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;`,
      MONGOOSE: `    MONGODB_URI: string;`,
      PRISMA: `    DATABASE_URL: string;`,
      TYPEORM: `    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;`,
    },

    // Authentication environment variables
    AUTH: `    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;`,
  },

  // Global type declarations template
  GLOBAL_DECLARATIONS: `// Global type declarations

declare namespace NodeJS {
  interface ProcessEnv {
{{environmentVariables}}
  }
}`,
});
