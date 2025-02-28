/**
 * Options for database setup
 */
export interface DatabaseSetupOptions {
	/**
	 * Destination directory for project
	 */
	destination: string;
  
	/**
	 * Database type to set up
	 */
	database: string;
  
	/**
	 * Database name to use
	 */
	databaseName?: string;
  
	/**
	 * Additional options for database setup
	 */
	[key: string]: any;
  }

/**
 * User configuration options for the project generator
 */
export interface GeneratorOptions {
	projectName: string;
	destination: string;
	database: boolean;
	databaseOrm?: string | null;
	databaseName?: string;
	dialect?: string;
	authentication: boolean;
	authLib?: string | null;
	webSockets: boolean;
	websocketLib?: string | null;
	view: boolean;
	viewEngine?: string | null;
	skipPrompt?: boolean; // Flag to skip interactive prompts
}
  
/**
 * Template variables interface
 */
export interface TemplateVariables {
	[key: string]: string | number | boolean;
  }
  
  export type TemplateOptions = TemplateVariables | GeneratorOptions;