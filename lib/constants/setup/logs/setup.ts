/**
 * Type definition for setup logs
 */
export interface SetupLogs {
	PROJECT_STRUCTURE: string;
	DATABASE: (db: string) => string;
	WEBSOCKETS: (lib: string) => string;
	VIEW_ENGINE: (engine: string) => string;
	ENV_FILE: string;
	SUCCESS: SuccessLogs;
	ERROR: ErrorLogs;
  }
  /**
   * Type definition for success logs
   */
  export interface SuccessLogs {
	  README: string;
	  PROJECT: string;
	}
	
	/**
	 * Type definition for error logs
	 */
	export interface ErrorLogs {
	  GENERAL: string;
	}

/**
 * Application log constants
 */
export const SETUP_LOGS = Object.freeze({
	PROJECT_STRUCTURE: "Setting up project structure...",
	DATABASE: (db: string) => `Setting up ${db} database configuration...`,
	WEBSOCKETS: (lib: string) => `Setting up ${lib} websockets...`,
	VIEW_ENGINE: (engine: string) => `Setting up ${engine} view engine...`,
	ENV_FILE: "Creating environment configuration files...",
	SUCCESS: {
		README: "Created README.md file",
		PROJECT: "Express TypeScript project setup complete!",
	},
	ERROR: {
		GENERAL: "Error generating Express TypeScript application:",
	}
});