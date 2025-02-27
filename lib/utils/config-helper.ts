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
 * Create an .env file with the given variables
 * @param destination - Directory to create the .env file
 * @param variables - Key-value pairs to include in the .env file
 */
export function createEnvFile(
  destination: string,
  variables: Record<string, string | number>
): void {
  try {
    const envPath = path.join(destination, ".env");

    // Group variables by type
    const appVars: Record<string, string | number> = {};
    const dbVars: Record<string, string | number> = {};
    const authVars: Record<string, string | number> = {};

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
