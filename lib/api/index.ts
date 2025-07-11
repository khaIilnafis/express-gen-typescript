/**
 * Main library API export
 * This is the primary entry point for programmatic usage
 */

export * from "./express-generator-lib.js";
export * from "./types.js";
export * from "../schemas/index.js";

// Re-export key components for convenience
export { ExpressGeneratorLib as default } from "./express-generator-lib.js";
