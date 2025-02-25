/**
 * Template path constants
 */
export const TEMPLATES = Object.freeze({
  // Base paths
  BASE: {
    ROUTES: "routes",
    CONTROLLERS: "controllers",
    VIEWS: "views",
    PROJECT_STRUCTURE: "project-structure",
    WEBSOCKETS: "websockets",
    DATABASE: "database",
  },

  // Route templates
  ROUTES: {
    INDEX: "routes/index.ts",
    EXAMPLE: "routes/example.routes.ts",
  },

  // Controller templates
  CONTROLLERS: {
    EXAMPLE: {
      INDEX: "controllers/example/index.ts",
      CONTROLLER: "controllers/example/exampleController.ts",
    },
  },

  // Project structure templates
  PROJECT_STRUCTURE: {
    BIN: {
      WWW: "project-structure/bin/www.ts",
    },
    README: "project-structure/README.md",
    SERVER: {
      MAIN: "project-structure/server.ts",
      TYPES: "project-structure/server.d.ts",
    },
  },

  // Database templates
  DATABASE: {
    SEQUELIZE: {
      CONFIG: "database/sequelize/database.ts",
      MODEL_INDEX: "models/sequelize/index.ts",
      EXAMPLE_MODEL: "models/sequelize/Example.ts",
    },
    TYPEORM: {
      CONFIG: "database/typeorm/database.ts",
      EXAMPLE_MODEL: "models/typeorm/Example.entity.ts",
    },
    PRISMA: {
      EXAMPLE_MODEL: "models/prisma/schema.prisma",
      CONFIG: "database/prisma/database.ts",
    },
    MONGOOSE: {
      CONFIG: "database/mongoose/database.ts",
      EXAMPLE_MODEL: "models/mongoose/Example.ts",
    },
  },

  // View engine templates by type
  VIEWS: {
    PUG: {
      LAYOUTS: {
        MAIN: "views/pug/layouts/main.pug",
      },
      PARTIALS: {
        HEADER: "views/pug/partials/header.pug",
        FOOTER: "views/pug/partials/footer.pug",
      },
      INDEX: "views/pug/index.pug",
      IMPORTS: "project-structure/views/pug-imports.ts",
      MIDDLEWARE: "project-structure/views/pug-middleware.ts",
    },
    EJS: {
      LAYOUTS: {
        MAIN: "views/ejs/layouts/main.ejs",
      },
      PARTIALS: {
        HEADER: "views/ejs/partials/header.ejs",
        FOOTER: "views/ejs/partials/footer.ejs",
      },
      INDEX: "views/ejs/index.ejs",
      IMPORTS: "project-structure/views/ejs-imports.ts",
      MIDDLEWARE: "project-structure/views/ejs-middleware.ts",
    },
    HANDLEBARS: {
      LAYOUTS: {
        MAIN: "views/handlebars/layouts/main.handlebars",
      },
      PARTIALS: {
        HEADER: "views/handlebars/partials/header.handlebars",
        FOOTER: "views/handlebars/partials/footer.handlebars",
      },
      INDEX: "views/handlebars/index.handlebars",
      IMPORTS: "project-structure/views/handlebars-imports.ts",
      MIDDLEWARE: "project-structure/views/handlebars-middleware.ts",
    },
  },

  // WebSocket templates
  WEBSOCKETS: {
    SOCKETIO: {
      INDEX: "websockets/socketio/index.ts",
      IMPORTS: "project-structure/websockets/socketio-imports.ts",
      METHOD: "project-structure/websockets/socketio-method.ts",
    },
    WS: {
      INDEX: "websockets/ws/index.ts",
      IMPORTS: "project-structure/websockets/ws-imports.ts",
      METHOD: "project-structure/websockets/ws-method.ts",
    },
  },
});
