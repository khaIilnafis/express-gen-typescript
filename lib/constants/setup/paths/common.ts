export interface CommonFilePaths {
	  NAMES: {
		  EXAMPLE: string;
		  CONNECTION: string;
	  };
  };

  export const COMMON = Object.freeze({
	  NAMES: {
		  EXAMPLE: "Example",
		  CONNECTION: "index",
	  },
  }as const) satisfies CommonFilePaths;