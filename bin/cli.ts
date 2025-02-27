#!/usr/bin/env node

import path from "path";
import { promptForOptions, GeneratorOptions } from "../lib/prompt.js";
import { generateExpressTypeScriptApp } from "../lib/index.js";

/**
 * Parse command line arguments
 * @returns Options from command line args
 */
function parseArgs(): Partial<GeneratorOptions> {
  const args = process.argv.slice(2);
  const options: Partial<GeneratorOptions> = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--projectName' && i + 1 < args.length) {
      options.projectName = args[++i];
    } else if (arg === '--database' && i + 1 < args.length) {
      options.database = args[++i];
    } else if (arg === '--databaseOrm' && i + 1 < args.length) {
      options.databaseOrm = args[++i];
    } else if (arg === '--databaseName' && i + 1 < args.length) {
      options.databaseName = args[++i];
    } else if (arg === '--dialect' && i + 1 < args.length) {
      options.dialect = args[++i];
    } else if (arg === '--skipPrompt') {
      options.skipPrompt = true;
    } else if (arg === '--help') {
      console.log(`
Express TypeScript Generator CLI Options:
  --skipPrompt             Skip interactive prompts and use provided options
  --projectName <name>     Specify project name
  --database <type>        Database type (sequelize, typeorm, prisma, mongoose)
  --databaseOrm <orm>      Database ORM (Sequelize, TypeORM, Prisma, Mongoose)
  --databaseName <name>    Database name
  --dialect <dialect>      Database dialect (postgres, mysql, sqlite, etc.)
  
Example for testing Sequelize:
  node bin/cli.js --skipPrompt --projectName test-app --database sequelize --databaseOrm Sequelize --dialect postgres
`);
      process.exit(0);
    }
  }
  
  return options;
}

/**
 * Main CLI entry point for express-generator-typescript
 */
async function run(): Promise<void> {
  try {
    console.log("Setting up new Express TypeScript project...");

    // Parse command line args
    const cliOptions = parseArgs();
    
    // Get user options via interactive prompts or use CLI options
    let options: GeneratorOptions;
    if (cliOptions.skipPrompt) {
      options = {
        projectName: cliOptions.projectName || "express-typescript-app",
        ...cliOptions
      };
      console.log("Using options:", options);
    } else {
      options = await promptForOptions();
    }

    // Setup destination path
    const projectName = options.projectName || "express-typescript-app";
    const destination = path.join(process.cwd(), projectName);

    // Create new project with the provided options
    await generateExpressTypeScriptApp(destination, options);
  } catch (error) {
    console.error("Error setting up project:", error);
    process.exit(1);
  }
}

// Start the CLI
run();
