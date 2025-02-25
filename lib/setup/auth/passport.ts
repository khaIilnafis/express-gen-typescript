import fs from "fs";
import path from "path";
import { writeTemplate, getTemplatePath } from "../../utils/template-loader.js";

/**
 * Setup Passport.js authentication
 * @param destination - Project destination directory
 */
async function setupPassport(destination: string): Promise<void> {
  console.log("Setting up Passport.js authentication...");

  // Define paths for destination files
  const passportPath = path.join(destination, "src", "auth", "passport.ts");
  const authMiddlewarePath = path.join(
    destination,
    "src",
    "middleware",
    "auth.ts"
  );

  // Create auth directory if it doesn't exist
  const authDir = path.join(destination, "src", "auth");
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Create middleware directory if it doesn't exist
  const middlewareDir = path.join(destination, "src", "middleware");
  if (!fs.existsSync(middlewareDir)) {
    fs.mkdirSync(middlewareDir, { recursive: true });
  }

  // Create passport.ts file using template
  writeTemplate(getTemplatePath("auth/passport/passport.ts"), passportPath);
  // Create auth middleware
  const authMiddlewareContent = `import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

/**
 * Authentication middleware for protecting routes
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: any) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    req.user = user;
    return next();
  })(req, res, next);
};

/**
 * Generate JWT token for a user
 */
export const generateToken = (user: any): string => {
  const payload = {
    id: user.id,
    email: user.email
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};`;

  fs.writeFileSync(authMiddlewarePath, authMiddlewareContent);
}
export default setupPassport;
