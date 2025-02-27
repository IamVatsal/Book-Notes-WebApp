import db from "../db.js";

const getBooksPage = async (req, res) => {
    let result = await db.query(
      "SELECT id, title, olid, authorName, genre, TO_CHAR(finishDate, 'DD/MM/YYYY') AS finishDate, rating, summary FROM book_details"
    );
    books = result.rows;
    res.render("index.ejs", { books: books });
};

export { getBooksPage };