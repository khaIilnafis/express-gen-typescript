/**
 * Type definitions for project directories structure
 */
export interface ProjectDirectories {
  ROOT: {
    SRC: string;
    BIN: string;
    STRUCTURE: string;
  };
  SRC: {
    AUTH: string;
    CONTROLLERS: string;
    MODELS: string;
    ROUTES: string;
    SERVICES: string;
    SOCKETS: string;
    UTILS: string;
    TYPES: string;
    CONFIG: string;
    MIDDLEWARE: string;
    MIGRATIONS: string;
    PUBLIC: string;
    VIEWS: string;
    DATABASE: string;
  };
  PUBLIC: {
    CSS: string;
    JS: string;
    IMAGES: string;
  };
  CONTROLLERS: {
    example: string;
  };
  SOCKETS: {
    HANDLERS: string;
  };
  SERVICES: {
    EXAMPLE: string;
  };
  VIEWS: {
    EJS: string;
    PUG: string;
    HANDLEBARS: string;
    LAYOUTS: string;
    PARTIALS: string;
    PAGES: string;
  };
}
