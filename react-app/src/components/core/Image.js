import React from 'react';

const Image = ({item, url}) => {
    return (
        <div className="product-img">
            <img 
                className="mb-3"
                alt={item.name}
                style={{maxHeight: '100%', maxWidth: '100%'}}
                src={`${process.env.REACT_APP_API}/${url}/photo/${item._id}`}
            />
        </div>
    );
};

export default Image;
