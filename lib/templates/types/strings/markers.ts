/**
 * Type definition for markers
 */
export interface Markers {
  DATABASE_IMPORT: string;
  DATABASE_INIT: string;
  SERVER_INIT: string;
  VIEW_ENGINE_CONFIG_MARKER: string;
  AUTH_IMPORT: string;
  WEBSOCKET_IMPORT: string;
  SERVER: {
    IMPORTS: string;
    DATABASE_CONNECTION: string;
    ROUTES: string;
    MIDDLEWARE: string;
  };
  ENV: {
    DATABASE: string;
    AUTH: string;
    APP: string;
  };
}
