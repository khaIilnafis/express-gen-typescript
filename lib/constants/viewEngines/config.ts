/**
 * View engine configuration constants
 * Contains configuration settings for different template engines
 */

/**
 * Type definition for Handlebars configuration
 */
export interface HandlebarsConfig {
  DEFAULT_LAYOUT: string;
  LAYOUTS_DIR: string;
  PARTIALS_DIR: string;
  HELPERS_DIR: string;
  EXTNAME: string;
}

/**
 * Type definition for EJS configuration
 */
export interface EJSConfig {
  LAYOUTS: boolean;
  LAYOUT_DIR: string;
  PARTIAL_DIR: string;
  DELIMITER: string;
}

/**
 * Type definition for Pug configuration
 */
export interface PugConfig {
  PRETTY: boolean;
  CACHE: boolean;
  BASEDIR: string;
}

/**
 * Type definition for view engine configuration
 */
export interface ViewEngineConfig {
  HANDLEBARS: HandlebarsConfig;
  EJS: EJSConfig;
  PUG: PugConfig;
}

/**
 * View engine configuration constants
 * Defines configuration settings for different template engines
 */
export const CONFIG = Object.freeze({
  HANDLEBARS: {
    DEFAULT_LAYOUT: "main",
    LAYOUTS_DIR: "views/layouts",
    PARTIALS_DIR: "views/partials",
    HELPERS_DIR: "views/helpers",
    EXTNAME: ".handlebars",
  },
  EJS: {
    LAYOUTS: true,
    LAYOUT_DIR: "views/layouts",
    PARTIAL_DIR: "views/partials",
    DELIMITER: "%",
  },
  PUG: {
    PRETTY: true,
    CACHE: false,
    BASEDIR: "views",
  },
} as const) satisfies ViewEngineConfig; 