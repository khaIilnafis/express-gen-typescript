/**
 * Main Express Generator Library class
 * Provides both full project generation and individual component generation
 */

import { validateConfiguration } from "../schemas/validation.js";
import {
  ProjectSpecSchema,
  ControllerSpecSchema,
  ModelSpecSchema,
  SingleRouteSpecSchema,
  ServiceSpecSchema,
  SingleMiddlewareSpecSchema,
  type ProjectSpec,
  type ControllerSpec,
  type ModelSpec,
  type SingleRouteSpec,
  type ServiceSpec,
  type SingleMiddlewareSpec,
} from "../schemas/index.js";
import type {
  LibraryConfig,
  GeneratedCode,
  GeneratedProject,
  CodeAnalysis,
  ProjectPreview,
  GenerationContext,
} from "./types.js";
import { ProjectGenerator } from "./generators/project-generator.js";
import { ComponentGenerator } from "./generators/component-generator.js";
import { CodeAnalyzer } from "./analyzers/code-analyzer.js";
import { CodeModifier } from "./modifiers/code-modifier.js";

/**
 * Main Express Generator Library class
 */
export class ExpressGeneratorLib {
  private config: LibraryConfig;
  private context: GenerationContext;
  private projectGenerator: ProjectGenerator;
  private componentGenerator: ComponentGenerator;
  private codeAnalyzer: CodeAnalyzer;
  private codeModifier: CodeModifier;

  constructor(config: LibraryConfig = {}) {
    this.config = {
      format: "typescript",
      target: "es2020",
      autoFormat: true,
      verbose: false,
      ...config,
    };

    // Initialize generation context
    this.context = {
      cwd: process.cwd(),
      outputDir: process.cwd(),
      config: this.config,
      plugins: new Map(),
      templateCache: new Map(),
    };

    // Initialize generators and utilities
    this.projectGenerator = new ProjectGenerator(this.context);
    this.componentGenerator = new ComponentGenerator(this.context);
    this.codeAnalyzer = new CodeAnalyzer(this.context);
    this.codeModifier = new CodeModifier(this.context);
  }

  /**
   * Generate a complete project from specification
   */
  async generateProject(spec: ProjectSpec): Promise<GeneratedProject> {
    // Validate the project specification
    const validatedSpec = validateConfiguration(
      ProjectSpecSchema,
      spec,
      "project specification",
    );

    if (this.config.verbose) {
      console.log("Generating project:", validatedSpec.name);
    }

    return this.projectGenerator.generate(validatedSpec);
  }

  /**
   * Generate a project preview without creating files
   */
  async previewProject(spec: ProjectSpec): Promise<ProjectPreview> {
    const validatedSpec = validateConfiguration(
      ProjectSpecSchema,
      spec,
      "project specification",
    );

    return this.projectGenerator.preview(validatedSpec);
  }

  /**
   * Generate a controller component
   */
  async generateController(spec: ControllerSpec): Promise<GeneratedCode> {
    const validatedSpec = validateConfiguration(
      ControllerSpecSchema,
      spec,
      "controller specification",
    );

    if (this.config.verbose) {
      console.log("Generating controller:", validatedSpec.name);
    }

    return this.componentGenerator.generateController(validatedSpec);
  }

  /**
   * Generate a model component
   */
  async generateModel(spec: ModelSpec): Promise<GeneratedCode> {
    const validatedSpec = validateConfiguration(
      ModelSpecSchema,
      spec,
      "model specification",
    );

    if (this.config.verbose) {
      console.log("Generating model:", validatedSpec.name);
    }

    return this.componentGenerator.generateModel(validatedSpec);
  }

  /**
   * Generate a route component
   */
  async generateRoute(spec: SingleRouteSpec): Promise<GeneratedCode> {
    const validatedSpec = validateConfiguration(
      SingleRouteSpecSchema,
      spec,
      "route specification",
    );

    if (this.config.verbose) {
      console.log("Generating route:", validatedSpec.path);
    }

    return this.componentGenerator.generateRoute(validatedSpec);
  }

  /**
   * Generate a service component
   */
  async generateService(spec: ServiceSpec): Promise<GeneratedCode> {
    const validatedSpec = validateConfiguration(
      ServiceSpecSchema,
      spec,
      "service specification",
    );

    if (this.config.verbose) {
      console.log("Generating service:", validatedSpec.name);
    }

    return this.componentGenerator.generateService(validatedSpec);
  }

  /**
   * Generate a middleware component
   */
  async generateMiddleware(spec: SingleMiddlewareSpec): Promise<GeneratedCode> {
    const validatedSpec = validateConfiguration(
      SingleMiddlewareSpecSchema,
      spec,
      "middleware specification",
    );

    if (this.config.verbose) {
      console.log("Generating middleware:", validatedSpec.name);
    }

    return this.componentGenerator.generateMiddleware(validatedSpec);
  }

  /**
   * Analyze existing code
   */
  async analyzeCode(code: string): Promise<CodeAnalysis> {
    return this.codeAnalyzer.analyze(code);
  }

  /**
   * Add a controller to existing code
   */
  async addController(
    existingCode: string,
    spec: ControllerSpec,
  ): Promise<string> {
    const validatedSpec = validateConfiguration(
      ControllerSpecSchema,
      spec,
      "controller specification",
    );

    return this.codeModifier.addController(existingCode, validatedSpec);
  }

  /**
   * Add a route to existing code
   */
  async addRoute(existingCode: string, spec: SingleRouteSpec): Promise<string> {
    const validatedSpec = validateConfiguration(
      SingleRouteSpecSchema,
      spec,
      "route specification",
    );

    return this.codeModifier.addRoute(existingCode, validatedSpec);
  }

  /**
   * Add middleware to existing code
   */
  async addMiddleware(
    existingCode: string,
    spec: SingleMiddlewareSpec,
  ): Promise<string> {
    const validatedSpec = validateConfiguration(
      SingleMiddlewareSpecSchema,
      spec,
      "middleware specification",
    );

    return this.codeModifier.addMiddleware(existingCode, validatedSpec);
  }

  /**
   * Format code using the configured formatter
   */
  async formatCode(code: string): Promise<string> {
    // For now, return as-is. In a full implementation, this would
    // integrate with Prettier or similar formatting tool
    return code;
  }

  /**
   * Validate a specification against its schema
   */
  validateSpec<T>(schema: any, spec: T): T {
    return validateConfiguration(schema, spec, "specification");
  }

  /**
   * Get the current library configuration
   */
  getConfig(): LibraryConfig {
    return { ...this.config };
  }

  /**
   * Update library configuration
   */
  updateConfig(config: Partial<LibraryConfig>): void {
    this.config = { ...this.config, ...config };
    this.context.config = this.config;
  }
}
