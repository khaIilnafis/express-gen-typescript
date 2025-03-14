import { ImportsIR } from "../types/config.js";
import { ConstructorDefinitionIR } from "../types/index.js";
import { CONTROLLER_CONFIG } from "../generators/controllers/index.js";

const moduleImports: ImportsIR = {
  CONTROLLER: CONTROLLER_CONFIG.MODULE.IMPORTS.CONTROLLER,
};
const moduleExports = {
  CONTROLLER: CONTROLLER_CONFIG.MODULE.EXPORTS,
};
const constructorImports: ImportsIR = {
  CONTROLLER: CONTROLLER_CONFIG.CONSTRUCTOR.IMPORTS.CONTROLLER,
  SOCKETIO: CONTROLLER_CONFIG.CONSTRUCTOR.IMPORTS.SOCKETIO,
};
const constructorAssignments: ConstructorDefinitionIR = {
  parameters: [
    // Define any parameters the constructor should take
    CONTROLLER_CONFIG.CONSTRUCTOR.PARAMS.ioParam,
  ],
  expressions: [
    CONTROLLER_CONFIG.CONSTRUCTOR.ASSIGNMENTS.assignIO,
    CONTROLLER_CONFIG.CONSTRUCTOR.ASSIGNMENTS.assignGetAll,
    CONTROLLER_CONFIG.CONSTRUCTOR.ASSIGNMENTS.assignGetById,
    CONTROLLER_CONFIG.CONSTRUCTOR.ASSIGNMENTS.assignCreate,
    CONTROLLER_CONFIG.CONSTRUCTOR.ASSIGNMENTS.assignUpdate,
    CONTROLLER_CONFIG.CONSTRUCTOR.ASSIGNMENTS.assignDelete,
  ],
};
const constructorExports = {
  CONTROLLER: CONTROLLER_CONFIG.CONSTRUCTOR.EXPORTS,
};

const controllerImports: ImportsIR = {
  EXPRESS: CONTROLLER_CONFIG.CONTROLLER.IMPORTS.EXPRESS,
  SOCKETIO: CONTROLLER_CONFIG.CONTROLLER.IMPORTS.SOCKETIO,
};

const classProperties = {
  PROPERTIES: CONTROLLER_CONFIG.CLASS.classProperties,
};
export const CONTROLLER = {
  CONSTRUCTOR: {
    IMPORTS: constructorImports,
    ASSIGNMENTS: constructorAssignments,
    EXPORTS: constructorExports,
  },
  MODULE: {
    IMPORTS: moduleImports,
    EXPORTS: moduleExports,
  },
  IMPORTS: controllerImports,
  EXPORTS: {},
  CLASS: classProperties,
};
