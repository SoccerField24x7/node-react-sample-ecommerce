import React from 'react';

export const signup = (user) => {
        return fetch(`${process.env.REACT_APP_API}/signup`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signin = (user) => {
    return fetch(`${process.env.REACT_APP_API}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const authenticate = (data, next) => {
    if (typeof (window) !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    if (typeof (window) !== 'undefined') {
        localStorage.removeItem('jwt');
        next();

        return fetch(`${process.env.REACT_APP_API}/signout`, {
            method: 'GET',
        }).then((response) => {
            console.log('signout', response);
        }).catch((error) => {
            console.log(error);
        });
    }
};
