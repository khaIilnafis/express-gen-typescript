/**
 * Interface for standardized environment configuration
 */
export type EnvConfig = {
  PORT: number;
  NODE_ENV: string;
  LOG_LEVEL: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow additional properties
};
// Generic type for a single library's config.
export type ImportConfig = {
  NAME: string;
  DEFAULT: Record<string, string>;
  NAMED: Record<string, string | string[]>;
};

// Mapped type that converts a LibraryConfig into an ImportLibrary-like type.
export type DerivedImportLibrary<T extends ImportConfig> = {
  NAME: T["NAME"];
  DEFAULT: { [K in keyof T["DEFAULT"]]: string };
  NAMED: { [K in keyof T["NAMED"]]: string | string[] };
};

// Map over entire import configuration object.
export type ImportsFromConfig<T extends Record<string, ImportConfig>> = {
  [K in keyof T]: DerivedImportLibrary<T[K]>;
};
export type ExportConfig = {
  DEFAULT: Record<string, string>;
  NAMED: Record<string, string>;
};

// Mapped type that converts a LibraryConfig into an ExportLibrary-like type.
export type ExportsFromConfig<T extends ExportConfig> = {
  DEFAULT: { [K in keyof T["DEFAULT"]]: string };
  NAMED: { [K in keyof T["NAMED"]]: string };
};

export enum CALLEES {
  THIS,
  NEW,
  BIND,
}

export type ConstructorItem = {
  METHOD: string;
  CALLER: string;
  CALLE: CALLEES;
};
// Mapped type that converts a ConstructorItem into an ConstructorConfig type.
export type ConstructorFromConfig<T extends Record<string, ConstructorItem>> = {
  [K in keyof T]: ConstructorItem;
};

export type ParameterIR = {
  name: string;
  type?: string; // e.g. "string", "number", etc.
  isOptional?: boolean; // flag to denote optional parameters
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any; // can be used to later attach default value handling
};

export type ConstructorDefinitionIR = {
  parameters: ParameterIR[];
  expressions: MethodExpressionIR[];
};

// Type for method call arguments
export type MethodArgumentIR = {
  type:
    | "literal"
    | "identifier"
    | "function_call"
    | "object"
    | "property_access"
    | "logical_expression";
  value?: string | number | boolean | null;
  properties?: Record<string, MethodArgumentIR>; // For objects
  arguments?: MethodArgumentIR[]; // For nested function calls
  target?: string; // For property access (e.g., path.join)
  property?: string; // For property access (e.g., path.join)
  operator?: "||" | "&&"; // For logical expressions
  left?: MethodArgumentIR; // Left side of logical expression
  right?: MethodArgumentIR; // Right side of logical expression
};

// Type for method expression (e.g., this.app.use(helmet()))
export type MethodExpressionIR = {
  //   expressionType: "assignment" | "method_call" | "function_call";
  target: {
    object: string; // e.g., "this"
    property: string; // e.g., "app"
  };
  method: string; // e.g., "use" or "set"
  arguments: MethodArgumentIR[];
};

export type MethodDefinitionIR = {
  name: string;
  parameters: ParameterIR[];
  returnType?: string;
  expressions: MethodExpressionIR[];
  comment?: string;
};

export type ImportsIR = {
  [key: string]: ImportConfig;
};

type DependencyConfig = {
  name: string;
  version: string;
};

export type DependencyIR = {
  BASE?: DependencyConfig;
  BASE_DEV?: DependencyConfig;
  FEATURE?: DependencyConfig;
  FEATURE_DEV?: DependencyConfig;
};

export type MiddlewareConfig<
  M extends Record<string, MethodExpressionIR> = Record<
    string,
    MethodExpressionIR
  >,
  I extends Record<string, ImportConfig> = Record<string, ImportConfig>,
> = {
  IMPORTS: I;
  DEPS: DependencyIR;
  METHODS: M;
};
