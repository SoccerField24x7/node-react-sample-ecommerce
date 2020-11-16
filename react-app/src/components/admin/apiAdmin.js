export const createCategory = (userId, token, category) => {
    return fetch(`${process.env.REACT_APP_API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
    console.log(product);
    return fetch(`${process.env.REACT_APP_API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const getCategories = () => {
    return fetch(`${process.env.REACT_APP_API}/categories`, {
        method: "GET"
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log(err);
    });
}
