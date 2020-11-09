import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { User } from '../models/user';
import { errorHandler } from '../helpers/dbErrorHandler';

dotenv.config();

export const signup = (req, res) => {
    console.log('req.body->', req.body);
    const user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        // ensure these don't show in the returned result
        user.salt = undefined;
        user.hashed_password = undefined;

        res.json({
            user
        });
    });;
};

export const signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please sign-up.'
            });
        }

        // is user found make sure email and password match
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password don\t match'
            });
        }

        // generate signed token
        console.log(process.env.JWT_SECRET);
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        
        //persist token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999});

        //return response with user and token to frontend client
        const { _id, name, email, role } = user;  

        return res.json({ token, user: { _id, email, name, role } });

    });
};

export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
  });

export const signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout sucess' });
};

export const isAuth = (req, res, next) => {
    //console.log(req);
    //console.log(req.profile._id);
    console.log(req.auth);
    let user = req.profile && req.auth && req.profile._id == req.auth.id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied."
        });
    }

    next();
};

export const isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resource. Access denied."
        });
    }

    next();
};