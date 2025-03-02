import path from "path";
import { PATHS } from "./index.js";
import { ServerFilePaths } from "../../types/paths/index.js";

export const SERVER = Object.freeze({
  FILE: "server.ts",
  TYPES: "server.d.ts",
  FILE_TEMPLATE: "server.ast.ts",
  TYPES_TEMPLATE: "server-types.ast.ts",
  FILE_LOC: (destination: string): string =>
    path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, SERVER.FILE),
  TYPES_LOC: (destination: string): string =>
    path.join(destination, PATHS.DIRECTORIES.ROOT.SRC, SERVER.TYPES),
  FILE_TEMPLATE_LOC: (): string =>
    `${PATHS.DIRECTORIES.ROOT.STRUCTURE}/${SERVER.FILE_TEMPLATE}`,
  TYPES_TEMPLATE_LOC: (): string =>
    `${PATHS.DIRECTORIES.ROOT.STRUCTURE}/${SERVER.TYPES_TEMPLATE}`,
} as const) satisfies ServerFilePaths;
