import { ServicesFilePaths } from "../../types/paths/index.js";

export const SERVICES = Object.freeze({
  INDEX: "index.ts",
  INDEX_TEMPLATE: "index.ast.ts",
} as const) satisfies ServicesFilePaths;
