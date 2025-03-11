export const modelsConfig = {
  module: {
    imports: {
      MODEL: {
        NAME: "./example",
        DEFAULT: {},
        NAMED: {
          EXAMPLE: "Example",
        },
      },
    },
    exports: {
      DEFAULT: {},
      NAMED: {
        EXAMPLE: "Example",
      },
    },
  },
  example: {
    imports: {
      SEQUELIZE: {
        NAME: "sequelize",
        DEFAULT: {},
        NAMED: {
          DATATYPES: "DataTypes",
        },
      },
      DATABASE: {
        NAME: "../database",
        DEFAULT: {
          SEQUELIZE: "sequelize",
        },
        NAMED: {},
      },
    },
    exports: {
      DEFAULT: {
        EXAMPLE: "Example",
      },
      NAMED: {},
    },
  },
};
