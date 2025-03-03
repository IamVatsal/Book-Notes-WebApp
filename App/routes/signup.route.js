import express from 'express';
import {getPage , postSignup} from '../controller/signup.controller.js';


const router = express.Router();


router.get("/", getPage);
router.post("/", postSignup);
// router.get("/auth/google", );

export default router;