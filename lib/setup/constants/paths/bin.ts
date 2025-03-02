import path from "path";
import { PATHS } from "./index.js";
import { BINFilePaths } from "../../types/paths/index.js";

export const BIN = Object.freeze({
  SERVER: "www.ts",
  SERVER_TEMPLATE: "www.ast.ts",
  SERVER_LOC: (destination: string): string =>
    path.join(destination, PATHS.DIRECTORIES.ROOT.BIN, BIN.SERVER),
  SERVER_TEMPLATE_LOC: (): string =>
    `${PATHS.DIRECTORIES.ROOT.STRUCTURE}/${PATHS.DIRECTORIES.ROOT.BIN}/${BIN.SERVER_TEMPLATE}`,
} as const) satisfies BINFilePaths;
