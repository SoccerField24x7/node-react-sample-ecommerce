import express from 'express';
import { sayHi } from '../controllers/user';

export const router = express.Router();

// routes
router.get('/', sayHi);
