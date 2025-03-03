# Express Generator TypeScript

<img alt='Express TypeScript Generator' src='express-typescript.png' width='500'>

A powerful and customizable Express application generator with full TypeScript support.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js >=14.0.0](https://img.shields.io/badge/Node.js->%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%5E5.4.3-blue.svg)](https://www.typescriptlang.org/)

## Table of Contents

- [Express Generator TypeScript](#express-generator-typescript)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Key Features](#key-features)
  - [Installation](#installation)
    - [Using npx (recommended)](#using-npx-recommended)
    - [Global Installation](#global-installation)
  - [Quick Start](#quick-start)
    - [Generate a New Project](#generate-a-new-project)
    - [Interactive Configuration](#interactive-configuration)
    - [Start Development](#start-development)
  - [Project Structure](#project-structure)
  - [Customization Options](#customization-options)
    - [Database Integration](#database-integration)
    - [Authentication](#authentication)
    - [WebSockets](#websockets)
    - [View Engines](#view-engines)
  - [Available Commands](#available-commands)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

Express Generator TypeScript creates new Express applications configured with TypeScript, similar to the official express-generator but with modern best practices, TypeScript integration, and additional features.

The generated application includes:

- Complete TypeScript configuration
- Modern project structure with proper separation of concerns
- ESLint with TypeScript support
- Built-in development tools (hot reloading, testing)
- Optional database integration
- Optional authentication support
- Optional websocket support
- Optional view engine integration

## Key Features

- **Type Safety**: Full TypeScript integration for robust application development
- **Modular Architecture**: Clean separation of routes, controllers, services, and models
- **Developer Experience**: Hot reloading for rapid development cycles
- **Flexibility**: Customizable configurations to match project requirements
- **Production Ready**: Optimized build configurations for deployment
- **Testing Setup**: Pre-configured testing environment

## Installation

### Using npx (recommended)

```bash
# No installation needed, run directly with npx
npx express-generator-typescript
```

### Global Installation

```bash
# Install globally using yarn (recommended)
yarn global add express-generator-typescript

# Or using npm
npm install -g express-generator-typescript
```

## Quick Start

### Generate a New Project

With default options:

```bash
npx express-generator-typescript
```

With a custom project name:

```bash
npx express-generator-typescript "my-express-app"
```

### Interactive Configuration

The generator will prompt you for various options to customize your project:

- Project name
- Database support (Sequelize, TypeORM, Prisma, Mongoose)
- Authentication (Passport, JWT, Express-session)
- WebSockets (Socket.io, WS)
- View engines (EJS, Pug, Handlebars)

### Start Development

```bash
# Navigate to your project
cd my-express-app

# Install dependencies
yarn

# Start development server with hot reloading
yarn dev
```

Your application will be available at `http://localhost:3000/`.

## Project Structure

The generator creates a well-organized project structure with proper separation of concerns:

```
my-express-app/
├── src/
│   ├── bin/               # Application startup
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Express middlewares
│   ├── migrations/        # Database migrations
│   ├── models/            # Data models
│   ├── public/            # Static assets
│   │   ├── css/           # Stylesheets
│   │   ├── js/            # Client-side JavaScript
│   │   └── images/        # Images
│   ├── routes/            # Express routes
│   ├── services/          # Business logic services
│   ├── sockets/           # WebSocket handlers (if enabled)
│   └── utils/             # Utility functions
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
├── server.ts              # Application entry point
└── tsconfig.json          # TypeScript configuration
```

Additional directories may be generated based on your selected options:

- **Database integration**: Creates appropriate configuration files and model examples
- **Authentication**: Generates auth middleware, strategies, and controllers
- **WebSockets**: Sets up Socket.io or WS configuration
- **View Engine**: Configures template directories for EJS, Pug, or Handlebars

## Customization Options

### Database Integration

Choose from:

- **Sequelize**: SQL ORM with support for PostgreSQL, MySQL, SQLite, and more
- **TypeORM**: TypeScript-first ORM for SQL databases
- **Prisma**: Next-generation ORM with type-safety and auto-generated queries
- **Mongoose**: MongoDB ODM for Node.js

### Authentication

Choose from:

- **Passport.js**: Comprehensive authentication middleware
- **JWT**: JSON Web Token authentication
- **Express-session**: Session-based authentication

### WebSockets

Choose from:

- **Socket.io**: Feature-rich real-time communication
- **WS**: Lightweight WebSocket implementation

### View Engines

Choose from:

- **EJS**: Embedded JavaScript templates
- **Pug**: High-performance template engine (formerly Jade)
- **Handlebars**: Minimal templating on steroids

## Available Commands

In your generated project, you can use these scripts:

```bash
# Start development server with hot reloading
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run tests
yarn test

# Lint code
yarn lint

# Check TypeScript errors
yarn type-check
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

For detailed information on project setup and development workflow, please see [SETUP.md](SETUP.MD).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
