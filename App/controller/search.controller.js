import db from "../db.js";

const search = async (req, res) => {
  const search = capitalize(req.query.search);

  let result = await db.query(
    `SELECT id, title, olid, authorName, genre, TO_CHAR(finishDate, 'DD/MM/YYYY') AS finishDate, rating, summary FROM book_details WHERE title LIKE $1`,
    [`%${search}%`]
  );
  books = result.rows;
  res.render("index.ejs", { books: books, basePath: "../" });
};

function capitalize(s) {
  return s && String(s[0]).toUpperCase() + String(s).slice(1);
}

export { search };
