import path from "path";
import fs from "fs";
import { promisify } from "util";
import { GeneratorOptions } from "./prompt.js";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import {
  BASE_DEPENDENCIES,
  BASE_DEV_DEPENDENCIES,
  FEATURE_DEPENDENCIES,
} from "./dependencies.js";

// Import setup modules
import setup from "./setup/index.js";

// Get dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert callback-based functions to promise-based
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const copyFile = promisify(fs.copyFile);
const execPromise = promisify(exec);

// Feature-specific dependencies moved to dependencies.js

/**
 * Entry point for Express TypeScript application generator
 * @param destination - Destination path for the project
 * @param options - User selected options
 */
async function expressGenTs(
  destination: string,
  options: GeneratorOptions
): Promise<void> {
  try {
    console.log("Starting express-generator-typescript...");

    // Check if destination exists, if not create it
    if (!fs.existsSync(destination)) {
      await mkdir(destination, { recursive: true });
    }

    // Get database name from options or use default based on project name
    if (
      options.database &&
      options.database !== "none" &&
      !options.databaseName
    ) {
      options.databaseName = path
        .basename(destination)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_");
    }

    // Normalize options to ensure consistent casing and values
    normalizeOptions(options);

    // Create basic .env file
    await createEnvFile(destination);

    // Set up project structure first
    // Create a properly typed object for setup.projectStructure
    interface SetupOptions {
      database: string;
      authentication: boolean;
      websocketLib: string;
      viewEngine: string;
      [key: string]: any;
    }

    const setupOptions: SetupOptions = {
      database: (options.database as string) || "none",
      authentication: Boolean(options.authentication),
      websocketLib: (options.websocketLib as string) || "none",
      viewEngine: (options.viewEngine as string) || "none",
      databaseName: options.databaseName,
      dialect: options.dialect,
    };

    await setup.projectStructure(destination, setupOptions);

    // Copy Yarn configuration files before creating package.json
    await copyYarnFiles(destination);

    // Create package.json
    await initPackageManager(destination, options);

    // Create tsconfig.json
    await createTsConfig(destination);

    // Initialize git repository
    await initializeGitRepository(destination);

    // Print next steps
    printNextSteps(destination);
  } catch (error) {
    console.error("Error generating Express TypeScript application:", error);
    process.exit(1);
  }
}

/**
 * Normalize options to ensure consistent casing and values
 * @param options - User selected options
 */
function normalizeOptions(options: GeneratorOptions): void {
  // Normalize database option
  if (options.database) {
    options.database = options.database.toLowerCase();
  }

  // Normalize authentication option
  if (options.authentication) {
    if (typeof options.authentication === "string") {
      options.authentication = options.authentication.toLowerCase();
    }
  }

  // Normalize websocketLib option
  if (options.websocketLib) {
    options.websocketLib = options.websocketLib.toLowerCase();

    // Map "Socket.io" to "socketio" for consistency
    if (options.websocketLib === "socket.io") {
      options.websocketLib = "socketio";
    }
  }

  // Normalize viewEngine option
  if (options.viewEngine) {
    options.viewEngine = options.viewEngine.toLowerCase();

    // Map "Pug (Jade)" to "pug" for consistency
    if (options.viewEngine === "pug (jade)") {
      options.viewEngine = "pug";
    }
  }
}

/**
 * Create package.json file
 * @param destination - Destination path for the project
 * @param options - User selected options
 */
async function initPackageManager(
  destination: string,
  options: GeneratorOptions
): Promise<void> {
  const packageJsonPath = path.join(destination, "package.json");

  try {
    // First run yarn init to create a base package.json with proper Yarn integration
    console.log("Initializing package.json with yarn init...");
    await execPromise("yarn init -y", { cwd: destination });

    // Read the Yarn-generated package.json
    const generatedPackageJson = JSON.parse(
      await readFile(packageJsonPath, "utf-8")
    );

    // Start with base dependencies
    const dependencies: Record<string, string> = { ...BASE_DEPENDENCIES };
    const devDependencies: Record<string, string> = {
      ...BASE_DEV_DEPENDENCIES,
    };

    // Add feature-specific dependencies
    addFeatureDependencies(dependencies, devDependencies, options);

    // Read our template package.json file
    const templatePath = path.join(
      __dirname,
      "templates",
      "project-structure",
      "package.template.json"
    );
    const templatePackageJson = JSON.parse(
      await readFile(templatePath, "utf-8")
    );

    // Merge our template with the Yarn-generated one, prioritizing Yarn's special fields
    const mergedPackageJson = {
      ...templatePackageJson,
      ...generatedPackageJson,
      // Override with our specific values
      name: path.basename(destination),
      description: templatePackageJson.description,
      scripts: templatePackageJson.scripts,
      keywords: templatePackageJson.keywords,
      license: templatePackageJson.license,
      // Add our dependencies
      dependencies: dependencies,
      devDependencies: devDependencies,
    };

    // Write the merged package.json file with proper formatting
    await writeFile(
      packageJsonPath,
      JSON.stringify(mergedPackageJson, null, 2)
    );
    console.log("Created package.json");
  } catch (error) {
    console.warn("Failed to initialize package.json with yarn:", error);
    console.log("Falling back to manual package.json creation...");

    // Fallback to creating package.json directly from our template
    // Start with base dependencies
    const dependencies: Record<string, string> = { ...BASE_DEPENDENCIES };
    const devDependencies: Record<string, string> = {
      ...BASE_DEV_DEPENDENCIES,
    };

    // Add feature-specific dependencies
    addFeatureDependencies(dependencies, devDependencies, options);

    // Read the package.json template file
    const templatePath = path.join(
      __dirname,
      "templates",
      "project-structure",
      "package.template.json"
    );
    let packageJsonTemplate = await readFile(templatePath, "utf-8");

    // Parse the template as an object for easier manipulation
    const packageJsonObj = JSON.parse(packageJsonTemplate);

    // Fill in the dynamic values
    packageJsonObj.name = path.basename(destination);
    packageJsonObj.dependencies = dependencies;
    packageJsonObj.devDependencies = devDependencies;

    // Write package.json file with proper formatting
    await writeFile(packageJsonPath, JSON.stringify(packageJsonObj, null, 2));
  }
}

/**
 * Add feature-specific dependencies based on user options
 * @param dependencies - Dependencies object to modify
 * @param devDependencies - Dev dependencies object to modify
 * @param options - User selected options
 */
function addFeatureDependencies(
  dependencies: Record<string, string>,
  devDependencies: Record<string, string>,
  options: GeneratorOptions
): void {
  // Add database dependencies
  if (options.database && options.database !== "none") {
    const dbDeps =
      FEATURE_DEPENDENCIES.database[
        options.database as keyof typeof FEATURE_DEPENDENCIES.database
      ];
    if (dbDeps) {
      Object.assign(dependencies, dbDeps.deps);
      Object.assign(devDependencies, dbDeps.devDeps);
    }
  }

  // Add authentication dependencies
  if (options.authentication) {
    let authType = options.authentication;
    // Handle boolean case for backward compatibility
    if (typeof authType === "boolean" && authType === true) {
      authType = "passport"; // Default to passport if only boolean true is provided
    }

    const authDeps =
      FEATURE_DEPENDENCIES.auth[
        authType as keyof typeof FEATURE_DEPENDENCIES.auth
      ];
    if (authDeps) {
      Object.assign(dependencies, authDeps.deps);
      Object.assign(devDependencies, authDeps.devDeps);
    }
  }

  // Add websocket dependencies
  if (options.websocketLib && options.websocketLib !== "none") {
    const wsDeps =
      FEATURE_DEPENDENCIES.websockets[
        options.websocketLib as keyof typeof FEATURE_DEPENDENCIES.websockets
      ];
    if (wsDeps) {
      Object.assign(dependencies, wsDeps.deps);
      Object.assign(devDependencies, wsDeps.devDeps);
    }
  }

  // Add view engine dependencies
  if (options.viewEngine && options.viewEngine !== "none") {
    const viewDeps =
      FEATURE_DEPENDENCIES.views[
        options.viewEngine as keyof typeof FEATURE_DEPENDENCIES.views
      ];
    if (viewDeps) {
      Object.assign(dependencies, viewDeps.deps);
      Object.assign(devDependencies, viewDeps.devDeps);
    }
  }
}

/**
 * Create tsconfig.json file
 * @param destination - Destination path for the project
 */
async function createTsConfig(destination: string): Promise<void> {
  const tsconfigPath = path.join(destination, "tsconfig.json");

  // Read the tsconfig template file
  const templatePath = path.join(
    __dirname,
    "templates",
    "project-structure",
    "tsconfig.template.json"
  );
  const tsconfigContent = await readFile(templatePath, "utf-8");

  // Write tsconfig.json file
  await writeFile(tsconfigPath, tsconfigContent);
  console.log("Created tsconfig.json");
}

/**
 * Initialize git repository in the project directory
 * @param destination - Destination path for the project
 */
async function initializeGitRepository(destination: string): Promise<void> {
  try {
    console.log("Initializing git repository...");

    // Initialize git repository
    await execPromise("git init", { cwd: destination });

    // Create a .gitignore file if it doesn't exist
    const gitignorePath = path.join(destination, ".gitignore");
    if (!fs.existsSync(gitignorePath)) {
      // Read the gitignore template file
      const templatePath = path.join(
        __dirname,
        "templates",
        "project-structure",
        "gitignore.template"
      );
      const gitignoreContent = await readFile(templatePath, "utf-8");

      await writeFile(gitignorePath, gitignoreContent);
    }

    console.log("Git repository initialized successfully");
  } catch (error) {
    console.warn("Failed to initialize git repository:", error);
    console.warn("You can manually initialize it later with 'git init'");
  }
}

/**
 * Print next steps after generation is complete
 * @param destination - Destination path for the project
 */
function printNextSteps(destination: string): void {
  const relativePath = path.relative(process.cwd(), destination);

  console.log("\n--------------------------------------------------");
  console.log("🎉 Your Express TypeScript application is ready!");
  console.log("--------------------------------------------------\n");

  console.log("Next steps:");
  console.log(`1. cd ${relativePath}`);
  console.log("2. yarn && yarn build");
  console.log("3. yarn start to start the development server");
  console.log(
    "\nA Git repository has been initialized in your project directory."
  );
  console.log(
    "Consider making your first commit after installing dependencies:"
  );
  console.log("  git add .");
  console.log("  git commit -m 'Initial commit'\n");
  console.log("Happy coding! 🚀");
}

/**
 * Create basic .env file with initial configuration
 * @param destination - Destination path for the project
 */
async function createEnvFile(destination: string): Promise<void> {
  const envPath = path.join(destination, ".env");
  const envExamplePath = path.join(destination, ".env.example");

  // Read the env template file
  const templatePath = path.join(
    __dirname,
    "templates",
    "project-structure",
    "env.template"
  );
  const envContent = await readFile(templatePath, "utf-8");

  // Don't overwrite if exists
  if (!fs.existsSync(envPath)) {
    await writeFile(envPath, envContent);
    console.log("Created .env file");
  }

  // Always create or update .env.example
  await writeFile(envExamplePath, envContent);
}

/**
 * Copy Yarn configuration files to the destination project
 * @param destination - Destination path for the project
 */
async function copyYarnFiles(destination: string): Promise<void> {
  try {
    // console.log("Copying Yarn configuration files...");

    // Copy .yarnrc.yaml
    const yarnrcTemplatePath = path.join(
      __dirname,
      "templates",
      "project-structure",
      ".yarnrc.yaml"
    );
    const yarnrcDestPath = path.join(destination, ".yarnrc.yaml");

    if (fs.existsSync(yarnrcTemplatePath)) {
      await copyFile(yarnrcTemplatePath, yarnrcDestPath);
      //   console.log("Copied .yarnrc.yaml");
    }
  } catch (error) {
    console.warn("Failed to copy Yarn configuration files:", error);
    console.warn("You may need to configure Yarn manually");
  }
}

export default expressGenTs;
