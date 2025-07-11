/**
 * Validation utilities and helpers
 */
import { z } from "zod";
// Express types will be available when express is installed
// For now, we'll use any for the middleware functions
// import type { Request, Response, NextFunction } from 'express';

/**
 * Validation result type
 */
export interface ValidationResult<T = unknown> {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
}

/**
 * Validation error formatter
 */
export function formatValidationError(error: z.ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ");
}

/**
 * Safe validation function
 */
export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): ValidationResult<T> {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  } else {
    return {
      success: false,
      errors: result.error,
    };
  }
}

/**
 * Validation middleware for Express
 */
export function validateBody<T>(schema: z.ZodSchema<T>) {
  return (req: any, res: any, next: any) => {
    const result = safeValidate(schema, req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formatValidationError(result.errors!),
      });
    }

    req.body = result.data;
    next();
  };
}

/**
 * Validation middleware for query parameters
 */
export function validateQuery<T>(schema: z.ZodSchema<T>) {
  return (req: any, res: any, next: any) => {
    const result = safeValidate(schema, req.query);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Query validation failed",
        errors: formatValidationError(result.errors!),
      });
    }

    req.query = result.data;
    next();
  };
}

/**
 * Validation middleware for route parameters
 */
export function validateParams<T>(schema: z.ZodSchema<T>) {
  return (req: any, res: any, next: any) => {
    const result = safeValidate(schema, req.params);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Parameter validation failed",
        errors: formatValidationError(result.errors!),
      });
    }

    req.params = result.data;
    next();
  };
}

/**
 * Configuration validation helper
 */
export function validateConfiguration<T>(
  schema: z.ZodSchema<T>,
  config: unknown,
  configSource: string = "configuration",
): T {
  const result = safeValidate(schema, config);

  if (!result.success) {
    throw new Error(
      `Invalid ${configSource}: ${formatValidationError(result.errors!)}`,
    );
  }

  return result.data!;
}
