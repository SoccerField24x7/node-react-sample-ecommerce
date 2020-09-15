import express from 'express';
import { userById } from '../controllers/user';
import { isAuth, isAdmin, requireSignin } from '../controllers/auth';

const router = express.Router();

// routes
router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.param('userId', userById);

export const userRoutes = router;