import express from "express";
import { sort } from "../controller/sort.controller.js";

const router = express.Router();

router.get("/:column", sort);

export default router;
