/**
 * Project directory structure constants
 * Defines the directory structure for the generated project
 */

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
	},
	SOCKETS: {
		HANDLERS: string;
	},
	SERVICES: {
		EXAMPLE: string;
	},
	VIEWS: {
	  EJS: string;
	  PUG: string;
	  HANDLEBARS: string;
	  LAYOUTS: string;
	  PARTIALS: string;
	  PAGES: string;
	};
  }
  
  /**
   * Project directory structure constants
   * Defines all directories used in the project structure
   */
  export const DIRECTORIES: ProjectDirectories = Object.freeze({
	// Core directories (top level)
	ROOT: {
	  SRC: "src",
	  BIN: "bin",
	  STRUCTURE: "project-structure",
	},
	// Source subdirectories
	SRC: {
	  AUTH: "auth",
	  CONTROLLERS: "controllers",
	  MODELS: "models",
	  ROUTES: "routes",
	  SERVICES: "services",
	  SOCKETS: "sockets",
	  UTILS: "utils",
	  TYPES: "types",
	  CONFIG: "config",
	  MIDDLEWARE: "middleware",
	  MIGRATIONS: "migrations",
	  PUBLIC: "public",
	  VIEWS: "views",
	  DATABASE: "database",
	},
	// Public subdirectories
	PUBLIC: {
	  CSS: "css",
	  JS: "js",
	  IMAGES: "images",
	},
	// Sockets subdirectories
	CONTROLLERS: {
		example: "example" 
	},
	// Sockets subdirectories
	SOCKETS: {
		HANDLERS: "handlers" 
	},
	// Services subdirectories
	SERVICES: {
		EXAMPLE: "example" 
	},
	// Views subdirectories
	VIEWS: {
	  EJS: "ejs",
	  PUG: "pug",
	  HANDLEBARS: "handlebars",
	  LAYOUTS: "layouts",
	  PARTIALS: "partials",
	  PAGES: "pages"
	},
  } as const) satisfies ProjectDirectories;