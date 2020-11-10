import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import {signup} from '../../auth';

const Signup = () => {
    const [values, setValues] = useState( {
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        
        setValues({...values, error: false});

        signup({ name, email, password })
            .then((data) => {
                console.log(data);
                if (data.error) {
                    return setValues({ ...values, error: data.error, success: false});
                }

                setValues({
                  ...values,
                  name: '',
                  email: '',
                  password: '',
                  error: '',
                  success: true  
                })
            });
    };

    const signUpForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" value={ name } onChange={handleChange('name')} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" className="form-control" value={ email } onChange={handleChange('email')} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input type="password" className="form-control" value={ password } onChange={handleChange('password')} />
                </div>
                <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
            </form>
        );
    };

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                {error}
            </div>
        );
    };

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
                New account is created. Please <Link to="/signin">Sign In</Link>.
            </div>
        );
    };

    return (
        <Layout title="Sign Up" description="Sign Up to Node React E-commerce App" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
}

export default Signup;