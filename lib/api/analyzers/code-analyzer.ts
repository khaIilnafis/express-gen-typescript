/**
 * Code analyzer - analyzes existing TypeScript code
 */

import type { CodeAnalysis, GenerationContext } from "../types.js";

export class CodeAnalyzer {
  constructor(private context: GenerationContext) {}

  /**
   * Analyze TypeScript code and extract structure information
   */
  async analyze(code: string): Promise<CodeAnalysis> {
    // TODO: Implement comprehensive code analysis using TypeScript compiler API
    // For now, return a basic structure

    const lines = code.split("\n");
    const imports = this.extractImports(code);
    const exports = this.extractExports(code);
    const classes = this.extractClasses(code);
    const functions = this.extractFunctions(code);
    const variables = this.extractVariables(code);

    return {
      imports,
      exports,
      classes,
      functions,
      variables,
      dependencies: this.extractDependencies(imports),
      metrics: {
        totalLines: lines.length,
        linesOfCode: lines.filter(
          (line) => line.trim() && !line.trim().startsWith("//"),
        ).length,
        functionCount: functions.length,
        classCount: classes.length,
        importCount: imports.length,
        complexity: this.calculateComplexity(code),
      },
    };
  }

  /**
   * Extract import statements from code
   */
  private extractImports(code: string): CodeAnalysis["imports"] {
    const importRegex =
      /import\s+(?:(?:(\w+)(?:\s*,\s*)?)?(?:\{([^}]+)\})?(?:\s*,\s*(\w+))?)\s+from\s+['"]([^'"]+)['"]/g;
    const imports: CodeAnalysis["imports"] = [];
    let match;

    while ((match = importRegex.exec(code)) !== null) {
      const [, defaultImport, namedImports, namespaceImport, source] = match;

      if (defaultImport) {
        imports.push({
          source,
          imports: [defaultImport],
          type: "default",
          isTypeOnly: false,
        });
      }

      if (namedImports) {
        imports.push({
          source,
          imports: namedImports.split(",").map((imp) => imp.trim()),
          type: "named",
          isTypeOnly: false,
        });
      }

      if (namespaceImport) {
        imports.push({
          source,
          imports: [namespaceImport],
          type: "namespace",
          isTypeOnly: false,
        });
      }
    }

    return imports;
  }

  /**
   * Extract export statements from code
   */
  private extractExports(code: string): CodeAnalysis["exports"] {
    const exportRegex =
      /export\s+(?:(?:default\s+)?(?:class|function|const|let|var|interface|type)\s+(\w+)|(?:default\s+)?(\w+)|\{([^}]+)\})/g;
    const exports: CodeAnalysis["exports"] = [];
    let match;

    while ((match = exportRegex.exec(code)) !== null) {
      const [, namedExport, defaultExport, destructuredExports] = match;

      if (namedExport) {
        exports.push({
          name: namedExport,
          type: "named",
          isTypeOnly: false,
        });
      }

      if (defaultExport) {
        exports.push({
          name: defaultExport,
          type: "default",
          isTypeOnly: false,
        });
      }

      if (destructuredExports) {
        destructuredExports.split(",").forEach((exp) => {
          exports.push({
            name: exp.trim(),
            type: "named",
            isTypeOnly: false,
          });
        });
      }
    }

    return exports;
  }

  /**
   * Extract class definitions from code
   */
  private extractClasses(code: string): CodeAnalysis["classes"] {
    const classRegex =
      /class\s+(\w+)(?:\s+extends\s+(\w+))?(?:\s+implements\s+([^{]+))?\s*\{/g;
    const classes: CodeAnalysis["classes"] = [];
    let match;

    while ((match = classRegex.exec(code)) !== null) {
      const [, name, superClass, interfaces] = match;

      classes.push({
        name,
        superClass: superClass || undefined,
        interfaces: interfaces
          ? interfaces.split(",").map((iface) => iface.trim())
          : [],
        methods: [], // TODO: Extract methods
        properties: [], // TODO: Extract properties
        isExported:
          code.includes(`export class ${name}`) ||
          code.includes(`export default class ${name}`),
      });
    }

    return classes;
  }

  /**
   * Extract function definitions from code
   */
  private extractFunctions(code: string): CodeAnalysis["functions"] {
    const functionRegex =
      /(?:async\s+)?function\s+(\w+)\s*\(([^)]*)\)(?:\s*:\s*([^{]+))?\s*\{/g;
    const arrowFunctionRegex =
      /(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?\(([^)]*)\)(?:\s*:\s*([^=]+))?\s*=>/g;
    const functions: CodeAnalysis["functions"] = [];
    let match;

    // Regular functions
    while ((match = functionRegex.exec(code)) !== null) {
      const [, name, params, returnType] = match;

      functions.push({
        name,
        parameters: params ? params.split(",").map((p) => p.trim()) : [],
        returnType: returnType?.trim(),
        isAsync: code.includes(`async function ${name}`),
        isExported:
          code.includes(`export function ${name}`) ||
          code.includes(`export default function ${name}`),
      });
    }

    // Arrow functions
    while ((match = arrowFunctionRegex.exec(code)) !== null) {
      const [, name, params, returnType] = match;

      functions.push({
        name,
        parameters: params ? params.split(",").map((p) => p.trim()) : [],
        returnType: returnType?.trim(),
        isAsync: code.includes(`${name} = async (`),
        isExported:
          code.includes(`export const ${name}`) ||
          code.includes(`export let ${name}`),
      });
    }

    return functions;
  }

  /**
   * Extract variable declarations from code
   */
  private extractVariables(code: string): CodeAnalysis["variables"] {
    const variableRegex = /(?:const|let|var)\s+(\w+)(?:\s*:\s*([^=]+))?\s*=/g;
    const variables: CodeAnalysis["variables"] = [];
    let match;

    while ((match = variableRegex.exec(code)) !== null) {
      const [fullMatch, name, type] = match;

      variables.push({
        name,
        type: type?.trim(),
        isConstant: fullMatch.startsWith("const"),
        isExported:
          code.includes(`export const ${name}`) ||
          code.includes(`export let ${name}`) ||
          code.includes(`export var ${name}`),
      });
    }

    return variables;
  }

  /**
   * Extract dependencies from imports
   */
  private extractDependencies(imports: CodeAnalysis["imports"]): string[] {
    return [
      ...new Set(
        imports
          .map((imp) => imp.source)
          .filter((source) => !source.startsWith(".")),
      ),
    ];
  }

  /**
   * Calculate cyclomatic complexity (simplified)
   */
  private calculateComplexity(code: string): number {
    // Simple complexity calculation based on control flow statements
    const complexityKeywords = [
      "if",
      "else",
      "for",
      "while",
      "do",
      "switch",
      "case",
      "catch",
      "throw",
      "&&",
      "||",
      "?",
    ];
    let complexity = 1; // Base complexity

    complexityKeywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g");
      const matches = code.match(regex);
      if (matches) {
        complexity += matches.length;
      }
    });

    return complexity;
  }
}
