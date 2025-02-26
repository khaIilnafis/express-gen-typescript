/**
 * Configuration helper utilities
 */

import fs from "fs";
import path from "path";
import { APP, ERRORS } from "../constants/index.js";

/**
 * Interface for standardized environment configuration
 */
export interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  LOG_LEVEL: string;
  [key: string]: any; // Allow additional properties
}

/**
 * Load environment variables from .env file
 * @param envPath - Path to the .env file
 */
export function loadEnvFile(envPath: string): void {
  try {
    if (fs.existsSync(envPath)) {
      console.log(`Loading environment from: ${envPath}`);
      require("dotenv").config({ path: envPath });
    }
  } catch (error) {
    console.error("Error loading .env file:", error);
  }
}

/**
 * Get standardized configuration object with defaults
 * @returns Configuration object with environment variables
 */
export function getConfig(): EnvConfig {
  // Set default values
  const config: EnvConfig = {
    PORT: APP.DEFAULTS.PORT,
    NODE_ENV: APP.ENV.DEVELOPMENT,
    LOG_LEVEL: APP.DEFAULTS.LOG_LEVEL,
  };

  // Override with environment variables if available
  if (process.env.PORT) {
    config.PORT = parseInt(process.env.PORT, 10);
  }

  if (process.env.NODE_ENV) {
    config.NODE_ENV = process.env.NODE_ENV;
  }

  if (process.env.LOG_LEVEL) {
    config.LOG_LEVEL = process.env.LOG_LEVEL;
  }

  return config;
}

/**
 * Create an .env file with the given variables
 * @param destination - Directory to create the .env file
 * @param variables - Key-value pairs to include in the .env file
 */
export function createEnvFile(
  destination: string,
  variables: Record<string, string>
): void {
  try {
    const envPath = path.join(destination, ".env");

    // Group variables by type
    const appVars: Record<string, string> = {};
    const dbVars: Record<string, string> = {};
    const authVars: Record<string, string> = {};

    // Categorize variables
    Object.entries(variables).forEach(([key, value]) => {
      if (
        key.startsWith("DB_") ||
        key.includes("DATABASE") ||
        key.includes("MONGO") ||
        key.includes("POSTGRES") ||
        key.includes("PG_") ||
        key.includes("MYSQL")
      ) {
        dbVars[key] = value;
      } else if (
        key.includes("JWT") ||
        key.includes("AUTH") ||
        key.includes("SECRET")
      ) {
        authVars[key] = value;
      } else {
        appVars[key] = value;
      }
    });

    // Create content with sections
    let envContent = "# App Configuration\n";
    envContent +=
      Object.entries(appVars)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n") + "\n";

    // Add database section if needed
    if (Object.keys(dbVars).length > 0) {
      envContent += "\n# Database Configuration\n";
      envContent +=
        Object.entries(dbVars)
          .map(([key, value]) => `${key}=${value}`)
          .join("\n") + "\n";
    }

    // Add auth section if needed
    if (Object.keys(authVars).length > 0) {
      envContent += "\n# Authentication\n";
      envContent += Object.entries(authVars)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n");
    }

    fs.writeFileSync(envPath, envContent, "utf8");
    console.log(".env file created successfully");
  } catch (error) {
    console.error(ERRORS.MESSAGES.SERVER.CONFIGURATION_ERROR, error);
  }
}

/**
 * Determine if the application is running in production mode
 * @returns True if in production mode
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === APP.ENV.PRODUCTION;
}

/**
 * Determine if the application is running in development mode
 * @returns True if in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === APP.ENV.DEVELOPMENT || !process.env.NODE_ENV;
}

/**
 * Determine if the application is running in test mode
 * @returns True if in test mode
 */
export function isTest(): boolean {
  return process.env.NODE_ENV === APP.ENV.TEST;
}
