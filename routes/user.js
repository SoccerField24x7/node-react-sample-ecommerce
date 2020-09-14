import express from 'express';
import { userById } from '../controllers/user';
import { requireSignin } from '../controllers/auth';

const router = express.Router();

// routes
router.get('/secret/:userId', requireSignin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.param('userId', userById);

export const userRoutes = router;