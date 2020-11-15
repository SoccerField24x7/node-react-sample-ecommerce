import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import {isAuthenticated} from '../../auth';
import {createProduct, getCategories} from '../admin/apiAdmin';

const AddProduct = () => {
    
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    // load categories and set form data
    const init = () => {
        getCategories().then((data) => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, categories: data, formData: new FormData()})
            }
        })
    };
 
    useEffect(() => {
        init();
    }, []);

    const handleChange = (fieldName) => (event) => {
        const value = fieldName === 'photo' ? event.target.files[0] : event.target.value;
        values.formData.set(fieldName, value);
        setValues({...values, [fieldName]: value});
    };

    const clickSubmit = (event) => {
        console.log(values.formData);
        event.preventDefault();
        setValues({...values, error: '', loading: true});

        createProduct(user._id, token, values.formData)
            .then((data) => {
                if (data.error) {
                    setValues({...values, error: data.error});
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo: '',
                        price: '',
                        quantity: '',
                        loading: false,
                        createdProduct: data.name
                    });
                }
            });

    };

    const newPostForm = () => {
        return (
            <form className="mb-3" onSubmit={clickSubmit}>
                <h4>Post Photo</h4>
                <div className="form-group">
                    <label className="btn btn-secondary">
                        <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                    </label>
                </div>
                <div className="form-group">
                    <label class="text-muted">Name</label>
                    <input type="text" onChange={handleChange('name')} className="form-control" value={values.name} />
                </div>
                <div className="form-group">
                    <label class="text-muted">Description</label>
                    <textarea type="text" onChange={handleChange('description')} className="form-control" value={values.description} />
                </div>
                <div className="form-group">
                    <label class="text-muted">Price</label>
                    <input type="number" onChange={handleChange('price')} className="form-control" value={values.price} />
                </div>
                <div className="form-group">
                    <label class="text-muted">Category</label>
                    <select onChange={handleChange('category')} className="form-control">
                        <option value="">Please Select</option>
                        {values.categories && values.categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                    </select>
                </div>
                <div className="form-group">
                    <label class="text-muted">Quantity</label>
                    <input type="number" onChange={handleChange('quantity')} className="form-control" value={values.quantity} />
                </div>
                <div className="form-group">
                    <label class="text-muted">Shipping</label>
                    <select onChange={handleChange('shipping')} className="form-control">
                        <option value="">Please Select</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <button class="btn btn-outline-primary">
                    Save Product
                </button>
            </form>
        );
    };

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{display: values.error ? '' : 'none'}}>
                {values.error}
            </div>
        );
    };

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{display: values.createdProduct ? '' : 'none'}}>
                <h2>{`${values.createdProduct}`} is created!</h2>
            </div>
        );
    };

    const showLoading= () => (
        values.loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    );

    return (
        <Layout title="Add Product" description={`G'day ${user.name}, ready to add a new product?`} className="container">
            <div class="row">
                <div className="col-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div> 
        </Layout>
    );
};

export default AddProduct;