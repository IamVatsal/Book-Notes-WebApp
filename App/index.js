import express from "express";
import bodyParser from "body-parser";
import db from "./db.js";
import dotenv from "dotenv";
import loginRouter from "./routes/login.route.js";
import signupRouter from "./routes/signup.route.js";
import booksRouter from "./routes/books.route.js";
import editRouter from "./routes/edit.route.js";
import sortRouter from "./routes/sort.route.js";
import session from "express-session";
import passport from "passport";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

db.connect();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/books", booksRouter);
app.use("/edit", editRouter);
app.use("/sort", sortRouter);

let books;

app.use((req, res, next) => {
  res.locals.basePath = "/";
  next();
});

app.get("/", async (req, res) => {
  console.log(req.user);
  let result = await db.query(
    "SELECT id, title, olid, authorName, genre, TO_CHAR(finishDate, 'DD/MM/YYYY') AS finishDate, rating, summary FROM book_details"
  );
  books = result.rows;
  res.render("index.ejs", { books: books });
});

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});