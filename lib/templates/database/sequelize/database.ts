// @ts-nocheck - Template file, not meant to be validated directly
import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "{{databaseName}}",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  dialect: "{{dialect}}",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

export default sequelize;
