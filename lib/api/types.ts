/**
 * Library API types
 */
import type { z } from "zod";

/**
 * Generated code result
 */
export interface GeneratedCode {
  /** The generated code content */
  code: string;
  /** File path where the code should be written */
  filePath: string;
  /** Whether the code should be formatted */
  shouldFormat?: boolean;
  /** Dependencies that should be installed */
  dependencies?: string[];
  /** Dev dependencies that should be installed */
  devDependencies?: string[];
  /** Import statements used in the code */
  imports?: string[];
  /** Export statements in the code */
  exports?: string[];
}

/**
 * Generated project result
 */
export interface GeneratedProject {
  /** Project name */
  name: string;
  /** Project root path */
  path: string;
  /** Generated files */
  files: GeneratedCode[];
  /** Dependencies to install */
  dependencies: string[];
  /** Dev dependencies to install */
  devDependencies: string[];
  /** Scripts to add to package.json */
  scripts?: Record<string, string>;
  /** Configuration files */
  configs?: Record<string, unknown>;
}

/**
 * Library configuration
 */
export interface LibraryConfig {
  /** Output format */
  format?: "typescript" | "javascript";
  /** Target ES version */
  target?: string;
  /** Whether to format generated code */
  autoFormat?: boolean;
  /** Custom template directory */
  templateDir?: string;
  /** Plugin directories */
  pluginDirs?: string[];
  /** Verbose logging */
  verbose?: boolean;
}

/**
 * Generation context
 */
export interface GenerationContext {
  /** Current working directory */
  cwd: string;
  /** Output directory */
  outputDir: string;
  /** Library configuration */
  config: LibraryConfig;
  /** Available plugins */
  plugins: Map<string, unknown>;
  /** Template cache */
  templateCache: Map<string, string>;
}

/**
 * Code analysis result
 */
export interface CodeAnalysis {
  /** Import statements */
  imports: ImportAnalysis[];
  /** Export statements */
  exports: ExportAnalysis[];
  /** Class definitions */
  classes: ClassAnalysis[];
  /** Function definitions */
  functions: FunctionAnalysis[];
  /** Variable declarations */
  variables: VariableAnalysis[];
  /** Dependencies used */
  dependencies: string[];
  /** Code metrics */
  metrics: CodeMetrics;
}

/**
 * Import analysis
 */
export interface ImportAnalysis {
  /** Source module */
  source: string;
  /** Imported identifiers */
  imports: string[];
  /** Import type (default, named, namespace) */
  type: "default" | "named" | "namespace";
  /** Whether it's a type-only import */
  isTypeOnly: boolean;
}

/**
 * Export analysis
 */
export interface ExportAnalysis {
  /** Exported identifier */
  name: string;
  /** Export type */
  type: "default" | "named" | "namespace";
  /** Whether it's a type-only export */
  isTypeOnly: boolean;
}

/**
 * Class analysis
 */
export interface ClassAnalysis {
  /** Class name */
  name: string;
  /** Super class */
  superClass?: string;
  /** Implemented interfaces */
  interfaces: string[];
  /** Class methods */
  methods: string[];
  /** Class properties */
  properties: string[];
  /** Whether it's exported */
  isExported: boolean;
}

/**
 * Function analysis
 */
export interface FunctionAnalysis {
  /** Function name */
  name: string;
  /** Parameters */
  parameters: string[];
  /** Return type */
  returnType?: string;
  /** Whether it's async */
  isAsync: boolean;
  /** Whether it's exported */
  isExported: boolean;
}

/**
 * Variable analysis
 */
export interface VariableAnalysis {
  /** Variable name */
  name: string;
  /** Variable type */
  type?: string;
  /** Whether it's constant */
  isConstant: boolean;
  /** Whether it's exported */
  isExported: boolean;
}

/**
 * Code metrics
 */
export interface CodeMetrics {
  /** Total lines of code */
  totalLines: number;
  /** Lines of code (excluding comments and blank lines) */
  linesOfCode: number;
  /** Number of functions */
  functionCount: number;
  /** Number of classes */
  classCount: number;
  /** Number of imports */
  importCount: number;
  /** Cyclomatic complexity */
  complexity: number;
}

/**
 * Project preview
 */
export interface ProjectPreview {
  /** Project structure */
  structure: FileTreeNode[];
  /** Generated files count */
  fileCount: number;
  /** Dependencies to be installed */
  dependencies: string[];
  /** Dev dependencies to be installed */
  devDependencies: string[];
  /** Estimated generation time */
  estimatedTime: number;
}

/**
 * File tree node
 */
export interface FileTreeNode {
  /** File/directory name */
  name: string;
  /** Whether it's a directory */
  isDirectory: boolean;
  /** Child nodes (if directory) */
  children?: FileTreeNode[];
  /** File size (if file) */
  size?: number;
  /** File type */
  type?: string;
}

// ValidationResult is exported from schemas/validation.ts
// No need to re-export here to avoid conflicts
