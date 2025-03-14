import inquirer from "inquirer";
import { GeneratorOptions } from "./types/index.js";

/**
 * Prompts the user for project configuration options
 * @returns The user's configuration choices
 */
export async function promptForOptions(): Promise<GeneratorOptions> {
  const answers = (await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "express-typescript-app",
      validate: (input: string) =>
        input.trim() !== "" ? true : "Project name cannot be empty",
    },
    {
      type: "confirm",
      name: "useDatabase",
      message: "Include database support?",
      default: false,
    },
    {
      type: "input",
      name: "databaseName",
      message: "Database name (leave empty for project name):",
      default: "",
      when: (answers) => answers.useDatabase,
    },
    {
      type: "list",
      name: "dialect",
      message: "Select database dialect:",
      choices: ["postgres", "mysql", "sqlite", "mariadb", "mssql", "mongodb"],
      default: "postgres",
      when: (answers) => answers.useDatabase,
      filter: (input: string) => input.toLowerCase(),
    },
    {
      type: "list",
      name: "databaseOrm",
      message: "Select a database ORM:",
      choices: ["Sequelize", "TypeORM", "Prisma"],
      when: (answers) => answers.useDatabase && answers.dialect !== "mongodb",
      filter: (input: string) => input.toLowerCase(),
    },
    {
      type: "list",
      name: "databaseOrm",
      message: "Select a database ORM:",
      choices: ["Mongoose", "Prisma"],
      when: (answers) => answers.useDatabase && answers.dialect == "mongodb",
      filter: (input: string) => input.toLowerCase(),
    },
    {
      type: "confirm",
      name: "useAuth",
      message: "Include authentication support?",
      default: false,
    },
    {
      type: "list",
      name: "authLib",
      message: "Select an authentication library:",
      choices: ["Passport", "Express-session"],
      when: (answers) => answers.useAuth,
      filter: (input: string) => input.toLowerCase(),
    },
    {
      type: "list",
      name: "authStrategy",
      message: "Select Passport Auth Strategy",
      choices: ["Local", "JWT"],
      when: (answers) => answers.authLib == "Passport",
      filter: (input: string) => input.toLowerCase(),
    },
    {
      type: "confirm",
      name: "useWebsockets",
      message: "Include websockets support?",
      default: false,
    },
    {
      type: "list",
      name: "websocketLib",
      message: "Select a websocket library:",
      choices: ["Socket.io", "WS"],
      when: (answers) => answers.useWebsockets,
      filter: (input: string) => input.toLowerCase(),
    },
    {
      type: "confirm",
      name: "useViews",
      message: "Include view engine support?",
      default: false,
    },
    {
      type: "list",
      name: "viewEngine",
      message: "Select a view engine:",
      choices: ["EJS", "Pug (Jade)", "Handlebars"],
      when: (answers) => answers.useViews,
      filter: (input: string) => input.toLowerCase(),
    },
  ])) as unknown as GeneratorOptions;
  // Transform answers into the expected format
  const options: GeneratorOptions = {
    destination: "",
    projectName: answers.projectName,
    authentication: answers.useAuth as boolean,
    database: answers.useDatabase as boolean,
    webSockets: answers.useWebsockets as boolean,
    view: answers.useViews as boolean,
  };

  // Add database options if selected
  if (options.database) {
    options.databaseOrm = answers.databaseOrm;
    options.databaseName = answers.databaseName
      ? answers.databaseName
      : answers.projectName;
    options.dialect = answers.dialect;
  }

  // Add authentication options if selected
  if (options.authentication) {
    options.authLib = answers.authLib;
  }

  // Add websocket options if selected
  if (options.webSockets) {
    options.websocketLib = answers.websocketLib;
  }

  // Add view engine options if selected
  if (options.view) {
    options.viewEngine = answers.viewEngine;
  }

  return options;
}
