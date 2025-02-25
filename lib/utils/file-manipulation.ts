/**
 * File manipulation utilities
 */

import fs from "fs";
import path from "path";
import { ERRORS } from "../constants/index.js";

/**
 * File section markers for locating insertion points
 */
export const FILE_MARKERS = Object.freeze({
  SERVER: {
    IMPORTS: "// Imports",
    DATABASE_CONNECTION: "// Database connection methods",
    ROUTES: "// Configure routes",
    MIDDLEWARE: "// Configure middleware",
  },

  ENV: {
    DATABASE: "# Database Configuration",
    AUTH: "# Authentication",
    APP: "# App Configuration",
  },
});

/**
 * Insert content into a file at a specified marker
 * @param filePath - Path to the file
 * @param marker - Marker string to find in file
 * @param content - Content to insert
 * @param position - Position to insert content (before or after marker)
 * @returns True if insertion successful, false otherwise
 */
export function insertContentAtMarker(
  filePath: string,
  marker: string,
  content: string,
  position: "before" | "after" = "after"
): boolean {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return false;
    }

    let fileContent = fs.readFileSync(filePath, "utf8");
    const markerPosition = fileContent.indexOf(marker);

    if (markerPosition === -1) {
      console.error(`Marker "${marker}" not found in file: ${filePath}`);
      return false;
    }

    let insertPosition: number;
    if (position === "before") {
      insertPosition = markerPosition;
    } else {
      // 'after'
      insertPosition = markerPosition + marker.length;
    }

    // Insert content at the calculated position
    const newContent =
      fileContent.substring(0, insertPosition) +
      "\n" +
      content +
      "\n" +
      fileContent.substring(insertPosition);

    fs.writeFileSync(filePath, newContent);
    return true;
  } catch (error) {
    console.error(`Error inserting content at marker: ${error}`);
    return false;
  }
}

/**
 * Replace content between markers in a file
 * @param filePath - Path to the file
 * @param startMarker - Start marker string
 * @param endMarker - End marker string
 * @param newContent - New content to insert
 * @returns True if replacement successful, false otherwise
 */
export function replaceContentBetweenMarkers(
  filePath: string,
  startMarker: string,
  endMarker: string,
  newContent: string
): boolean {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return false;
    }

    let fileContent = fs.readFileSync(filePath, "utf8");
    const startPosition = fileContent.indexOf(startMarker);
    const endPosition = fileContent.indexOf(endMarker);

    if (
      startPosition === -1 ||
      endPosition === -1 ||
      startPosition >= endPosition
    ) {
      console.error(
        `Markers not found or invalid positions in file: ${filePath}`
      );
      return false;
    }

    // Calculate insertion positions (including the markers themselves)
    const insertStartPosition = startPosition + startMarker.length;

    // Replace content between markers
    const newFileContent =
      fileContent.substring(0, insertStartPosition) +
      "\n" +
      newContent +
      "\n" +
      fileContent.substring(endPosition);

    fs.writeFileSync(filePath, newFileContent);
    return true;
  } catch (error) {
    console.error(`Error replacing content between markers: ${error}`);
    return false;
  }
}

/**
 * Add import statement to a file if it doesn't already exist
 * @param filePath - Path to the file
 * @param importStatement - Import statement to add
 * @returns True if import added or already exists, false on error
 */
export function addImportIfNotExists(
  filePath: string,
  importStatement: string
): boolean {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return false;
    }

    let fileContent = fs.readFileSync(filePath, "utf8");

    // Check if import already exists
    if (fileContent.includes(importStatement)) {
      return true; // Already exists, nothing to do
    }

    // Find the last import statement to add after it
    const importRegex = /^import .+;?\s*$/gm;
    let match;
    let lastImportPosition = 0;

    while ((match = importRegex.exec(fileContent)) !== null) {
      lastImportPosition = match.index + match[0].length;
    }

    // Insert after the last import
    if (lastImportPosition > 0) {
      const newContent =
        fileContent.substring(0, lastImportPosition) +
        "\n" +
        importStatement +
        "\n" +
        fileContent.substring(lastImportPosition);

      fs.writeFileSync(filePath, newContent);
      return true;
    } else {
      // No existing imports, add at the beginning
      const newContent = importStatement + "\n\n" + fileContent;
      fs.writeFileSync(filePath, newContent);
      return true;
    }
  } catch (error) {
    console.error(`Error adding import: ${error}`);
    return false;
  }
}

/**
 * Create a directory if it doesn't exist
 * @param dirPath - Path to create
 * @returns True if created or already exists, false on error
 */
export function ensureDirectoryExists(dirPath: string): boolean {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      return true;
    }
    return true; // Already exists
  } catch (error) {
    console.error(`Error creating directory: ${error}`);
    return false;
  }
}

/**
 * Update configuration in package.json
 * @param projectPath - Path to the project
 * @param updates - Object with updates to apply
 * @returns True if successful, false otherwise
 */
export function updatePackageJson(
  projectPath: string,
  updates: Record<string, any>
): boolean {
  try {
    const packageJsonPath = path.join(projectPath, "package.json");

    if (!fs.existsSync(packageJsonPath)) {
      console.error("package.json not found");
      return false;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    // Apply updates
    for (const [key, value] of Object.entries(updates)) {
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        packageJson[key] = { ...packageJson[key], ...value };
      } else {
        packageJson[key] = value;
      }
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    return true;
  } catch (error) {
    console.error(`Error updating package.json: ${error}`);
    return false;
  }
}
