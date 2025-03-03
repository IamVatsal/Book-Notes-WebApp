import db from "../db.js";

const getBooksPage = async (req, res) => {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    }
    const user = req.user;
    const username = user.username;
    let books;
    let result = await db.query(
      "SELECT id, title, olid, authorName, genre, TO_CHAR(finishDate, 'DD/MM/YYYY') AS finishDate, rating, summary FROM book_details WHERE username = $1",
      [username]
    );
    books = result.rows;
    res.render("index.ejs", { books: books , basePath: "../" , user});
};

export { getBooksPage };