import { CommonFilePaths } from "../../types/paths/index.js";

export const COMMON = Object.freeze({
  NAMES: {
    EXAMPLE: "Example",
    CONNECTION: "index",
  },
} as const) satisfies CommonFilePaths;
