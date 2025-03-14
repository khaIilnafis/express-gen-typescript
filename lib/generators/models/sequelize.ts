import {
  ImportConfig,
  //   MethodExpressionIR,
  ImportsFromConfig,
  ExportConfig,
} from "../../types/index.js";

const sequelizeImports: ImportsFromConfig<{
  SEQUELIZE: ImportConfig;
}> = {
  SEQUELIZE: {
    NAME: "sequelize",
    DEFAULT: {
      SEQUELIZE: "sequelize",
    },
    NAMED: {},
  },
};
// const sequelizeInit: MethodExpressionIR = {

// };
const sequelizeExports: ExportConfig = {
  DEFAULT: {
    SEQUELIZE: "sequelize",
  },
  NAMED: {},
};
export const SEQUELIZE = Object.freeze({
  IMPORTS: sequelizeImports,
  //   INIT: sequelizeInit,
  EXPORTS: sequelizeExports,
});

// sequelize: Object.freeze({
// 	deps: Object.freeze({
// 	  sequelize: "^6.33.0",
// 	  pg: "^8.11.5",
// 	}),
// 	devDeps: Object.freeze({
// 	  "@types/sequelize": "^4.28.15",
// 	}),
//   }),
