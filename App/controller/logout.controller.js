import express from "express";

const app = express();

const logout = (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
    return;
  }
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export { logout };
