/**
 * Component generator - handles individual component generation
 */

import type {
  ControllerSpec,
  ModelSpec,
  SingleRouteSpec,
  ServiceSpec,
  SingleMiddlewareSpec,
} from "../../schemas/index.js";
import type { GeneratedCode, GenerationContext } from "../types.js";
import { buildController } from "./builders/controller-builder.js";
import { buildModel } from "./builders/model-builder.js";
import { buildRoute } from "./builders/route-builder.js";
import { buildService } from "./builders/service-builder.js";
import { buildMiddleware } from "./builders/middleware-builder.js";

export class ComponentGenerator {
  constructor(private context: GenerationContext) {}

  /**
   * Generate a controller component
   */
  async generateController(spec: ControllerSpec): Promise<GeneratedCode> {
    const code = await buildController(spec, this.context);

    return {
      code,
      filePath: `src/controllers/${spec.name}.ts`,
      shouldFormat: true,
      dependencies: ["express"],
      devDependencies: ["@types/express"],
      imports: ["express"],
      exports: [spec.name],
    };
  }

  /**
   * Generate a model component
   */
  async generateModel(spec: ModelSpec): Promise<GeneratedCode> {
    const code = await buildModel(spec, this.context);

    // Determine file path based on ORM
    const fileName = spec.name.toLowerCase();
    let filePath: string;
    let dependencies: string[] = [];
    let devDependencies: string[] = [];

    switch (spec.orm) {
      case "sequelize":
        filePath = `src/models/${fileName}.ts`;
        dependencies = ["sequelize"];
        devDependencies = ["@types/sequelize"];
        break;
      case "typeorm":
        filePath = `src/entities/${fileName}.ts`;
        dependencies = ["typeorm"];
        break;
      case "prisma":
        filePath = `prisma/schema.prisma`;
        dependencies = ["@prisma/client"];
        devDependencies = ["prisma"];
        break;
      case "mongoose":
        filePath = `src/models/${fileName}.ts`;
        dependencies = ["mongoose"];
        devDependencies = ["@types/mongoose"];
        break;
      default:
        filePath = `src/models/${fileName}.ts`;
    }

    return {
      code,
      filePath,
      shouldFormat: true,
      dependencies,
      devDependencies,
      imports: [spec.orm],
      exports: [spec.name],
    };
  }

  /**
   * Generate a route component
   */
  async generateRoute(spec: SingleRouteSpec): Promise<GeneratedCode> {
    const code = await buildRoute(spec, this.context);

    return {
      code,
      filePath: `src/routes/${spec.path.replace(/[^a-zA-Z0-9]/g, "-")}.ts`,
      shouldFormat: true,
      dependencies: ["express"],
      devDependencies: ["@types/express"],
      imports: ["express"],
      exports: ["router"],
    };
  }

  /**
   * Generate a service component
   */
  async generateService(spec: ServiceSpec): Promise<GeneratedCode> {
    const code = await buildService(spec, this.context);

    return {
      code,
      filePath: `src/services/${spec.name.toLowerCase()}.ts`,
      shouldFormat: true,
      dependencies: [],
      devDependencies: [],
      imports: [],
      exports: [spec.name],
    };
  }

  /**
   * Generate a middleware component
   */
  async generateMiddleware(spec: SingleMiddlewareSpec): Promise<GeneratedCode> {
    const code = await buildMiddleware(spec, this.context);

    return {
      code,
      filePath: `src/middleware/${spec.name.toLowerCase()}.ts`,
      shouldFormat: true,
      dependencies: ["express"],
      devDependencies: ["@types/express"],
      imports: ["express"],
      exports: [spec.name],
    };
  }
}
