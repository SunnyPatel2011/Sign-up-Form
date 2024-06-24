import React, { useEffect, useState } from 'react';
import './collection.css';

const Collection = () => {
    const [collection, setCollection] = useState([]);
    const [images, setImages] = useState([]);
    const client_id = process.env.REACT_APP_CLIENT_ID;

    useEffect(() => {
        const storedCollection = JSON.parse(localStorage.getItem('imageCollection')) || [];
        setCollection(storedCollection);

        if (storedCollection.length > 0) {
            const fetchImages = async () => {
                try {
                    const promises = storedCollection.map(imageId =>
                        fetch(`https://api.unsplash.com/photos/${imageId}?client_id=${client_id}`)
                            .then(response => response.json())
                    );
                    const results = await Promise.all(promises);
                    setImages(results);
                } catch (error) {
                    console.error("Error fetching image details:", error);
                }
            };
            fetchImages();
        }
    }, [client_id]);

    return (
        <div>
            <h1>My Collection</h1>
            <div className="image-grid">
                {images.length > 0 ? (
                    images.map(image => (
                        <div key={image.id} className="image-item">
                            <img
                                src={image.urls.small}
                                alt={image.alt_description}
                                className='grid-images'
                            />
                        </div>
                    ))
                ) : (
                    <p>No images in the collection</p>
                )}
            </div>
        </div>
    );
};

export default Collection;
