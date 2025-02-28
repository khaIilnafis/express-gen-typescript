/**
 * App domain constants index
 * Re-exports all app-related constants
 */

export interface AppStructure {
	DEFAULTS: DEFAULTS;
	ENV: ENV;
}
interface DEFAULTS{
	PORT: number,
	ENV: string;
	LOG_LEVEL: string;
}
interface ENV {
	DEVELOPMENT: string;
	PRODUCTION: string;
	TEST: string;
}
/**
 * Application-level constants
 */

export const APP = Object.freeze({
	// Default application settings
	DEFAULTS: {
	  PORT: 3000,
	  ENV: "development",
	  LOG_LEVEL: "debug",
	},
  
	// Environment variables
	ENV: {
	  DEVELOPMENT: "development",
	  PRODUCTION: "production",
	  TEST: "test",
	},
}) satisfies AppStructure; 