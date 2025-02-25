import setupSequelize from "./sequelize.js";
import setupTypeORM from "./typeorm.js";
import setupPrisma from "./prisma.js";
import setupMongoose from "./mongoose.js";
import path from "path";
import fs from "fs";

/**
 * Options for database setup
 */
export interface DatabaseSetupOptions {
  databaseName?: string;
  dialect?: string;
  [key: string]: any;
}

/**
 * Setup database based on user selection
 * @param destination - Project destination directory
 * @param databaseOrm - Selected database ORM
 * @param options - Additional options for database setup
 */
async function setupDatabase(
  destination: string,
  databaseOrm: string,
  options: DatabaseSetupOptions = {}
): Promise<void> {
  //   console.log(`Setting up ${databaseOrm} database ORM...`);

  // Create necessary directories
  const dbDir = path.join(destination, "src", "database");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const modelsDir = path.join(destination, "src", "models");
  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
  }

  // Get database name from options or use default
  const databaseName =
    options.databaseName ||
    path
      .basename(destination)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");

  // Create configuration and model files based on the selected ORM (use lowercase for consistency)
  const ormName = databaseOrm.toLowerCase();

  switch (ormName) {
    case "sequelize":
      await setupSequelize(destination, {
        databaseName,
        dialect: options.dialect || "postgres",
      });
      break;
    case "typeorm":
      await setupTypeORM(destination, {
        databaseName,
      });
      break;
    case "prisma":
      await setupPrisma(destination, {
        databaseName,
      });
      break;
    case "mongoose":
      await setupMongoose(destination, {
        databaseName,
      });
      break;
  }

  // Update .env file with database connection info
  const envPath = path.join(destination, ".env");
  const envExamplePath = path.join(destination, ".env.example");

  let envVars = "";

  // Use lowercase for consistent database naming
  switch (ormName) {
    case "sequelize":
    case "typeorm":
      envVars = `
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=${databaseName}
DB_USER=
DB_PASSWORD=
`;
      break;
    case "prisma":
      envVars = `
# Database Configuration (Prisma)
DATABASE_URL="postgresql://user:password@localhost:5432/${databaseName}?schema=public"
`;
      break;
    case "mongoose":
      envVars = `
# Database Configuration (MongoDB)
MONGODB_URI=mongodb://localhost:27017/${databaseName}
`;
      break;
  }

  // Add database environment variables to .env files
  if (fs.existsSync(envPath)) {
    fs.appendFileSync(envPath, envVars);
  }

  // Create .env.example if it doesn't exist
  if (!fs.existsSync(envExamplePath)) {
    fs.writeFileSync(
      envExamplePath,
      `# Example environment variables
NODE_ENV=development
PORT=3000
`
    );
  }

  // Append database config to .env.example
  fs.appendFileSync(envExamplePath, envVars);
  //   console.log("Updated environment files with database configuration");
}

export default setupDatabase;
