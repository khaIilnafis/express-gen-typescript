// @ts-nocheck - Template file, not meant to be validated directly
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Example } from "../models/Example";
import { Request, Response, NextFunction } from "express";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ChangeMe!",
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
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}
export default passport;
