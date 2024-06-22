import React, { useEffect, useState } from 'react';
import './collection.css';

const Collection = () => {
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        const storedCollection = JSON.parse(localStorage.getItem('imageCollection')) || [];
        setCollection(storedCollection);
    }, []);

    return (
        <div>
            <h1>My Collection</h1>
            <div className="image-grid">
                {collection.length > 0 ? (
                    collection.map(imageId => (
                        <ImageItem key={imageId} imageId={imageId} />
                    ))
                ) : (
                    <p>No images in the collection</p>
                )}
            </div>
        </div>
    );
};

const ImageItem = ({ imageId }) => {
    const [image, setImage] = useState(null);
    const client_id = process.env.REACT_APP_CLIENT_ID;

    useEffect(() => {
        fetch(`https://api.unsplash.com/photos/${imageId}?client_id=${client_id}`)
            .then(response => response.json())
            .then(data => setImage(data))
            .catch(error => console.error("Error fetching image details:", error));
    }, [imageId, client_id]);

    if (!image) {
        return <p>Loading...</p>;
    }

    return (
        <div className="image-item">
            <img src={image.urls.small}
             alt={image.alt_description}
             className='grid-images'  />
        </div>
    );
};

export default Collection;
