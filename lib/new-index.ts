import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { GeneratorOptions } from "./types/index.js";
import { createProjectSpec } from "./specs/factory.js";
import { ExpressServerGenerator } from "./generators/server/generator.js";
import { ExpressServerSpec } from "./specs/server.js";

// Get dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * New entry point for Express TypeScript application generator using the spec system
 * @param options - User selected options
 */
export async function generateExpressTypeScriptApp(
  options: GeneratorOptions,
): Promise<void> {
  try {
    console.log(
      "Starting express-generator-typescript with new spec system...",
    );

    // Check if destination exists, if not create it
    try {
      await fs.mkdir(options.destination, { recursive: true });
    } catch (error) {
      console.error("Error creating destination directory:", error);
      throw error;
    }

    // Create project spec from options
    const projectSpec = createProjectSpec(options);

    // Extend the server spec with the output path
    const serverSpec: ExpressServerSpec = {
      ...(projectSpec.server as ExpressServerSpec),
      path: options.destination,
    };

    // Generate server files using the new generator
    await generateServerFiles(serverSpec);

    // Print next steps
    printNextSteps(options.destination);
  } catch (error) {
    console.error("Error generating Express TypeScript app:", error);
    process.exit(1);
  }
}

/**
 * Generate server files using the new spec-based generator
 * @param serverSpec - The server specification
 */
async function generateServerFiles(
  serverSpec: ExpressServerSpec,
): Promise<void> {
  try {
    console.log("Generating server files using new spec system...");

    // Create server generator with the spec
    const serverGenerator = new ExpressServerGenerator(serverSpec);

    // Generate server files
    await serverGenerator.generate();

    console.log("Server files generated successfully using new spec system");
  } catch (error) {
    console.error("Error generating server files:", error);
    throw error;
  }
}

/**
 * Print next steps for the user
 * @param destination - The project destination
 */
function printNextSteps(destination: string): void {
  const projectName = path.basename(destination);

  console.log("\n🎉 Project generated successfully! 🎉");
  console.log("\nNext steps:");
  console.log(`1. cd ${projectName}`);
  console.log("2. npm install (or yarn)");
  console.log("3. npm run dev (or yarn dev)");
  console.log("\nHappy coding! 🚀");
}

// Command line interface
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // Basic CLI for testing
  const destination = process.argv[2] || "./test-express-app";

  const options: GeneratorOptions = {
    destination,
    projectName: path.basename(destination),
    database: false,
    authentication: false,
    webSockets: false,
    view: false,
    viewEngine: "none",
    websocketLib: "none",
    databaseLib: "none",
    databaseName: "",
    logger: "morgan",
  };

  generateExpressTypeScriptApp(options)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Error:", error);
      process.exit(1);
    });
}
