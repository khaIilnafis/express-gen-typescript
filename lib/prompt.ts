import inquirer from "inquirer";

/**
 * User configuration options for the project generator
 */
export interface GeneratorOptions {
  projectName: string;
  database?: string | null;
  databaseOrm?: string | null;
  databaseName?: string;
  dialect?: string;
  authentication?: string | boolean;
  authLib?: string | null;
  websocketLib?: string | null;
  viewEngine?: string | null;
}

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
      type: "list",
      name: "databaseOrm",
      message: "Select a database ORM:",
      choices: ["Sequelize", "TypeORM", "Prisma", "Mongoose"],
      when: (answers: any) => answers.useDatabase,
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
      message: "Select database dialect (for Sequelize):",
      choices: ["postgres", "mysql", "sqlite", "mariadb", "mssql"],
      default: "postgres",
      when: (answers: any) => answers.databaseOrm === "Sequelize",
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
      choices: ["Passport", "JWT", "Express-session"],
      when: (answers: any) => answers.useAuth,
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
    projectName: answers.projectName,
  };

  // Add database options if selected
  if (answers.useDatabase) {
    options.database = answers.databaseOrm.toLowerCase();
    options.databaseOrm = answers.databaseOrm;

    if (answers.databaseName) {
      options.databaseName = answers.databaseName;
    }

    if (answers.dialect) {
      options.dialect = answers.dialect;
    }
  }

  // Add authentication options if selected
  if (answers.useAuth) {
    options.authentication = answers.authLib.toLowerCase();
    options.authLib = answers.authLib;
  }

  // Add websocket options if selected
  if (answers.useWebsockets) {
    options.websocketLib = answers.websocketLib;
  }

  // Add view engine options if selected
  if (answers.useViews) {
    options.viewEngine = answers.viewEngine;
  }

  return options;
}
