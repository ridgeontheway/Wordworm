import passport from "passport";
import express from "express";
import { sessionKeys } from "../sessionKeys/keys";

module.exports = (app: express.Application) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      // what are we looking for in google? || what permissions are we looking for
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect(sessionKeys.logInRedirectURL);
    }
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect(sessionKeys.logInRedirectURL);
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
