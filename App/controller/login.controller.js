
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const saltRounds = 10;

const getLoginPage = (req, res) => {
  res.render("login.ejs", { basePath: "../" });
};

const getForgotpassPage = (req, res) => {
  res.render("forgotpass.ejs", { basePath: "../" });
};

const localauth = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      if (req.body.remember_me === "true") {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 5; // 5 days
      }
      return res.redirect("/books");
    });
  })(req, res, next);
};

export { getLoginPage, getForgotpassPage , localauth};
 