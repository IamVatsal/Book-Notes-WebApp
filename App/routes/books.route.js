import express from 'express';
import {getBooksPage} from '../controller/books.controller.js';
import newRouter from './new.route.js';
import editRouter from './edit.route.js';
import db from '../db.js';

const router = express.Router();

router.get("/", getBooksPage);
  
router.use('/new', newRouter);
router.use('/edit', editRouter);


router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM book_details WHERE id = $1", [id]);
  } catch (error) {
    console.log(error);
  }

  res.redirect("/");
});


export default router;