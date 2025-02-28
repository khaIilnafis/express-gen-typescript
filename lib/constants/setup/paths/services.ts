export interface ServicesFilePaths {
	INDEX: string;
	INDEX_TEMPLATE: string;
};

export const SERVICES = Object.freeze({
	INDEX: "index.ts",
	INDEX_TEMPLATE: "index.ast.ts"
  }as const) satisfies ServicesFilePaths;