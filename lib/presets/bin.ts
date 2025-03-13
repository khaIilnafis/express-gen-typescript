import { ImportsIR, MethodDefinitionIR } from "../types/index.js";
import { BIN_CONFIG } from "../generators/bin/index.js";

// Define the bin/www imports
const binImports: ImportsIR = {
  SERVER: BIN_CONFIG.IMPORTS.SERVER,
};

// Define the normalizePort function
const normalizePort: MethodDefinitionIR = BIN_CONFIG.NORMALIZE_PORT;

// Define the port declaration expression
const portDeclaration = BIN_CONFIG.PORT_DECLARATION;

// Define the server declaration expression
const serverDeclaration = BIN_CONFIG.SERVER_DECLARATION;

// Define the listen statement expression
const listenStatement = BIN_CONFIG.LISTEN_STATEMENT;

export const BIN = {
  IMPORTS: binImports,
  NORMALIZE_PORT: normalizePort,
  PORT_DECLARATION: portDeclaration,
  SERVER_DECLARATION: serverDeclaration,
  LISTEN_STATEMENT: listenStatement,
  COMMENTS: BIN_CONFIG.COMMENTS,
};
