// @ts-nocheck - Template file, not meant to be validated directly
import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import sequelize from "../../database/sequelize";

// Read all model files from the current directory
const models: Record<string, any> = {};
const basename = path.basename(__filename);

// Import all models dynamically
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".ts" &&
      file.indexOf(".test.ts") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default;
    models[model.name] = model;
  });

// Associate models if they have associate method
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Export models and sequelize instance
export { models, sequelize };
export default { models, sequelize };
