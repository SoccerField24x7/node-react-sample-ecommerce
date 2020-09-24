import express from 'express';
import { categoryById, create, read, update, remove, list } from '../controllers/category';
import { userById } from '../controllers/user';
import { isAuth, isAdmin, requireSignin } from '../controllers/auth';

const router = express.Router();

// routes
router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAdmin, isAuth, create);
router.put('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, remove);
router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userById);

export const categoryRoutes = router;