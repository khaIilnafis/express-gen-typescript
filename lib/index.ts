import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import { promisify } from "util";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import {
  WEBSOCKETS,
  VIEWS,
  LOGS,
  DEPENDENCIES,
} from "./setup/constants/index.js";
// Import setup modules
import setup from "./setup/index.js";
import serverGenerator from "./setup/project-structure/server.js";
import { GeneratorOptions } from "./types/index.js";
import setupPassport from "./setup/auth/passport.js";
import {
  createReadme,
  setupDatabaseConfig,
  setupViewsConfig,
  setupWebsocketsConfig,
} from "./setup/project-structure/index.js";

// Get dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert callback-based functions to promise-based
const mkdir = fsPromises.mkdir;
const writeFile = fsPromises.writeFile;
const readFile = fsPromises.readFile;
const copyFile = fsPromises.copyFile;
const execPromise = promisify(exec);

// Feature-specific dependencies moved to dependencies.js

/**
 * Entry point for Express TypeScript application generator
 * @param destination - Destination path for the project
 * @param options - User selected options
 */
export async function generateExpressTypeScriptApp(
  options: GeneratorOptions,
): Promise<void> {
  try {
    console.log("Starting express-generator-typescript...");

    // Check if destination exists, if not create it
    if (!fs.existsSync(options.destination)) {
      await mkdir(options.destination, { recursive: true });
    }
    // Normalize options to ensure consistent casing and values
    options = normalizeOptions(options);

    // Initialize git repository
    await initializeGitRepository(options.destination);
    // Copy Yarn configuration files before creating package.json
    await copyYarnFiles(options.destination);
    // Create package.json
    await initPackageManager(options);
    // Create tsconfig.json
    await createTsConfig(options.destination);
    // Create basic .env file
    await createEnvFile(options.destination);
    // Create README.md file
    await createReadme(options);
    // Establish project folder structure
    await setup.projectStructure(options);
    // Create server.ts and type files
    // Generate server files
    await serverGenerator.generateServerFiles(options);
    // await serverGenerator.generateGlobalTypesFile(destination, serverOptions);
    // Setup authentication if enabled
    if (options.authentication) {
      await setupPassport(options);
    }
    // Setup database config and models
    if (options.database) {
      await setupDatabaseConfig(options);
    }
    // Setup websockets if enabled
    if (
      options.websocketLib &&
      options.websocketLib !== WEBSOCKETS.LIBRARIES.NONE
    ) {
      await setupWebsocketsConfig(options);
    }
    // Setup views if enabled
    if (options.viewEngine && options.viewEngine !== VIEWS.TYPES.NONE) {
      await setupViewsConfig(options);
    }

    // Database setup is now handled within setup.projectStructure
    // Keeping the comment for clarity
    // Step 3: Setup database (if selected)
    // Database setup is now done in setupProjectStructure

    // Print next steps
    printNextSteps(options.destination);
  } catch (error) {
    console.error(LOGS.SETUP.ERROR.GENERAL, error);
    process.exit(1);
  }
}

/**
 * Normalize options to ensure consistent casing and values
 * @param options - User selected options
 */
const normalizeOptions = (options: GeneratorOptions): GeneratorOptions => {
  const normalizedOptions = options;

  if (options.database && options.databaseName) {
    normalizedOptions.databaseName = options.databaseName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "");
  }
  // Normalize websocketLib option
  if (options.websocketLib) {
    // Map "Socket.io" to "socketio" for consistency
    if (options.websocketLib === "socket.io") {
      normalizedOptions.websocketLib = WEBSOCKETS.LIBRARIES.SOCKETIO;
    }
  }
  // Normalize viewEngine option
  if (options.viewEngine) {
    // Map "Pug (Jade)" to "pug" for consistency
    if (options.viewEngine === "pug (jade)") {
      normalizedOptions.viewEngine = VIEWS.TYPES.PUG;
    }
  }
  return normalizedOptions;
};

/**
 * Create package.json file
 * @param destination - Destination path for the project
 * @param options - User selected options
 */
async function initPackageManager(options: GeneratorOptions): Promise<void> {
  const packageJsonPath = path.join(options.destination, "package.json");

  try {
    // First run yarn init to create a base package.json with proper Yarn integration
    console.log("Initializing package.json with yarn init...");
    await execPromise("yarn init -y", { cwd: options.destination });

    // Read the Yarn-generated package.json
    const generatedPackageJson = JSON.parse(
      await readFile(packageJsonPath, "utf-8"),
    );

    // Start with base dependencies
    const dependencies: Record<string, string> = {
      ...DEPENDENCIES.BASE_DEPENDENCIES,
    };
    const devDependencies: Record<string, string> = {
      ...DEPENDENCIES.BASE_DEV_DEPENDENCIES,
    };

    // Add feature-specific dependencies
    addFeatureDependencies(dependencies, devDependencies, options);

    // Check for stored database scripts and add them
    const dbScriptsPath = path.join(options.destination, ".db-scripts.json");
    if (fs.existsSync(dbScriptsPath)) {
      try {
        const dbScripts = JSON.parse(fs.readFileSync(dbScriptsPath, "utf-8"));
        if (!generatedPackageJson.scripts) {
          generatedPackageJson.scripts = {};
        }

        // Merge database scripts with existing scripts
        Object.assign(generatedPackageJson.scripts, dbScripts);

        // Remove the temporary file
        fs.unlinkSync(dbScriptsPath);
        console.log("Added stored database scripts to package.json");
      } catch (error) {
        console.warn("Error loading stored database scripts:", error);
      }
    }

    // Read our template package.json file
    const templatePath = path.join(
      __dirname,
      "templates",
      "project-structure",
      "package.template.json",
    );
    const templatePackageJson = JSON.parse(
      await readFile(templatePath, "utf-8"),
    );

    // Merge our template with the Yarn-generated one, prioritizing Yarn's special fields
    const mergedPackageJson = {
      ...templatePackageJson,
      ...generatedPackageJson,
      // Override with our specific values
      name: path.basename(options.destination),
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
      JSON.stringify(mergedPackageJson, null, 2),
    );
    console.log("Created package.json");
  } catch (error) {
    console.warn("Failed to initialize package.json with yarn:", error);
    console.log("Falling back to manual package.json creation...");

    // Fallback to creating package.json directly from our template
    // Start with base dependencies
    const dependencies: Record<string, string> = {
      ...DEPENDENCIES.BASE_DEPENDENCIES,
    };
    const devDependencies: Record<string, string> = {
      ...DEPENDENCIES.BASE_DEV_DEPENDENCIES,
    };

    // Add feature-specific dependencies
    addFeatureDependencies(dependencies, devDependencies, options);

    // Read the package.json template file
    const templatePath = path.join(
      __dirname,
      "templates",
      "project-structure",
      "package.template.json",
    );
    const packageJsonTemplate = await readFile(templatePath, "utf-8");

    // Parse the template as an object for easier manipulation
    const packageJsonObj = JSON.parse(packageJsonTemplate);

    // Fill in the dynamic values
    packageJsonObj.name = path.basename(options.destination);
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
  options: GeneratorOptions,
): void {
  // Add database dependencies
  if (options.database) {
    const dbDeps =
      DEPENDENCIES.FEATURE_DEPENDENCIES.database[
        options.databaseOrm as keyof typeof DEPENDENCIES.FEATURE_DEPENDENCIES.database
      ];
    if (dbDeps) {
      Object.assign(dependencies, dbDeps.deps);
      Object.assign(devDependencies, dbDeps.devDeps);
    }
  }

  // Add authentication dependencies
  if (options.authentication) {
    const authType = options.authLib;

    const authDeps =
      DEPENDENCIES.FEATURE_DEPENDENCIES.auth[
        authType as keyof typeof DEPENDENCIES.FEATURE_DEPENDENCIES.auth
      ];
    if (authDeps) {
      Object.assign(dependencies, authDeps.deps);
      Object.assign(devDependencies, authDeps.devDeps);
    }
  }

  // Add websocket dependencies
  if (
    options.websocketLib &&
    options.websocketLib !== WEBSOCKETS.LIBRARIES.NONE
  ) {
    const wsDeps =
      DEPENDENCIES.FEATURE_DEPENDENCIES.websockets[
        options.websocketLib as keyof typeof DEPENDENCIES.FEATURE_DEPENDENCIES.websockets
      ];
    if (wsDeps) {
      Object.assign(dependencies, wsDeps.deps);
      Object.assign(devDependencies, wsDeps.devDeps);
    }
  }

  // Add view engine dependencies
  if (options.viewEngine && options.viewEngine !== VIEWS.TYPES.NONE) {
    const viewDeps =
      DEPENDENCIES.FEATURE_DEPENDENCIES.views[
        options.viewEngine as keyof typeof DEPENDENCIES.FEATURE_DEPENDENCIES.views
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
    "tsconfig.template.json",
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
        "gitignore.template",
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
    "\nA Git repository has been initialized in your project directory.",
  );
  console.log(
    "Consider making your first commit after installing dependencies:",
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
    "env.template",
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
      ".yarnrc.yml",
    );
    const yarnrcDestPath = path.join(destination, ".yarnrc.yml");

    if (fs.existsSync(yarnrcTemplatePath)) {
      await copyFile(yarnrcTemplatePath, yarnrcDestPath);
      //   console.log("Copied .yarnrc.yaml");
    }
  } catch (error) {
    console.warn("Failed to copy Yarn configuration files:", error);
    console.warn("You may need to configure Yarn manually");
  }
}
