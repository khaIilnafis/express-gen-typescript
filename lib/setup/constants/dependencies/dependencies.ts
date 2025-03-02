/**
 * Dependencies configuration for the Express TypeScript generator
 * This file contains all dependency-related constants used in the generator
 */

import {
  Dependencies,
  FeatureDependencies,
} from "../../types/dependencies/index.js";

/**
 * Project dependency constants
 */

// Base dependencies for all Express TypeScript projects
export const BASE_DEPENDENCIES: Dependencies = Object.freeze({
  express: "^4.21.2",
  helmet: "^8.0.0",
  morgan: "^1.10.0",
  cors: "^2.8.5",
  compression: "^1.8.0",
  dotenv: "^16.4.7",
} as const) satisfies Dependencies;

// Base dev dependencies for all Express TypeScript projects
export const BASE_DEV_DEPENDENCIES: Dependencies = Object.freeze({
  "@types/express": "^5.0.0",
  "@types/cors": "^2.8.17",
  "@types/morgan": "^1.9.9",
  "@types/compression": "^1.7.5",
  "@types/helmet": "^4.0.0",
  "@types/node": "^22.13.5",
  "ts-node": "^10.9.2",
  rimraf: "^6.0.1",
  debug: "^4.4.0",
  nodemon: "^3.1.9",
  "tsc-watch": "6.2.1",
  copyfiles: "^2.4.1",
} as const) satisfies Dependencies;

// Feature-specific dependencies with proper typing
export const FEATURE_DEPENDENCIES: FeatureDependencies = Object.freeze({
  database: Object.freeze({
    sequelize: Object.freeze({
      deps: Object.freeze({
        sequelize: "^6.33.0",
        pg: "^8.11.5",
      }),
      devDeps: Object.freeze({
        "@types/sequelize": "^4.28.15",
      }),
    }),
    typeorm: Object.freeze({
      deps: Object.freeze({
        typeorm: "^0.3.17",
        pg: "^8.11.5",
        "reflect-metadata": "^0.1.13",
      }),
      devDeps: Object.freeze({}),
    }),
    prisma: Object.freeze({
      deps: Object.freeze({
        "@prisma/client": "^5.3.1",
      }),
      devDeps: Object.freeze({
        prisma: "^5.3.1",
      }),
    }),
    mongoose: Object.freeze({
      deps: Object.freeze({
        mongoose: "^7.5.2",
      }),
      devDeps: Object.freeze({
        "@types/mongoose": "^5.11.97",
      }),
    }),
  }),
  auth: Object.freeze({
    passport: Object.freeze({
      deps: Object.freeze({
        passport: "^0.6.0",
        "passport-local": "^1.0.0",
        "passport-jwt": "^4.0.1",
        jsonwebtoken: "^9.0.2",
        bcrypt: "^5.1.1",
      }),
      devDeps: Object.freeze({
        "@types/passport": "^1.0.12",
        "@types/passport-local": "^1.0.35",
        "@types/passport-jwt": "^3.0.9",
        "@types/jsonwebtoken": "^9.0.2",
        "@types/bcrypt": "^5.0.0",
      }),
    }),
    jwt: Object.freeze({
      deps: Object.freeze({
        jsonwebtoken: "^9.0.2",
        bcrypt: "^5.1.1",
      }),
      devDeps: Object.freeze({
        "@types/jsonwebtoken": "^9.0.2",
        "@types/bcrypt": "^5.0.0",
      }),
    }),
    "express-session": Object.freeze({
      deps: Object.freeze({
        "express-session": "^1.17.3",
        "connect-flash": "^0.1.1",
      }),
      devDeps: Object.freeze({
        "@types/express-session": "^1.17.7",
        "@types/connect-flash": "^0.0.37",
      }),
    }),
  }),
  websockets: Object.freeze({
    socketio: Object.freeze({
      deps: Object.freeze({
        "socket.io": "^4.7.2",
      }),
      devDeps: Object.freeze({
        "@types/socket.io": "^3.0.2",
      }),
    }),
    ws: Object.freeze({
      deps: Object.freeze({
        ws: "^8.14.1",
      }),
      devDeps: Object.freeze({
        "@types/ws": "^8.5.5",
      }),
    }),
  }),
  views: Object.freeze({
    pug: Object.freeze({
      deps: Object.freeze({
        pug: "^3.0.2",
      }),
      devDeps: Object.freeze({
        "@types/pug": "^2.0.7",
      }),
    }),
    ejs: Object.freeze({
      deps: Object.freeze({
        ejs: "^3.1.9",
      }),
      devDeps: Object.freeze({
        "@types/ejs": "^3.1.2",
      }),
    }),
    handlebars: Object.freeze({
      deps: Object.freeze({
        "express-handlebars": "^7.1.2",
      }),
      devDeps: Object.freeze({
        "@types/express-handlebars": "^6.0.0",
      }),
    }),
  }),
} as const) satisfies FeatureDependencies;
