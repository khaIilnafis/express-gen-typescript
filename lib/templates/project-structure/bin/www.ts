#!/usr/bin/env node
// @ts-nocheck - Template file, not meant to be validated directly
/**
 * Module dependencies.
 */
import { Server } from "../src/server";
import { AddressInfo } from "net";

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): number | string | boolean {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "3000");

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
  const addr = server.address() as AddressInfo;
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}

/**
 * Create HTTP server.
 */
const server = Server.bootstrap();

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.app.on("error", onError);
server.app.on("listening", onListening);
