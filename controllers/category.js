import { Category } from '../models/category';
import { errorHandler } from '../helpers/dbErrorHandler';

export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category not found"
            });
        }

        req.category = category;

        next();
    });
};

export const read = (req, res) => {
    return res.json(req.category);
};

export const create = (req, res) => {
    const category = new Category(req.body);
    
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({data});
    });
};

export const update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);
    });
};

export const remove = (req, res) => {
    const category = req.category;
    
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: 'Category deleted'
        });
    });
};

export const list = (req, res) => {
    Category.find({}).sort({name: 'asc'}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);
    });
};

