# Project Setup Guide

This document provides instructions for setting up the Express Generator for TypeScript project for development.

## Prerequisites

- Node.js (>= 14.0.0)
- Yarn (>= 4.6.0)
- Git

## Development Workflow

### Running the project

```bash

# Build and run for testing
yarn build
yarn start
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

### Grunt Tasks

The project uses Grunt for automated tasks:

- **Version Bumping**:
  ```bash
  grunt bump
  ```
  This interactive task will:
  - Ask if you want to bump the version
  - Ask what files should have the version updated
  - Handle version updates, Git tagging, and pushing

## Project Structure

- `/bin`: CLI entry point for the generator
- `/lib`: Core generator code
  - `/constants`: Constants and configuration values
  - `/setup`: Setup modules for different parts of the generated application
  - `/templates`: Template files used for code generation
  - `/utils`: Utility functions for the generator
- `/dist`: Compiled JavaScript output (generated during build)

## Troubleshooting

### ESLint Issues with Gruntfile.cjs

If you encounter ESLint errors with the Gruntfile.cjs, ensure that the `eslint.config.js` includes the proper configuration for CommonJS files:

```javascript
{
  files: ["**/*.cjs", "Gruntfile.cjs"],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.commonjs,
    },
  },
}
```
