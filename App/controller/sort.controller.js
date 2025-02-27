import db from "../db.js";
let books;

const sort = async (req, res) => {
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
};

export { sort };
