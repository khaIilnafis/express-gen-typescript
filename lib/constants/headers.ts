/**
 * HTTP Headers-related constants
 */

export const HEADERS = Object.freeze({
  // Standard HTTP headers
  STANDARD: Object.freeze({
    CONTENT_TYPE: "Content-Type",
    AUTHORIZATION: "Authorization",
    ACCEPT: "Accept",
    USER_AGENT: "User-Agent",
    CACHE_CONTROL: "Cache-Control",
    CONTENT_LENGTH: "Content-Length",
  }),

  // Security headers
  SECURITY: Object.freeze({
    X_XSS_PROTECTION: "X-XSS-Protection",
    X_CONTENT_TYPE_OPTIONS: "X-Content-Type-Options",
    X_FRAME_OPTIONS: "X-Frame-Options",
    CONTENT_SECURITY_POLICY: "Content-Security-Policy",
    STRICT_TRANSPORT_SECURITY: "Strict-Transport-Security",
  }),

  // Content type values
  CONTENT_TYPES: Object.freeze({
    JSON: "application/json",
    FORM: "application/x-www-form-urlencoded",
    MULTIPART: "multipart/form-data",
    TEXT: "text/plain",
    HTML: "text/html",
    XML: "application/xml",
  }),

  // Cache control values
  CACHE_CONTROL: Object.freeze({
    NO_CACHE: "no-cache, no-store, must-revalidate",
    PUBLIC: "public, max-age=",
    PRIVATE: "private, max-age=",
  }),
});
