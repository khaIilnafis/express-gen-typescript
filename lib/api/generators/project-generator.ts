/**
 * Project generator - handles full project generation
 */

import type { ProjectSpec } from "../../schemas/index.js";
import type {
  GeneratedProject,
  GenerationContext,
  ProjectPreview,
} from "../types.js";
import { generateExpressTypeScriptApp } from "../../index.js";

export class ProjectGenerator {
  constructor(private context: GenerationContext) {}

  /**
   * Generate a complete project
   */
  async generate(spec: ProjectSpec): Promise<GeneratedProject> {
    // For now, bridge to the existing generation system
    // TODO: Replace with new spec-based generation

    // Convert spec to legacy options format
    const legacyOptions = this.convertSpecToLegacyOptions(spec);

    // Use existing generator
    await generateExpressTypeScriptApp(legacyOptions);

    // Return generated project info
    return {
      name: spec.name,
      path: spec.path,
      files: [], // TODO: Track generated files
      dependencies: [], // TODO: Extract dependencies
      devDependencies: [], // TODO: Extract dev dependencies
      scripts: {}, // TODO: Extract scripts
      configs: {}, // TODO: Extract configs
    };
  }

  /**
   * Generate a project preview
   */
  async preview(spec: ProjectSpec): Promise<ProjectPreview> {
    // TODO: Implement project preview generation
    return {
      structure: [
        {
          name: "src",
          isDirectory: true,
          children: [
            { name: "controllers", isDirectory: true },
            { name: "models", isDirectory: true },
            { name: "routes", isDirectory: true },
            { name: "services", isDirectory: true },
            { name: "middleware", isDirectory: true },
            { name: "config", isDirectory: true },
            { name: "types", isDirectory: true },
            { name: "server.ts", isDirectory: false, type: "typescript" },
            { name: "index.ts", isDirectory: false, type: "typescript" },
          ],
        },
        { name: "package.json", isDirectory: false, type: "json" },
        { name: "tsconfig.json", isDirectory: false, type: "json" },
        { name: ".env", isDirectory: false, type: "env" },
        { name: ".env.example", isDirectory: false, type: "env" },
        { name: ".gitignore", isDirectory: false, type: "gitignore" },
        { name: "README.md", isDirectory: false, type: "markdown" },
      ],
      fileCount: 15, // Estimated
      dependencies: ["express", "cors", "helmet", "morgan"],
      devDependencies: [
        "@types/express",
        "@types/cors",
        "@types/morgan",
        "typescript",
      ],
      estimatedTime: 5000, // 5 seconds
    };
  }

  /**
   * Convert new spec format to legacy options format
   * TODO: This is a temporary bridge during transition
   */
  private convertSpecToLegacyOptions(spec: ProjectSpec): any {
    return {
      projectName: spec.name,
      destination: spec.path,
      framework: spec.server.framework,
      database: !!spec.database,
      databaseOrm: spec.database?.orm,
      databaseName: spec.database?.name,
      authentication: !!spec.authentication,
      authLib: spec.authentication?.provider,
      webSockets: !!spec.websockets,
      websocketLib: spec.websockets?.library,
      view: !!spec.views,
      viewEngine: spec.views?.engine,
      logger: "morgan",
      routes: [],
      customSpec: true,
    };
  }
}
