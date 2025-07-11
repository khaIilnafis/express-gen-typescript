import { GeneratorOptions } from "../../types/setup.js";
import {
  createAuthSpec,
  createDatabaseSpec,
  createServerSpec,
  createViewSpec,
  createWebsocketSpec,
} from "../server/factory.js";
import { ProjectSpecSchema, type ProjectSpec } from "../../schemas/index.js";
import { validateConfiguration } from "../../schemas/validation.js";

/**
 * Create a project specification from generator options
 */
export function createProjectSpec(options: GeneratorOptions): ProjectSpec {
  const projectSpec: ProjectSpec = {
    name: options.projectName,
    path: options.destination,
    server: createServerSpec(options),
  };

  // Add optional components based on user selections
  if (options.database) {
    projectSpec.database = createDatabaseSpec(options);
  }

  if (options.authentication) {
    projectSpec.authentication = createAuthSpec(options);
  }

  if (options.webSockets) {
    projectSpec.websockets = createWebsocketSpec(options);
  }

  if (options.view) {
    projectSpec.views = createViewSpec(options);
  }

  // Validate the generated project spec
  return validateConfiguration(
    ProjectSpecSchema,
    projectSpec,
    "Project specification",
  );
}
