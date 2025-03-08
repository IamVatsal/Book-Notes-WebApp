import express from 'express';
import { logout } from '../controller/logout.controller.js';

const router = express.Router();

router.get("/", logout);

export default router;