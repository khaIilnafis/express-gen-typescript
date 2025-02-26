/**
 * View engine paths constants
 * Contains file path patterns for view engine-related files
 */

/**
 * Type definition for view directory paths
 */
export interface ViewDirectoryPaths {
  ROOT: string;
  LAYOUTS: string;
  PARTIALS: string;
  INCLUDES: string;
}

/**
 * Type definition for view file paths by engine
 */
export interface ViewEngineFilePaths {
  PUG: {
    LAYOUT: string;
    INDEX: string;
    ERROR: string;
  };
  EJS: {
    LAYOUT: string;
    INDEX: string;
    ERROR: string;
  };
  HANDLEBARS: {
    LAYOUT: string;
    INDEX: string;
    ERROR: string;
  };
}

/**
 * Type definition for view engine paths
 */
export interface ViewEnginePaths {
  DIRECTORIES: ViewDirectoryPaths;
  FILES: ViewEngineFilePaths;
}

/**
 * View engine path constants
 * Defines file paths for view engine-related files
 */
export const PATHS = Object.freeze({
  DIRECTORIES: {
    ROOT: "views",
    LAYOUTS: "views/layouts",
    PARTIALS: "views/partials",
    INCLUDES: "views/includes",
  },
  FILES: {
    PUG: {
      LAYOUT: "views/layouts/layout.pug",
      INDEX: "views/index.pug",
      ERROR: "views/error.pug",
    },
    EJS: {
      LAYOUT: "views/layouts/layout.ejs",
      INDEX: "views/index.ejs",
      ERROR: "views/error.ejs",
    },
    HANDLEBARS: {
      LAYOUT: "views/layouts/main.handlebars",
      INDEX: "views/index.handlebars",
      ERROR: "views/error.handlebars",
    },
  },
} as const) satisfies ViewEnginePaths; 