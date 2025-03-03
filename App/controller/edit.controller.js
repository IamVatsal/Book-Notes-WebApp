import db from '../db.js';

const getEditPage = async (req, res) => {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    }
    const id = req.params.id;
    const username = req.user.username;
    let result = await db.query(
      "SELECT id, title, isbn, olid, authorName, genre, TO_CHAR(finishDate, 'YYYY-MM-DD') AS finishDate, rating, summary FROM book_details WHERE id = $1 AND username = $2",
      [id, username]
    );
  
    let book = result.rows[0];
  
    res.render("edit.ejs", { book: book, basePath: "../../" });
}

const editBook = async (req, res) => {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    } 
    const user = req.user;
    const id = req.params.id;
  
    const book = {
      title: req.body.title,
      isbn: req.body.isbn,
      olid: req.body.olid,
      authorname: req.body.authorName,
      genre: req.body.genre,
      finishdate: req.body.finishDate,
      rating: req.body.rating,
      summary: req.body.summary,
    };
  
    try {
      await db.query(
        "UPDATE book_details SET title = $1, isbn=$2, olid = $3, authorname = $4, genre = $5, finishdate = $6, rating = $7, summary = $8 WHERE id = $9 AND username = $10",
        [
          book.title,
          book.isbn,
          book.olid,
          book.authorname,
          book.genre,
          book.finishdate,
          book.rating,
          book.summary,
          id,
          user.username,
        ]
      );
    } catch (error) {
      console.log(error);
    }
  
    res.redirect("/");
};

export { getEditPage, editBook };