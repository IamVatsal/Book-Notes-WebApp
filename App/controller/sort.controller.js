import db from "../db.js";
let books;

const sort = async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
    return;
  } 
  const user = req.user;
  const column = req.params.column;

  if (column == "finishdate" || column == "rating") {
    let result = await db.query(
      `SELECT id, title, olid, authorName, genre, TO_CHAR(finishDate, 'DD/MM/YYYY') AS finishDate, rating, summary FROM book_details WHERE username = $1 ORDER BY ${column} DESC`
      , [user.username]
    );
    books = result.rows;
  } else {
    let result = await db.query(
      `SELECT id, title, olid, authorName, genre, TO_CHAR(finishDate, 'DD/MM/YYYY') AS finishDate, rating, summary FROM book_details WHERE username = $1 ORDER BY ${column}`
      , [user.username]
    );
    books = result.rows;
  }

  res.render("books.ejs", { books: books, basePath: "../" , user});
};

export { sort };
