/**
 * User configuration options for the project generator
 */
export interface GeneratorOptions {
  projectName: string;
  destination: string;
  framework: "express" | "koa" | "hapi" | "fastify";
  database: boolean;
  dialect?: string;
  customSpec?: boolean;
  databaseOrm?: string | null;
  databaseName?: string;
  authentication: boolean;
  authLib?: string | null;
  webSockets: boolean;
  websocketLib?: string | null;
  view: boolean;
  viewEngine?: string | null;
  skipPrompt?: boolean; // Flag to skip interactive prompts
  logger: string;
  [key: string]: unknown;
}
