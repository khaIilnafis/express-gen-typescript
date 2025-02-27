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
import { TEMPLATE_STRINGS } from './strings.js';
import { SERVICES } from './services.js';
import { MODELS } from './models.js';
import { SERVER_COMMENTS, CONTROLLER_COMMENTS } from './comments.js';

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
  STRINGS: typeof TEMPLATE_STRINGS;
  SERVICES: typeof SERVICES;
  MODELS: typeof MODELS;
  SERVER_COMMENTS: typeof SERVER_COMMENTS;
  CONTROLLER_COMMENTS: typeof CONTROLLER_COMMENTS;
}

// Re-export individual template constants
export { BASE, ROUTES, CONTROLLERS, PROJECT_STRUCTURE, DATABASE, VIEWS, WEBSOCKETS, TEMPLATE_STRINGS, SERVICES, MODELS, SERVER_COMMENTS, CONTROLLER_COMMENTS };

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
  STRINGS: TEMPLATE_STRINGS,
  SERVICES,
  MODELS,
  SERVER_COMMENTS,
  CONTROLLER_COMMENTS
} as const) satisfies TemplateStructure; 