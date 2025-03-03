import express from 'express';
import { getEditPage , editBook } from '../controller/edit.controller.js';

const router = express.Router();

router.get("/:id", getEditPage);
  
router.post("/:id", editBook);

export default router;