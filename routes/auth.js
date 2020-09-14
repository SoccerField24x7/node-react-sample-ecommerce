import express from 'express';
import { userSignupValidator } from '../validator';
import { signup, signin, signout, requireSignin } from '../controllers/auth';

const router = express.Router();

// routes
router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

export const authRoutes = router;