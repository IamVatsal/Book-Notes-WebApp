
import express from "express";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const saltRounds = 10;

const getLoginPage = (req, res) => {
  res.render("login.ejs", { basePath: "../" });
};

const getForgotpassPage = (req, res) => {
  res.render("forgotpass.ejs", { basePath: "../" });
};





export { getLoginPage, getForgotpassPage };
