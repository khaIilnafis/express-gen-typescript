interface Dependencies {
  [key: string]: string;
}

interface FeatureDependencySet {
  deps: Dependencies;
  devDeps: Dependencies;
}

interface CategoryFeatures {
  [featureName: string]: FeatureDependencySet;
}

interface FeatureDependencies {
  [category: string]: CategoryFeatures;
}

interface DependencyStructure {
  BASE_DEPENDENCIES: Dependencies;
  BASE_DEV_DEPENDENCIES: Dependencies;
  FEATURE_DEPENDENCIES: FeatureDependencies;
}

export {
  Dependencies,
  FeatureDependencies,
  CategoryFeatures,
  FeatureDependencySet,
  DependencyStructure,
};
