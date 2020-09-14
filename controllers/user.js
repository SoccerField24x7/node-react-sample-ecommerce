import { User } from '../models/user';

export const userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).jsaon({
                error: 'User not found'
            });
        }

        req.profile = user;
        next();
    });
};
