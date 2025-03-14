# Project Setup Guide

This document provides instructions for setting up the Express Generator for TypeScript project for development.

## Prerequisites

- Node.js (>= 14.0.0)
- Yarn (>= 4.6.0)
- Git

## Development Workflow

To contribute to the express-generator-typescript itself:

```bash
# Clone the repository
git clone https://github.com/khalilnafis/express-gen-typescript.git

# Install dependencies
cd express-gen-typescript
yarn
yarn prepare

# Build the generator
yarn build

# Watch for changes and rebuild
yarn dev
```

### Git Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit`)
4. Push to the branch (`git push`)
5. Open a Pull Request

This project uses Husky to enforce code quality and consistent commits. When you execute git commands the following hooks will automatically fire:

1. **Pre-commit Hook**:

   - Runs `lint-staged` to format code using Prettier before committing

2. **Prepare-commit-msg Hook**:

   - Runs Commitizen (`cz`) to guide you through creating conventional commit messages
   - Follow the interactive prompts to create standardized commit messages

3. **Pre-push Hook**:
   - Runs `grunt bump` before pushing to prompt for version bumping
   - This allows you to manage versioning easily when pushing code

## Architecture Overview

The project follows a configuration-driven architecture for generating Express.js applications with TypeScript. The codebase is organized into several key components:

### Key Components

1. **Presets**: High-level configurations that define what features to include in generated applications. These are user-facing and customizable.

2. **Generators**: Internal implementation details that define how to generate specific parts of code. These are only modified by project contributors.

3. **Builders**: Utility functions that convert configurations into actual AST nodes for code generation.

4. **Types**: Type definitions that ensure type safety across the codebase.

### Processing Flow

1. User selects or customizes a preset
2. The generator uses this preset to determine what to generate
3. The generator calls the appropriate generators for each component
4. The generators use builders to construct AST nodes
5. The AST nodes are written to files in the target directory

## Project Structure

- `/bin`: CLI entry point for the generator
- `/lib`: Core generator code
  - `/configs`: Template configurations, dynamically express generated application features
  - `/setup`: Setup modules for different parts of the generated application
  - `/templates`: Template files used for code generation
  - `/presets`: User-customizable configurations for generated applications
  - `/generators`: Internal implementation details for code generation
    - `/server`: Server code generators
    - `/auth`: Authentication code generators
    - `/database`: Database code generators
    - And other feature-specific generators
  - `/builders`: AST construction utilities
  - `/utils`: Utility functions for the generator
  - `/types`: Type definitions
- `/dist`: Compiled JavaScript output (generated during build)

## Contributing Guidelines

### Adding New Features

To add support for a new library or feature:

1. Create appropriate generator modules in `/lib/generators/[feature-name]/`
2. Update or create preset configurations in `/lib/presets/`
3. Add necessary types in `/lib/types/`
4. Update CLI prompts in `/lib/prompt.ts` if needed

### Modifying Existing Features

When modifying existing features:

1. Update the relevant generator files
2. Ensure backward compatibility with existing presets
3. Add tests to verify your changes

### Naming Conventions

- **Presets**: Use descriptive names like `default.ts`, `minimal.ts`, or `full-stack.ts`
- **Generators**: Organize by feature (e.g., `server`, `auth`, `database`)
- **Files**: Use kebab-case for filenames
- **Variables/Functions**: Use camelCase
- **Types/Interfaces**: Use PascalCase
