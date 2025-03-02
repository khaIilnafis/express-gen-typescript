/**
 * Server import statement constants
 * Contains import statements for different server features
 */

import { ServerImports } from "../../types/server/index.js";

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
    INITIALIZE: "initializeDatabase",
  },

  // Authentication imports
  AUTH: {
    PASSPORT:
      "// Authentication imports\nimport passport from './auth/passport';\n",
  },

  // WebSocket imports (fallbacks when templates don't exist)
  WEBSOCKET: {
    SOCKETIO:
      "// WebSocket imports\nimport { Server as SocketIOServer } from 'socket.io';\nimport {setupSocketHandlers} from './sockets';\n",
    WS: "// WebSocket imports\nimport WebSocket from 'ws';\nimport setupWebSocketServer from './sockets';\n",
    SOCKETIO_TYPES: "import { Server as SocketIOServer } from 'socket.io';\n",
    WS_TYPES: "import WebSocket from 'ws';\n",
  },

  // View engine imports
  VIEW_ENGINE: {
    EJS: "// View engine imports\n",
    PUG: "// View engine imports\n",
    HANDLEBARS:
      "// View engine import\nimport exphbs from 'express-handlebars';\n",
  },
} as const) satisfies ServerImports;
