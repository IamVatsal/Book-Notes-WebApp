import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";
import {
  getLoginPage,
  getForgotpassPage,
  localauth
} from "../controller/login.controller.js";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth20";

const router = express.Router();

router.get("/", getLoginPage);
router.get("/forgotpass", getForgotpassPage);
router.post("/", localauth);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/books",
    failureRedirect: "/login",
  })
);

passport.use(
  "local",
  new Strategy(
    { usernameField: "email", passwordField: "password" },
    async function verify(email, password, cb) {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
          email,
        ]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              //Error with password check
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                //Passed password check
                return cb(null, user);
              } else {
                //Did not pass password check
                return cb(null, false);
              }
            }
          });
        } else {
          return cb("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://book-notes-webapp.onrender.com/login/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // console.log(profile);
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.emails[0].value,
        ]);
        const user = result.rows[0];
        if (result.rows.length === 0) {
          const email = profile.emails[0].value;
          const newUser = await db.query(
            "INSERT INTO users (email, password, username, userimage) VALUES ($1, $2, $3, $4) RETURNING *",
            [email, "google", email.slice(0, email.indexOf("@")), profile._json.picture]
          );
          const user = newUser.rows[0];
          return cb(null, user);
        } else {
          return cb(null, user);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

export default router;
