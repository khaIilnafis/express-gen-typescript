#!/usr/bin/env node

import path from "path";
import { promptForOptions } from "../lib/prompt.js";
import expressGenTs from "../lib/express-generator-typescript.js";

/**
 * Main CLI entry point for express-generator-typescript
 */
async function run(): Promise<void> {
  try {
    console.log("Setting up new Express TypeScript project...");

    // Get user options via interactive prompts
    const options = await promptForOptions();

    // Setup destination path
    const projectName = options.projectName || "express-typescript-app";
    const destination = path.join(process.cwd(), projectName);

    // Create new project with the provided options
    await expressGenTs(destination, options);
  } catch (error) {
    console.error("Error setting up project:", error);
    process.exit(1);
  }
}

// Start the CLI
run();
