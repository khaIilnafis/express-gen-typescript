# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

- `yarn build` - Build the project (TypeScript compilation + copy templates)
- `yarn dev` - Development mode with hot reloading and template copying
- `yarn start` - Run the built CLI tool
- `yarn test` - Run tests (currently placeholder)

### Template Management

- `yarn copy-templates` - Copy template files to dist directory (excludes .ts files)

### Usage

- `npx express-generator-typescript [project-name]` - Generate a new project
- `node dist/bin/cli.js --help` - View CLI options
- `node dist/bin/cli.js --skipPrompt --projectName test-app` - Skip interactive prompts

## Architecture Overview

This is a TypeScript-based Express application generator that creates full-featured Express applications with TypeScript support. The project is actively transitioning from a legacy system to a modern spec-based architecture.

### **Current Transition Status**

- **Branch**: `feat/spec-generator-pipeline`
- **Phase**: Foundation implementation (60% complete)
- **Status**: Server generator functional, component generators in development
- **Documentation**: See `SPEC_TRANSITION_ASSESSMENT.md` and `SPEC_TRANSITION_PLAN.md`

### Core Architecture Components

1. **Specs**: Define what needs to be generated (declarative)

   - Located in `lib/specs/`
   - Convert user options into standardized specifications
   - Key files: `types.ts`, `server.ts`, `project/factory.ts`
   - **Status**: 80% complete, server specs fully implemented

2. **Presets**: Define configurations for generation

   - Located in `lib/presets/`
   - Contain default configurations and feature-specific settings
   - Factory pattern: `factory.ts` creates presets from specs
   - **Status**: 60% complete, server presets implemented, component presets are placeholders

3. **Generators**: Execute the actual code generation

   - Located in `lib/generators/`
   - Use specs and presets to generate AST nodes and files
   - Each component (server, database, auth, etc.) has its own generator
   - **Status**: 40% complete, server generator functional, component generators need implementation

4. **Builders**: Create Abstract Syntax Tree (AST) nodes
   - Located in `lib/utils/builders/`
   - Low-level utilities for generating TypeScript code
   - Handle imports, exports, methods, properties, etc.
   - **Status**: 70% complete, core builders implemented

### Execution Flow

1. **CLI Entry** (`bin/cli.ts`) - Parse args and collect user options
2. **Prompts** (`lib/prompt.ts`) - Interactive configuration gathering
3. **Spec Creation** (`lib/specs/project/factory.ts`) - Convert options to specs
4. **Preset Selection** (`lib/presets/factory.ts`) - Determine configurations
5. **Code Generation** - Generators create files using builders
6. **File Output** - Write generated code to destination

### Legacy vs New System

- **Legacy**: `lib/index.ts` - Direct generation approach (still default)
- **New**: `lib/new-index.ts` - Spec-based generation (in active development)
- **Status**: Dual system currently, gradual migration planned

### **Critical Gaps**

1. **Component Generators**: Database, Auth, WebSocket, View generators are placeholder implementations
2. **CLI Integration**: New system not integrated with main CLI flow
3. **Testing**: No comprehensive test suite for new system
4. **Legacy Dependencies**: New system still depends on legacy template constants

## Key Files and Directories

### Entry Points

- `bin/cli.ts` - Main CLI entry point
- `lib/index.ts` - Legacy generator entry point
- `lib/new-index.ts` - New spec-based generator entry point

### Generation Components

- `lib/generators/` - Code generation logic for each component
- `lib/presets/` - Configuration presets and defaults
- `lib/specs/` - Specification definitions and factories
- `lib/templates/` - Template files and AST definitions

### Utilities

- `lib/utils/builders/` - AST node creation utilities
- `lib/utils/config/` - Configuration helpers
- `lib/utils/templates/` - Template processing utilities

## Development Notes

### Code Style

- TypeScript with strict typing (avoid `any`)
- PascalCase for classes, camelCase for functions/variables
- kebab-case for files/directories
- Prefer Zod schemas for type definitions
- Use `import type` for type-only imports

### Template System

- **Legacy**: Templates stored in `lib/templates/` with `.ast.ts` extension
- **New**: AST generation through builder system (`lib/utils/builders/`)
- **Transition**: Currently mixed approach, moving toward pure AST generation
- Templates are copied to `dist/lib/templates/` during build
- Use `rsync` to exclude TypeScript files from template copying

### Testing

- **Current**: Placeholder test command in package.json
- **Needed**: Jest framework setup for new spec system
- **Priority**: Unit tests for builders, integration tests for generators

### Package Management

- Uses Yarn for dependency management
- Workspaces configured for monorepo structure
- Uses Husky for git hooks and lint-staged for pre-commit formatting

### **Transition Development Guidelines**

1. **New Code**: Use spec-based system for all new features
2. **Legacy Code**: Don't extend legacy system, migrate to new system
3. **Testing**: All new components must have tests
4. **Documentation**: Update docs as components are migrated

## Feature Components

The generator supports multiple configurable features:

- **Databases**: Sequelize, TypeORM, Prisma, Mongoose
- **Authentication**: Passport, JWT, Express-session
- **WebSockets**: Socket.io, WS
- **View Engines**: EJS, Pug, Handlebars
- **Logging**: Morgan integration
- **CORS**: Built-in CORS middleware support

Each feature has its own generator, preset, and template files organized in the respective directories.
