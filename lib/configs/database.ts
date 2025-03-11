export const databaseConfig = {
  example: {
    imports: {
      SEQUELIZE: {
        NAME: "sequelize",
        DEFAULT: {},
        NAMED: {
          SEQUELIZE: "Sequelize",
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
        SEQUELIZE: "sequelize",
      },
      NAMED: {},
    },
  },
};
