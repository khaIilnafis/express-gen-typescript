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
	database?: string | null;
	databaseOrm?: string | null;
	databaseName?: string;
	dialect?: string;
	authentication?: string | boolean;
	authLib?: string | null;
	websocketLib?: string | null;
	viewEngine?: string | null;
	skipPrompt?: boolean; // Flag to skip interactive prompts
}
  