import {
  ImportConfig,
  MethodExpressionIR,
  ImportsFromConfig,
  ExportConfig,
  ParameterIR,
  //   CALLEES,
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
  expressionType: "assignment",
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
  expressionType: "assignment",
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
  expressionType: "assignment",
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
  expressionType: "assignment",
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
  expressionType: "assignment",
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
  expressionType: "assignment",
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

export const CONSTRUCTOR = Object.freeze({
  IMPORTS,
  EXPORTS,
  PARAMS: ioParams,
  ASSIGNMENTS,
});
