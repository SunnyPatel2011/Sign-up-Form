import React, { useState, useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from './components/header/header.js';
import Gallery from "./components/gallery/Gallery";
import Collection from './components/gallery/collection.js';
import Descriptive from './components/gallery/Descriptive.js';

function App() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const client_id = process.env.REACT_APP_CLIENT_ID;

    useEffect(() => {
        if (!photos.length) {
            fetchRandomPhotos();
        }
    }, [client_id, photos.length]);

    const fetchRandomPhotos = async () => {
        try {
            setLoading(true);
            const orientations = ['portrait', 'landscape', 'squarish'];
            const promises = orientations.map(orientation =>
                fetch(`https://api.unsplash.com/photos/random?count=20&client_id=${client_id}&orientation=${orientation}`)
                    .then(response => response.json())
            );
            const results = await Promise.all(promises);
            const photos = results.flat();
            setPhotos(photos);
            setLoading(false);
            console.log(photos)
        } catch (error) {
            console.error("Error fetching random photos:", error);
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        setLoading(true);
        fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${client_id}&per_page=30`)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data.results || []);
                setIsSearchPerformed(true);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
                setLoading(false);
            });
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <>
                    <Header onSearch={handleSearch} />
                    <Gallery photos={isSearchPerformed ? searchResults : photos}
                        loading={loading}
                           isSearchPerformed={isSearchPerformed} />
                </>
            )
        },
        {
            path: '/descriptive/:id',
            element: <Descriptive />
        },
        {
            path: '/collection',
            element: <Collection />
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
