import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import axios from "axios";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect();

let books;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.basePath = "/";
  next();
});

app.get("/", async (req, res) => {
  let result = await db.query(
    "SELECT id, title, olid, authorName, genre, TO_CHAR(finishDate, 'DD/MM/YYYY') AS finishDate, rating, summary FROM book_details"
  );
  books = result.rows;
  res.render("index.ejs", { books: books });
});

// Get book details from Open Library API

app.get("/new", async (req, res) => {
  const olid = req.query.olid; // Extract OLID from query params
  let book = null;

  if (!olid) {
    return res.render("new.ejs", { book: null });
  } else {
    // Fetch book details from Open Library API
    const result = await axios.get(
      `https://openlibrary.org/search.json?q=${olid}&fields=title,author_name,edition_key&limit=1`
    );

    // Extract book details from API response
    book = {
      olid: olid,
      title: result.data.docs[0]?.title || "",
      author: result.data.docs[0]?.author_name?.[0] || "",
      cover: `https://covers.openlibrary.org/b/olid/${olid}-L.jpg`,
    };
  }

  res.render("new.ejs", { book: book });
});

app.post("/new", async (req, res) => {
  const book = {
    title: req.body.title,
    olid: req.body.olid,
    authorname: req.body.authorName,
    genre: req.body.genre,
    finishdate: req.body.finishDate,
    rating: req.body.rating,
    summary: req.body.summary,
  };

  try {
    await db.query(
      "INSERT INTO book_details (title, olid, authorname, genre, finishdate, rating, summary) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        book.title,
        book.olid,
        book.authorname,
        book.genre,
        book.finishdate,
        book.rating,
        book.summary,
      ]
    );
  } catch (error) {
    console.log(error);
  }

  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;

  let result = await db.query(
    "SELECT id, title, olid, authorName, genre, TO_CHAR(finishDate, 'YYYY-MM-DD') AS finishDate, rating, summary FROM book_details WHERE id = $1",
    [id]
  );

  let book = result.rows[0];

  res.render("edit.ejs", { book: book, basePath: "../" });
});

app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;

  const book = {
    title: req.body.title,
    olid: req.body.olid,
    authorname: req.body.authorName,
    genre: req.body.genre,
    finishdate: req.body.finishDate,
    rating: req.body.rating,
    summary: req.body.summary,
  };

  try {
    await db.query(
      "UPDATE book_details SET title = $1, olid = $2, authorname = $3, genre = $4, finishdate = $5, rating = $6, summary = $7 WHERE id = $8",
      [
        book.title,
        book.olid,
        book.authorname,
        book.genre,
        book.finishdate,
        book.rating,
        book.summary,
        id,
      ]
    );
  } catch (error) {
    console.log(error);
  }

  res.redirect("/");
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM book_details WHERE id = $1", [id]);
  } catch (error) {
    console.log(error);
  }

  res.redirect("/");
});

app.get("/sort/:column", async (req, res) => {
  const column = req.params.column;

  if (column == "finishdate" || column == "rating") {
    let result = await db.query(
      `SELECT id, title, olid, authorName, genre, TO_CHAR(finishDate, 'DD/MM/YYYY') AS finishDate, rating, summary FROM book_details ORDER BY ${column} DESC`
    );
    books = result.rows;
  } else {
    let result = await db.query(
      `SELECT id, title, olid, authorName, genre, TO_CHAR(finishDate, 'DD/MM/YYYY') AS finishDate, rating, summary FROM book_details ORDER BY ${column}`
    );
    books = result.rows;
  }

  res.render("index.ejs", { books: books, basePath: "../" });
});

app.get("/search", async (req, res) => {
  const search = req.query.search;

  let result = await db.query(
    `SELECT id, title, olid, authorName, genre, TO_CHAR(finishDate, 'DD/MM/YYYY') AS finishDate, rating, summary FROM book_details WHERE title LIKE $1`,
    [`%${search}%`]
  );
  books = result.rows;
  res.render("index.ejs", { books: books, basePath: "../" });
});

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
