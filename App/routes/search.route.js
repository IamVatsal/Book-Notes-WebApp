import express from "express";
import { search } from "../controller/search.controller.js";

const router = express.Router();


router.get("/search", search);

export default router;