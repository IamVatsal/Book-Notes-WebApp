import express from 'express';
import {getProfilePage} from '../controller/profile.controller.js';

const router = express.Router();

router.get("/", getProfilePage);

export default router;