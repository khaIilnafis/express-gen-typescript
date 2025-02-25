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
      CONFIG: "database/sequelize/config.json",
      MODEL_INDEX: "database/sequelize/model-index.ts",
      USER_MODEL: "database/sequelize/user-model.ts",
      EXAMPLE_MODEL: "database/sequelize/example-model.ts",
      DATABASE: "database/sequelize/database.ts",
      INIT: "database/sequelize/init.ts",
      EXAMPLE: "database/sequelize/example.ts",
      CONNECTION_CODE: "database/sequelize/connection-method.ts",
    },
    TYPEORM: {
      CONFIG: "database/typeorm/config.ts",
      USER_ENTITY: "database/typeorm/user-entity.ts",
      EXAMPLE_ENTITY: "database/typeorm/example-entity.ts",
      DATA_SOURCE: "database/typeorm/data-source.ts",
      INIT: "database/typeorm/init.ts",
      EXAMPLE: "database/typeorm/example.ts",
      CONNECTION_CODE: "database/typeorm/connection-method.ts",
    },
    PRISMA: {
      SCHEMA: "database/prisma/schema.prisma",
      CLIENT: "database/prisma/client.ts",
      INIT: "database/prisma/init.ts",
      CONNECTION_CODE: "database/prisma/connection-method.ts",
    },
    MONGOOSE: {
      CONFIG: "database/mongoose/config.ts",
      USER_MODEL: "database/mongoose/user-model.ts",
      EXAMPLE_MODEL: "database/mongoose/example-model.ts",
      CONNECTION: "database/mongoose/connection.ts",
      INIT: "database/mongoose/init.ts",
      EXAMPLE: "database/mongoose/example.ts",
      CONNECTION_CODE: "database/mongoose/connection-method.ts",
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
