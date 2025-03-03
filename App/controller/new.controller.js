import axios from "axios";
import db from "../db.js";
// Get book details from Open Library API
const getAddBookPage = async (req, res) => {
  console.log(req.user);
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
    console.log(req.body);
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
        "INSERT INTO book_details (title, isbn, olid, authorname, genre, finishdate, rating, summary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          book.title,
          book.isbn,
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
}


export {getAddBookPage, postAddBookPage};