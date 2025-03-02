import { DirectoryDescriptions } from "../../types/strings/index.js";

/**
 * Constants for directory descriptions in README
 */
export const DIRECTORY_DESCRIPTIONS = Object.freeze({
  WEBSOCKETS: "# WebSocket handlers",
  VIEWS: "# View templates",
} as const) satisfies DirectoryDescriptions;
