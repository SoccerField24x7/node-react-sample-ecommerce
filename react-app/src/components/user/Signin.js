import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {signin} from '../../auth';

const Signin = () => {
    const [values, setValues] = useState( {
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });

    const { email, password, loading, error, redirectToReferrer } = values;

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        
        setValues( {...values, error: false, loading: true} );

        signin({ email, password })
            .then((data) => {
                console.log(data);
                if (data.error) {
                    return setValues({ ...values, error: data.error, loading: false});
                }

                setValues({
                  ...values,
                  redirectToReferrer: true,  
                })
            });
    };

    const signInForm = () => {
        return (
            <form>
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

    const showLoading = () => (
        loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout title="Sign In" description="Sign In to Node React E-commerce App" className="container col-md-8 offset-md-2">
            { showLoading() }
            { showError() }
            { signInForm() }
            { redirectUser() }
        </Layout>
    );
}

export default Signin;