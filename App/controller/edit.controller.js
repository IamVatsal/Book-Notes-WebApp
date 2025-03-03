import db from '../db.js';

const getEditPage = async (req, res) => {
  console.log(req.user);
    const id = req.params.id;
  
    let result = await db.query(
      "SELECT id, title, isbn, olid, authorName, genre, TO_CHAR(finishDate, 'YYYY-MM-DD') AS finishDate, rating, summary FROM book_details WHERE id = $1",
      [id]
    );
  
    let book = result.rows[0];
  
    res.render("edit.ejs", { book: book, basePath: "../../" });
}

const editBook = async (req, res) => {
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
};

export { getEditPage, editBook };