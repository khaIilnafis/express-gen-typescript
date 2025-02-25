/**
 * Dependencies configuration for the Express TypeScript generator
 * This file contains all dependency-related constants used in the generator
 */

// Base project dependencies
export const BASE_DEPENDENCIES: Record<string, string> = {
  express: "^4.18.2",
  helmet: "^7.0.0",
  cors: "^2.8.5",
  morgan: "^1.10.0",
  compression: "^1.7.4",
  dotenv: "^16.3.1",
};

// Base project dev dependencies
export const BASE_DEV_DEPENDENCIES: Record<string, string> = {
  typescript: "^5.4.6",
  "@types/express": "^4.17.17",
  "@types/node": "^20.6.0",
  "@types/cors": "^2.8.14",
  "@types/morgan": "^1.9.5",
  "@types/compression": "^1.7.3",
  rimraf: "^5.0.1",
  debug: "~2.6.9",
  nodemon: "^3.0.1",
  "tsc-watch": "^6.2.0",
};

// Type definitions for feature dependencies
type FeatureDependency = {
  deps: Record<string, string>;
  devDeps: Record<string, string>;
};

type DatabaseOptions = {
  sequelize: FeatureDependency;
  typeorm: FeatureDependency;
  prisma: FeatureDependency;
  mongoose: FeatureDependency;
};

type AuthOptions = {
  passport: FeatureDependency;
  jwt: FeatureDependency;
  "express-session": FeatureDependency;
};

type WebsocketOptions = {
  socketio: FeatureDependency;
  ws: FeatureDependency;
};

type ViewEngineOptions = {
  pug: FeatureDependency;
  ejs: FeatureDependency;
  handlebars: FeatureDependency;
};

// Feature-specific dependencies with proper typing
export const FEATURE_DEPENDENCIES: {
  database: DatabaseOptions;
  auth: AuthOptions;
  websockets: WebsocketOptions;
  views: ViewEngineOptions;
} = {
  database: {
    sequelize: {
      deps: {
        sequelize: "^6.33.0",
        pg: "^8.11.5",
      },
      devDeps: {
        "@types/sequelize": "^4.28.15",
      },
    },
    typeorm: {
      deps: {
        typeorm: "^0.3.17",
        pg: "^8.11.5",
        "reflect-metadata": "^0.1.13",
      },
      devDeps: {},
    },
    prisma: {
      deps: {
        "@prisma/client": "^5.3.1",
      },
      devDeps: {
        prisma: "^5.3.1",
      },
    },
    mongoose: {
      deps: {
        mongoose: "^7.5.2",
      },
      devDeps: {
        "@types/mongoose": "^5.11.97",
      },
    },
  },
  auth: {
    passport: {
      deps: {
        passport: "^0.6.0",
        "passport-local": "^1.0.0",
        "passport-jwt": "^4.0.1",
        jsonwebtoken: "^9.0.2",
        bcrypt: "^5.1.1",
      },
      devDeps: {
        "@types/passport": "^1.0.12",
        "@types/passport-local": "^1.0.35",
        "@types/passport-jwt": "^3.0.9",
        "@types/jsonwebtoken": "^9.0.2",
        "@types/bcrypt": "^5.0.0",
      },
    },
    jwt: {
      deps: {
        jsonwebtoken: "^9.0.2",
        bcrypt: "^5.1.1",
      },
      devDeps: {
        "@types/jsonwebtoken": "^9.0.2",
        "@types/bcrypt": "^5.0.0",
      },
    },
    "express-session": {
      deps: {
        "express-session": "^1.17.3",
        "connect-flash": "^0.1.1",
      },
      devDeps: {
        "@types/express-session": "^1.17.7",
        "@types/connect-flash": "^0.0.37",
      },
    },
  },
  websockets: {
    socketio: {
      deps: {
        "socket.io": "^4.7.2",
      },
      devDeps: {
        "@types/socket.io": "^3.0.2",
      },
    },
    ws: {
      deps: {
        ws: "^8.14.1",
      },
      devDeps: {
        "@types/ws": "^8.5.5",
      },
    },
  },
  views: {
    pug: {
      deps: {
        pug: "^3.0.2",
      },
      devDeps: {
        "@types/pug": "^2.0.7",
      },
    },
    ejs: {
      deps: {
        ejs: "^3.1.9",
        "express-ejs-layouts": "^2.5.1",
      },
      devDeps: {
        "@types/ejs": "^3.1.2",
      },
    },
    handlebars: {
      deps: {
        "express-handlebars": "^7.1.2",
      },
      devDeps: {
        "@types/express-handlebars": "^6.0.0",
      },
    },
  },
};
