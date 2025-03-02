/**
 * Type definition for server type declarations
 */
export interface ServerTypeDeclarations {
  BASE_IMPORTS: string;
  INTERFACE_PROPERTIES: {
    PRISMA: string;
    SOCKETIO: string;
    WS: string;
  };
  AUTH_NAMESPACE: string;
  BASE_INTERFACE: string;
  INTERFACE_CLOSING: string;
  ENVIRONMENT_VARIABLES: {
    BASE: string;
    DATABASE: {
      SEQUELIZE: string;
      MONGOOSE: string;
      PRISMA: string;
      TYPEORM: string;
    };
    AUTH: string;
  };
  GLOBAL_DECLARATIONS: string;
}
