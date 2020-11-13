import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/core/Home';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import AdminRoute from './auth/AdminRoute';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './components/user/UserDashboard';
import AdminDashboard from './components/user/AdminDashboard';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;