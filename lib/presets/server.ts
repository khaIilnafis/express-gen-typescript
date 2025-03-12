import { ImportsIR, MethodDefinitionIR } from "../types/index.js";
import { ConstructorDefinitionIR } from "../types/index.js";
import { EXPRESS } from "./express.js";
import { MIDDLEWARE_CONFIG } from "../generators/middlwares/index.js";
import { SERVER } from "../generators/server/index.js";
import { MODELS } from "../generators/models/index.js";
import { AUTH_CONFIG } from "../generators/auth/index.js";
import { SOCKETS_CONFIG } from "../generators/sockets/index.js";
import { VIEWS_CONFIG } from "../generators/views/index.js";

export const serverImports: ImportsIR = {
  ENV: SERVER.IMPORTS.ENV,
  EXPRESS: EXPRESS.imports,
  HELMET: MIDDLEWARE_CONFIG.HELMET.IMPORTS.helmetImport,
  CORS: MIDDLEWARE_CONFIG.CORS.IMPORTS.corsImport,
  MORGAN: MIDDLEWARE_CONFIG.MORGAN.IMPORTS.morganImport,
  PATH: SERVER.IMPORTS.PATH,
  HTTP: SERVER.IMPORTS.HTTP,
  SEQUELIZE: MODELS.SEQUELIZE.IMPORTS.SEQUELIZE,
  PASSPORT: AUTH_CONFIG.PASSPORT.IMPORTS.PASSPORT,
  EJS: VIEWS_CONFIG.EJS.IMPORTS,
  DATABASE: SERVER.IMPORTS.DATABASE,
  SOCKETIO: SOCKETS_CONFIG.SOCKETIO.IMPORTS.SOCKETIO,
  ROUTES: SERVER.IMPORTS.ROUTES,
};
export const serverConstructor: ConstructorDefinitionIR = {
  parameters: [
    // Define any parameters the constructor should take
  ],
  expressions: [
    SERVER.CONSTRUCTOR.initExpressInstance,
    SERVER.CONSTRUCTOR.initServerInstance,
    SERVER.CONSTRUCTOR.setPort,
    SERVER.CONSTRUCTOR.initializeMiddlewares,
    SERVER.CONSTRUCTOR.initalizeWebsockets,
    SERVER.CONSTRUCTOR.initializeRoutes,
    SERVER.CONSTRUCTOR.initializeErrorHandling,
    SERVER.CONSTRUCTOR.connectToDatabase,
  ],
};
export const middlewareMethodConfig: MethodDefinitionIR = {
  name: "initializeMiddlewares",
  parameters: [],
  returnType: "void",
  expressions: [
    MIDDLEWARE_CONFIG.HELMET.METHODS.helmetInit,
    MIDDLEWARE_CONFIG.CORS.METHODS.corsInit,
    MIDDLEWARE_CONFIG.MORGAN.METHODS.morganInit,
    MIDDLEWARE_CONFIG.EXPRESS.METHODS.jsonBodyInit,
    MIDDLEWARE_CONFIG.EXPRESS.METHODS.urlEncodeInit,
    MIDDLEWARE_CONFIG.EXPRESS.METHODS.setViewsDir,
    MIDDLEWARE_CONFIG.EXPRESS.METHODS.setViewEngine,
  ],
};
