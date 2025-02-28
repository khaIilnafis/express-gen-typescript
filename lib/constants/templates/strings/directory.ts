/**
 * Type definition for directory descriptions
 */
export interface DirectoryDescriptions {
	WEBSOCKETS: string;
	VIEWS: string;
  }
  /**
 * Constants for directory descriptions in README
 */
export const DIRECTORY_DESCRIPTIONS = Object.freeze({
	WEBSOCKETS: "# WebSocket handlers",
	VIEWS: "# View templates",
  } as const) satisfies DirectoryDescriptions;