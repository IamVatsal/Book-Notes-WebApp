import axios from "axios";
import db from "../db.js";
// Get book details from Open Library API
const getAddBookPage = async (req, res) => {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    }
    const query = req.query.query; // Extract OLID from query params
    const isIsbn = req.query.isbn === "true"; // Extract OLID from query params
  
    let book = null;
  
    if (!query) {
      return res.render("new.ejs", { book: null , basePath: "../"});
    } else {
      // Fetch book details from Open Library API
      const result = await axios.get(
        `https://openlibrary.org/search.json?q=${query}&fields=title,author_name,cover_edition_key,isbn&limit=1`
      );
  
      // Extract book details from API response
      const bookData = result.data.docs[0];
      // console.log(bookData);
      book = {
        isbn: isIsbn ? query : bookData.isbn?.[0] || "",
        olid: bookData?.cover_edition_key || "",
        title: bookData?.title || "",
        author: bookData?.author_name?.[0] || "",
        cover: `https://covers.openlibrary.org/b/olid/${bookData.cover_edition_key}-L.jpg`,
      };
    }
  
    res.render("new.ejs", { book: book , basePath: "../"});
}

const postAddBookPage = async (req, res) => {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    }

    const user = req.user;
    const book = {
      title: req.body.title,
      isbn: req.body.isbn,
      olid: req.body.olid,
      authorname: req.body.authorName,
      genre: req.body.genre,
      finishdate: req.body.finishDate,
      rating: req.body.rating,
      isPublic: req.body.isPublic === "true",
      summary: req.body.summary,
    };

    if (!book.title || !book.isbn || !book.authorname || !book.genre || !book.finishdate || !book.rating || !book.summary) {
      console.log("Validation failed: Missing required fields");
      res.status(400).send("Missing required fields");
      return;
    }
  
    try {
      await db.query(
        "INSERT INTO book_details (title, isbn, olid, authorname, genre, username, finishdate, rating, ispublic, summary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10)",
        [
          book.title,
          book.isbn,
          book.olid,
          book.authorname,
          book.genre,
          user.username,
          book.finishdate,
          book.rating,
          book.isPublic,
          book.summary,
        ]
      );
      res.redirect("/books");
    } catch (error) {
        console.error("Database insert error:", error);
        res.status(500).send("Internal Server Error");
    }
}


export {getAddBookPage, postAddBookPage};