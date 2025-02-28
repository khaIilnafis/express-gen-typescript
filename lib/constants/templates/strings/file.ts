/**
 * Type definition for environment file constants
 */
export interface EnvironmentFileConstants {
	EXAMPLE_FILENAME: string;
	JWT_PLACEHOLDER: string;
	JWT_SECRET_KEY: string;
	JWT_ENV_TEMPLATE: string;
	JWT_EXPIRES_IN: string;
  }
  /**
   * Type definition for example file constants
   */
  export interface ExampleFileConstants {
	FILENAME: string;
  }

  /**
 * Constants for environment file configuration
 */
export const ENV_FILE = Object.freeze({
	EXAMPLE_FILENAME: ".env.example",
	JWT_PLACEHOLDER: "your-secret-key-here",
	JWT_SECRET_KEY: "your-jwt-secret-key-change-in-production",
	JWT_ENV_TEMPLATE: "JWT_SECRET=your-secret-key",
	JWT_EXPIRES_IN: "JWT_EXPIRES_IN=15"
  } as const) satisfies EnvironmentFileConstants;
  /**
   * Constants for example file configuration
   */
  export const EXAMPLE_FILE = Object.freeze({
	FILENAME: "example",
  } as const) satisfies ExampleFileConstants;