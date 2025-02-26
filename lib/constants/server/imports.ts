/**
 * Server import statement constants
 * Contains import statements for different server features
 */

/**
 * Type definition for server imports
 */
export interface ServerImports {
  BASE: {
    EXPRESS: string;
  };
  DATABASE: {
    SEQUELIZE: string;
    MONGOOSE: string;
    PRISMA: string;
    TYPEORM: string;
  };
  AUTH: {
    PASSPORT: string;
  };
  WEBSOCKET: {
    SOCKETIO: string;
    WS: string;
  };
  VIEW_ENGINE: {
    EJS: string;
    PUG: string;
    HANDLEBARS: string;
  };
}

/**
 * Server import statements for different features
 */
export const IMPORTS = Object.freeze({
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
      "// WebSocket imports\nimport { Server as SocketIOServer } from 'socket.io';\nimport {setupSocketHandlers} from './sockets';\n",
    WS: "// WebSocket imports\nimport WebSocket from 'ws';\nimport setupWebSocketServer from './sockets';\n",
  },

  // View engine imports
  VIEW_ENGINE: {
    EJS: "// View engine imports\nimport expressLayouts from 'express-ejs-layouts';\n",
    PUG: "// View engine imports\n",
    HANDLEBARS:
      "// View engine import\nimport exphbs from 'express-handlebars';\n",
  },
} as const) satisfies ServerImports; 