import { PropertyIR, PropertiesIR } from "../../types/config.js";

// For: private io: SocketIOServer | undefined;
const privateIoProperty: PropertyIR = {
  key: "io",
  accessModifier: "private",
  type: "SocketIOServer | undefined",
};

// For: getAll: ReturnType<typeof getAllController>;
const getAllProperty: PropertyIR = {
  key: "getAll",
  complexType: {
    wrapper: "ReturnType",
    inner: {
      type: "typeof",
      value: "getAllController",
    },
  },
};

// For: getById: ReturnType<typeof getByIdController>;
const getByIdProperty: PropertyIR = {
  key: "getById",
  complexType: {
    wrapper: "ReturnType",
    inner: {
      type: "typeof",
      value: "getByIdController",
    },
  },
};

// For: create: ReturnType<typeof createController>;
const createProperty: PropertyIR = {
  key: "create",
  complexType: {
    wrapper: "ReturnType",
    inner: {
      type: "typeof",
      value: "createController",
    },
  },
};

// For: update: ReturnType<typeof updateController>;
const updateProperty: PropertyIR = {
  key: "update",
  complexType: {
    wrapper: "ReturnType",
    inner: {
      type: "typeof",
      value: "updateController",
    },
  },
};

// For: delete: ReturnType<typeof deleteController>;
const deleteProperty: PropertyIR = {
  key: "delete",
  complexType: {
    wrapper: "ReturnType",
    inner: {
      type: "typeof",
      value: "deleteController",
    },
  },
};

const classProperties: PropertiesIR<{
  privateIoProperty: PropertyIR;
  getAllProperty: PropertyIR;
  getByIdProperty: PropertyIR;
  createProperty: PropertyIR;
  updateProperty: PropertyIR;
  deleteProperty: PropertyIR;
}> = {
  privateIoProperty,
  getAllProperty,
  getByIdProperty,
  createProperty,
  updateProperty,
  deleteProperty,
};

export const CLASS = Object.freeze({
  classProperties,
});
