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
    SOCKETIO_TYPES: string;
    WS_TYPES: string;
  };
  VIEW_ENGINE: {
    EJS: string;
    PUG: string;
    HANDLEBARS: string;
  };
}
