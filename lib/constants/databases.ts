/**
 * Database-related constants
 */
export const DATABASES = Object.freeze({
  TYPES: {
    NONE: "none",
    SEQUELIZE: "sequelize",
    TYPEORM: "typeorm",
    PRISMA: "prisma",
    MONGOOSE: "mongoose",
  },

  DIALECTS: {
    POSTGRES: "postgres",
    MYSQL: "mysql",
    SQLITE: "sqlite",
    MARIADB: "mariadb",
    MSSQL: "mssql",
    MONGODB: "mongodb",
  },

  // Default connection configurations
  DEFAULTS: {
    MONGODB: {
      HOST: "localhost",
      PORT: "27017",
      DEFAULT_DB_NAME: "myapp",
      URI: (dbName: string) => `mongodb://localhost:27017/${dbName}`,
    },
    POSTGRES: {
      HOST: "localhost",
      PORT: "5432",
      DEFAULT_DB_NAME: "mydb",
      USER: "postgres",
      PASSWORD: "postgres",
      URI: (dbName: string) =>
        `postgresql://postgres:postgres@localhost:5432/${dbName}?schema=public`,
    },
    MYSQL: {
      HOST: "localhost",
      PORT: "3306",
      DEFAULT_DB_NAME: "mydb",
      USER: "root",
      PASSWORD: "",
    },
  },
});
