import { Product } from '../models/product';
import { errorHandler } from '../helpers/dbErrorHandler';
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';

export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found"
            });
        }

        req.product = product;
        next();
    });
};

export const read = (req, res) => {
    req.product.photo = undefined;

    return res.json(req.product);
};

export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        return res.json({
            message: 'Product deleted successfully' 
        });
    });
};

export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded.'
            });
        }

        if (!validateFields(fields)) {
            return res.status(400).json({
                error: 'All fields are required.'
            });
        }

        let product = req.product;
        product = _.extend(product, fields);

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size.'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        });
    });
};

export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded.'
            });
        }

        if (!validateFields(fields)) {
            return res.status(400).json({
                error: 'All fields are required.'
            });
        }

        let product = new Product(fields);
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size.'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        });
    });
};

const validateFields = (fields) => {
    const { name, description, price, category, quantity, shipping } = fields;

    if (!name || ! description || !price || !category || !quantity || !shipping) {
        return false;
    }

    return true;
};

/**
 * 
 */

export const list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if(err) {
                console.log(err);
                return res.status(400).json({
                    error: 'Products not found'
                });
            }

            res.json(products);
        })
};

export const listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Products.find({_id: {$ne: req.product}, category: req.product.category})
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if(err) {
                console.log(err);
                return res.status(400).json({
                    error: 'Products not found'
                });
            }

            res.json(products);
        });
};
