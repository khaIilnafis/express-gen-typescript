import * as fs from "fs/promises";
import * as path from "path";
import { ExpressServerSpec } from "../../specs/server.js";
import { createPreset, ServerPreset } from "../../presets/factory.js";
import * as recast from "recast";
import { buildImports } from "../../utils/builders/imports.js";
import { buildConstructor } from "../../utils/builders/constructors.js";
import { buildMethod } from "../../utils/builders/method.js";
import { buildProperty } from "../../utils/builders/properties.js";

/**
 * Generator for Express server
 */
export class ExpressServerGenerator {
  private spec: ExpressServerSpec;
  private outputPath: string;
  private preset: ServerPreset;

  constructor(spec: ExpressServerSpec) {
    this.spec = spec;
    this.outputPath = spec.path;
    this.preset = createPreset(spec);
  }

  /**
   * Generate the server files
   */
  async generate(): Promise<void> {
    try {
      // Create the necessary directories
      await this.createDirectories();

      // Generate server class
      await this.generateServerClass();

      // Generate environment config
      await this.generateEnvConfig();

      // Generate index file
      await this.generateIndexFile();

      console.log("Server files generated successfully");
    } catch (error) {
      console.error("Error generating server files:", error);
      throw error;
    }
  }

  /**
   * Create the necessary directories
   */
  private async createDirectories(): Promise<void> {
    const srcDir = path.join(this.outputPath, "src");
    const configDir = path.join(srcDir, "config");

    try {
      // Create src directory if it doesn't exist
      await fs.mkdir(srcDir, { recursive: true });

      // Create config directory if it doesn't exist
      await fs.mkdir(configDir, { recursive: true });

      console.log("Directories created successfully");
    } catch (error) {
      console.error("Error creating directories:", error);
      throw error;
    }
  }

  /**
   * Generate the server class file
   */
  private async generateServerClass(): Promise<void> {
    try {
      const b = recast.types.builders;

      // Build imports using the builder
      const importNodes = buildImports(this.preset.imports);

      // Build properties using the property builder
      const propertyNodes = this.preset.properties.map((prop) =>
        buildProperty(prop),
      );

      // Build constructor using the builder
      const constructorNode = buildConstructor(this.preset.constructor);

      // Build methods using the builder
      const methodNodes = Object.values(this.preset.methods)
        .filter(
          (method): method is NonNullable<typeof method> =>
            method !== undefined,
        )
        .map((methodDef) => buildMethod(methodDef));

      // Build the server class using AST builders
      const serverClass = b.program([
        ...importNodes,
        b.exportNamedDeclaration(
          b.classDeclaration(
            b.identifier("Server"),
            b.classBody([...propertyNodes, constructorNode, ...methodNodes]),
          ),
          [],
        ),
      ]);

      // Convert the AST to code
      const serverClassCode = recast.print(serverClass).code;

      // Write the file
      const serverFilePath = path.join(this.outputPath, "src", "server.ts");
      await fs.writeFile(serverFilePath, serverClassCode);

      console.log("Server class generated successfully");
    } catch (error) {
      console.error("Error generating server class:", error);
      throw error;
    }
  }

  /**
   * Generate environment config
   */
  private async generateEnvConfig(): Promise<void> {
    // For simplicity, we're still using a template for the env config
    // In a more complete implementation, we would use the builder system here too
    const envConfigContent = `
export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  // Add more environment variables as needed
};
`;

    const configFilePath = path.join(
      this.outputPath,
      "src",
      "config",
      "env.ts",
    );
    await fs.writeFile(configFilePath, envConfigContent);

    console.log("Environment config generated successfully");
  }

  /**
   * Generate index file
   */
  private async generateIndexFile(): Promise<void> {
    // For simplicity, we're still using a template for the index file
    // In a more complete implementation, we would use the builder system here too
    const indexContent = `
import { Server } from './server';

// Bootstrap the application
Server.bootstrap();
`;

    const indexFilePath = path.join(this.outputPath, "src", "index.ts");
    await fs.writeFile(indexFilePath, indexContent);

    console.log("Index file generated successfully");
  }
}
