// @ts-nocheck - Template file, not meant to be validated directly
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Example } from "../models/Example";
import { Request, Response, NextFunction } from "express";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your-secret-key",
  //   issuer: "",
  //   audience: "",
};

/**
 * Configure Passport.js
 */
passport.use(
  new Strategy(opts, async function (jwt_payload, done) {
    let user;
    try {
      user = await User.findOne({ where: { id: jwt_payload._id } });
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  const fetchedUser = User.findOne({ where: { id: user._id } });
  done(null, fetchedUser);
});

/**
 * Middleware to check if user is authenticated
 */
/**
 * Authentication middleware for protecting routes
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, (err: Error, user: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
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
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "24h",
  });
};
export default passport;
