// @ts-nocheck - Template file, not meant to be validated directly
import { PrismaClient } from "@prisma/client";

// Create a singleton PrismaClient instance
const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

export default prisma;
