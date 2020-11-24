import express, { Router } from 'express';
import { create, read, remove, update, list, listRelated, productById, listCategories, photo, listBySearch } from '../controllers/product';
import { userById } from '../controllers/user';
import { isAuth, isAdmin, requireSignin } from '../controllers/auth';

const router = express.Router();

// routes
router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignin, isAdmin, isAuth, create);
router.delete('/product/:productId/:userId', requireSignin, isAdmin, isAuth, remove);
router.put('/product/:productId/:userId', requireSignin, isAdmin, isAuth, update);
router.get('/products', list);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photo);

router.param('userId', userById);
router.param('productId', productById);

export const productRoutes = router;