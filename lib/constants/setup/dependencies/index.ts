/**
 * Dependencies domain constants index
 * Re-exports all dependency-related constants
 */
import { BASE_DEPENDENCIES, BASE_DEV_DEPENDENCIES, FEATURE_DEPENDENCIES, Dependencies, FeatureDependencies } from "./dependencies.js";

export interface DependencyStructure {
	BASE_DEPENDENCIES: Dependencies;
	BASE_DEV_DEPENDENCIES: Dependencies;
	FEATURE_DEPENDENCIES: FeatureDependencies;
}
export const DEPENDENCIES: DependencyStructure = Object.freeze({
	BASE_DEPENDENCIES,
	BASE_DEV_DEPENDENCIES,
	FEATURE_DEPENDENCIES
}as const) satisfies DependencyStructure;