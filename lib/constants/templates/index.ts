/**
 * Templates domain constants
 * Organizes and exports template-related constants
 */
import {AUTH} from "./auth.js";
import { BASE } from './base.js';
import { ROUTES } from './routes.js';
import { CONTROLLERS } from './controllers.js';
import { PROJECT_STRUCTURE } from './project-structure.js';
import { DATABASE } from './database.js';
import { VIEWS } from './views.js';
import { WEBSOCKETS } from './websockets.js';

/**
 * Type definition for template structure
 */
export interface TemplateStructure {
	AUTH: typeof AUTH;
  BASE: typeof BASE;
  ROUTES: typeof ROUTES;
  CONTROLLERS: typeof CONTROLLERS;
  PROJECT_STRUCTURE: typeof PROJECT_STRUCTURE;
  DATABASE: typeof DATABASE;
  VIEWS: typeof VIEWS;
  WEBSOCKETS: typeof WEBSOCKETS;
}

// Re-export individual template constants
export { BASE, ROUTES, CONTROLLERS, PROJECT_STRUCTURE, DATABASE, VIEWS, WEBSOCKETS };

/**
 * Combined template constants
 */
export const TEMPLATES = Object.freeze({
	AUTH,
  BASE,
  ROUTES,
  CONTROLLERS,
  PROJECT_STRUCTURE,
  DATABASE,
  VIEWS,
  WEBSOCKETS,
} as const) satisfies TemplateStructure; 