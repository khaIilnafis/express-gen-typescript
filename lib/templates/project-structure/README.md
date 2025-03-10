# Express TypeScript Application

A TypeScript Express application scaffolded with express-generator-typescript.

## Features

- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: {{databaseName}}
- **Authentication**: {{authEnabled}}
- **WebSocket**: {{websocketLib}}
- **View Engine**: {{viewEngine}}

## Project Structure

```
bin/              # Startup scripts
controllers/      # Request handlers
models/           # Data models
public/           # Static assets
routes/           # Route definitions
services/         # Business logic
{{websocketDirs}}utils/            # Utility functions
middleware/       # Express middleware
config/           # Configuration files
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
  {{databasePrereqs}}

### Installation

1. Clone the repository

```
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies

```
npm install
```

3. Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
{{databaseEnvVars}}{{authEnvVars}}CLIENT_URL=http://localhost:3000
```

### Development

Start the development server:

```
npm run dev
```

### Build

Build for production:

```
npm run build
```

### Production

Start the production server:

```
npm start
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
