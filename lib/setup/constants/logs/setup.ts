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
  },
});
