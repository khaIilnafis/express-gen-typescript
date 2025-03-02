/**
 * User configuration options for the project generator
 */
export interface GeneratorOptions {
  projectName: string;
  destination: string;
  database: boolean;
  dialect?: string;
  databaseOrm?: string | null;
  databaseName?: string;
  authentication: boolean;
  authLib?: string | null;
  webSockets: boolean;
  websocketLib?: string | null;
  view: boolean;
  viewEngine?: string | null;
  skipPrompt?: boolean; // Flag to skip interactive prompts
  [key: string]: unknown;
}
