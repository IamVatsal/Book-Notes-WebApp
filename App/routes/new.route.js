import express from 'express';
import { getAddBookPage, postAddBookPage } from '../controller/new.controller.js';
const router = express.Router();

router.get("/", getAddBookPage);
  
router.post("/", postAddBookPage);

export default router;