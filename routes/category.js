import express from 'express';
import { create } from '../controllers/category';
import { userById } from '../controllers/user';
import { isAuth, isAdmin, requireSignin } from '../controllers/auth';

const router = express.Router();

// routes
router.post('/category/create/:userId', requireSignin, isAdmin, isAuth, create);

router.param('userId', userById);

export const categoryRoutes = router;