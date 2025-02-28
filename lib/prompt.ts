import inquirer from "inquirer";
import { GeneratorOptions } from "./utils/types.js";

/**
 * Prompts the user for project configuration options
 * @returns The user's configuration choices
 */
export async function promptForOptions(): Promise<GeneratorOptions> {
  const answers = await inquirer.prompt([
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
      when: (answers: any) => answers.useDatabase,
    },
    {
      type: "list",
      name: "dialect",
      message: "Select database dialect:",
      choices: ["postgres", "mysql", "sqlite", "mariadb", "mssql", "mongodb"],
      default: "postgres",
      when: (answers: any) => answers.useDatabase,
    },
    {
      type: "list",
      name: "databaseOrm",
      message: "Select a database ORM:",
      choices: ["Sequelize", "TypeORM", "Prisma"],
      when: (answers: any) => answers.dialect !== "mongodb",
    },
    {
      type: "list",
      name: "databaseOrm",
      message: "Select a database ORM:",
      choices: ["Mongoose", "Prisma"],
      when: (answers: any) => answers.dialect == "mongodb",
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
      when: (answers: any) => answers.useAuth,
    },
    {
      type: "list",
      name: "authStrategy",
      message: "Select Passport Auth Strategy",
      choices: ["Local", "JWT"],
      when: (answers: any) => answers.authLib == "Passport",
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
      when: (answers: any) => answers.useWebsockets,
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
      when: (answers: any) => answers.useViews,
    },
  ]);

  // Transform answers into the expected format
  const options: GeneratorOptions = {
	destination: '',
    projectName: answers.projectName,
	authentication: answers.useAuth,
	database: answers.useDatabase,
	webSockets: answers.useWebsockets,
	view: answers.useViews
  };

  // Add database options if selected
  if (options.database) {
    options.database = answers.useDatabase;
    options.databaseOrm = answers.databaseOrm.toLowerCase();
	options.databaseName = answers.databaseName ? answers.databaseName.toLowerCase() : answers.projectName.toLowerCase();
	options.dialect = answers.dialect;
  }

  // Add authentication options if selected
  if (options.authentication) {
    options.authLib = answers.authLib.toLowerCase();
  }

  // Add websocket options if selected
  if (options.webSockets) {
    options.websocketLib = answers.websocketLib.toLowerCase();
  }

  // Add view engine options if selected
  if (options.view) {
    options.viewEngine = answers.viewEngine.toLowerCase();
  }

  return options;
}
