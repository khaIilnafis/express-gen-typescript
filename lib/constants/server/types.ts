/**
 * Server type declaration constants
 * Contains TypeScript type declarations for different server features
 */

/**
 * Type definition for server type declarations
 */
export interface ServerTypeDeclarations {
  BASE_IMPORTS: string;
  INTERFACE_PROPERTIES: {
    PRISMA: string;
    SOCKETIO: string;
    WS: string;
  };
  AUTH_NAMESPACE: string;
  BASE_INTERFACE: string;
  INTERFACE_CLOSING: string;
  ENVIRONMENT_VARIABLES: {
    BASE: string;
    DATABASE: {
      SEQUELIZE: string;
      MONGOOSE: string;
      PRISMA: string;
      TYPEORM: string;
    };
    AUTH: string;
  };
  GLOBAL_DECLARATIONS: string;
}

/**
 * Server type declaration templates
 */
export const TYPE_DECLARATIONS = Object.freeze({
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
} as const) satisfies ServerTypeDeclarations; 