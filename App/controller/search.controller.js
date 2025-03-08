import db from "../db.js";

const search = async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
    return;
  }
  const user = req.user;
  const search = capitalize(req.query.search);

  let result = await db.query(
    `SELECT id, title, olid, authorName, genre, TO_CHAR(finishDate, 'DD/MM/YYYY') AS finishDate, rating, username, summary FROM book_details WHERE title LIKE $1 AND username = $2`,
    [`%${search}%`, user.username]
  );
  const books = result.rows;
  res.render("index.ejs", { books: books, basePath: "../", user });
};

function capitalize(s) {
  return s && String(s[0]).toUpperCase() + String(s).slice(1);
}

export { search };
