import bcrypt from "bcrypt";
import db from "../db.js";
import express from "express";
import bodyParser from "body-parser";

const app = express(); 
app.use(bodyParser.urlencoded({ extended: true }));

const saltRounds = 10;

const getPage = (req, res) => {
  res.render("signup.ejs", { basePath: "../" });
};

const postSignup = async (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.email.slice(0, email.indexOf("@"));

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password , username) VALUES ($1, $2, $3) RETURNING *",
            [email, hash, username]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export { getPage, postSignup };
