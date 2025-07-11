import { PropertiesIR, PropertyIR } from "../../../types/index.js";

// For: public app: Application;
const appProperty: PropertyIR = {
  key: "app",
  accessModifier: "public",
  type: "Application",
};

// For: public server: http.Server;
const serverProperty: PropertyIR = {
  key: "server",
  accessModifier: "public",
  type: "http.Server",
};

// For: public port: number | string;
const portProperty: PropertyIR = {
  key: "port",
  accessModifier: "public",
  type: "number | string",
};

// For: public io!: SocketIOServer;
const ioProperty: PropertyIR = {
  key: "io",
  accessModifier: "public",
  type: "SocketIOServer",
  hasDefiniteAssignment: true,
};
const PROPERTIES: PropertiesIR<{
  appProperty: PropertyIR;
  serverProperty: PropertyIR;
  portProperty: PropertyIR;
  ioProperty: PropertyIR;
}> = {
  appProperty,
  serverProperty,
  portProperty,
  ioProperty,
};
export default PROPERTIES;
