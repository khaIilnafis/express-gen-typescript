/**
 * Dependencies domain constants index
 * Re-exports all dependency-related constants
 */
import { DependencyStructure } from "../../types/dependencies/index.js";
import {
  BASE_DEPENDENCIES,
  BASE_DEV_DEPENDENCIES,
  FEATURE_DEPENDENCIES,
} from "./dependencies.js";

export const DEPENDENCIES: DependencyStructure = Object.freeze({
  BASE_DEPENDENCIES,
  BASE_DEV_DEPENDENCIES,
  FEATURE_DEPENDENCIES,
} as const) satisfies DependencyStructure;
