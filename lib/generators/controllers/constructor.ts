import {
  ImportConfig,
  MethodExpressionIR,
  ImportsFromConfig,
  ExportConfig,
  ParameterIR,
  CALLEES,
} from "../../types/index.js";

const IMPORTS: ImportsFromConfig<{
  SOCKETIO: ImportConfig;
  CONTROLLER: ImportConfig;
}> = {
  SOCKETIO: {
    NAME: "socket.io",
    DEFAULT: {},
    NAMED: {
      SERVER: ["Server", "SocketIOServer"],
    },
  },
  CONTROLLER: {
    NAME: "./exampleController",
    DEFAULT: {},
    NAMED: {
      GETALL: "getAllController",
      GETBYID: "getByIdController",
      CREATE: "createController",
      UPDATE: "updateController",
      DELETE: "deleteController",
    },
  },
};
const EXPORTS: ExportConfig = {
  DEFAULT: {
    EXAMPLE: "ExampleController",
  },
  NAMED: {},
};
const assignGetAll: MethodExpressionIR = {
  target: { object: "this", property: "getAll" },
  method: "=",
  arguments: [
    {
      type: "function_call",
      value: "getAllController",
      arguments: [{ type: "identifier", value: "io" }],
    },
  ],
};
const assignGetById: MethodExpressionIR = {
  target: { object: "this", property: "getById" },
  method: "=",
  arguments: [
    {
      type: "function_call",
      value: "getByIdController",
      arguments: [{ type: "identifier", value: "io" }],
    },
  ],
};
const assignCreate: MethodExpressionIR = {
  target: { object: "this", property: "create" },
  method: "=",
  arguments: [
    {
      type: "function_call",
      value: "createController",
      arguments: [{ type: "identifier", value: "io" }],
    },
  ],
};
const assignUpdate: MethodExpressionIR = {
  target: { object: "this", property: "update" },
  method: "=",
  arguments: [
    {
      type: "function_call",
      value: "updateController",
      arguments: [{ type: "identifier", value: "io" }],
    },
  ],
};
const assignDelete: MethodExpressionIR = {
  target: { object: "this", property: "delete" },
  method: "=",
  arguments: [
    {
      type: "function_call",
      value: "deleteController",
      arguments: [{ type: "identifier", value: "io" }],
    },
  ],
};
const assignIO: MethodExpressionIR = {
  target: { object: "this", property: "io" },
  method: "=",
  arguments: [{ type: "identifier", value: "io" }],
};
const ioParam: ParameterIR = {
  name: "io",
  type: "SocketIOServer",
  isOptional: true,
};
const ioParams = {
  ioParam,
};
const ASSIGNMENTS = {
  assignIO,
  assignGetAll,
  assignGetById,
  assignCreate,
  assignUpdate,
  assignDelete,
};
const PROPERTIES = {
  GET_ALL: {
    METHOD: "getAll",
    CALLER: "getAllController",
    CALLE: CALLEES.THIS,
  },
  GET_BY_ID: {
    METHOD: "getById",
    CALLER: "getByIdController",
    CALLE: CALLEES.THIS,
  },
  CREATE: {
    METHOD: "create",
    CALLER: "createController",
    CALLE: CALLEES.THIS,
  },
  UPDATE: {
    METHOD: "update",
    CALLER: "updateController",
    CALLE: CALLEES.THIS,
  },
  DELETE: {
    METHOD: "delete",
    CALLER: "deleteController",
    CALLE: CALLEES.THIS,
  },
};
export const CONSTRUCTOR = Object.freeze({
  IMPORTS,
  EXPORTS,
  PARAMS: ioParams,
  ASSIGNMENTS,
  PROPERTIES,
});
