import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import {isAuthenticated} from '../../auth';
import {createCategory} from '../admin/apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destruct user and token from localstorage
    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        createCategory(user._id, token, {name})
            .then((data) => {
                if (data.error) {
                    setError(true);
                } else {
                    setError('');
                    setSuccess(true);
                }
            });
    };

    const newCategoryForm = () => {
        return(
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} autofocus required />
                    <br />
                    <button className="btn btn-outline-primary">
                        Create Category
                    </button>
                </div>
            </form>
        );
    };

    const showSuccess = () => {
        if (success) {
            return (
                <h3 className="text-success">{name} is created.</h3>
            );
        }
    };

    const showError = () => {
        if (error) {
            return (
                <h3 className="text-danger">Category Name should be unique.</h3>
            );
        }
    };

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/dashboard" className="text-warning">
                    Back to dashboard
                </Link>
            </div>
        );
    };

    return (
        <Layout title="Add Category" description={`G'day ${user.name}, ready to add a new category.`} className="container">
            <div class="row">
                <div className="col-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div> 
        </Layout>
    );

};

export default AddCategory;
