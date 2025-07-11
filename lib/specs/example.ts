import { GeneratorOptions } from "../types/setup.js";
import { createProjectSpec } from "./project/factory.js";
import { ExpressServerGenerator } from "../generators/server/generator.js";
import { ExpressServerSpec } from "./server.js";

/**
 * Example of how to use the new spec system in the main generator
 */
export async function generateWithSpecs(
  options: GeneratorOptions,
): Promise<void> {
  try {
    console.log("Starting express-generator-typescript with spec system...");

    // 1. Convert options to a ProjectSpec
    const projectSpec = createProjectSpec(options);

    // 2. Generate the server using the spec
    let serverGenerator: ExpressServerGenerator;
    switch (options.framework) {
      case "express":
        serverGenerator = new ExpressServerGenerator(
          projectSpec.server as ExpressServerSpec, // Cast to the specific server spec type
        );
        break;
      //   case "koa":
      //     serverGenerator = new KoaServerGenerator(
      //       projectSpec.server as KoaServerSpec, // Cast to the specific server spec type
      //     );
      //     break;
      //   case "hapi":
      //     serverGenerator = new HapiServerGenerator(
      //       projectSpec.server as HapiServerSpec, // Cast to the specific server spec type
      //     );
      //     break;
      default:
        serverGenerator = new ExpressServerGenerator(
          projectSpec.server as ExpressServerSpec, // Cast to the specific server spec type
        );
    }

    await serverGenerator.generate();

    // 3. Generate additional components as needed based on specs
    // if (projectSpec.database) {
    //   const dbGenerator = createDatabaseGenerator(projectSpec.database);
    //   await dbGenerator.generate();
    // }

    // if (projectSpec.authentication) {
    //   const authGenerator = createAuthGenerator(projectSpec.authentication);
    //   await authGenerator.generate();
    // }

    // Similar for other components

    console.log("Generation with new spec system complete!");
  } catch (error) {
    console.error("Error generating project with new spec system:", error);
    throw error;
  }
}
