import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from './components/header/header.js';
import Gallery from "./components/gallery/Gallery";
import Collection from './components/gallery/collection.js';
import Descriptive from './components/gallery/Descriptive.js';
import Upload from "./components/pages/upload.js";
import Login from "./components/pages/login.js";
import SignUp from "./components/pages/signup.js";

function App() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [showUpload, setShowUpload] = useState(false);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const client_id = process.env.REACT_APP_CLIENT_ID;

    useEffect(() => {
        if (!photos.length) {
            fetchRandomPhotos();
        }
    }, [client_id, photos.length]);


    const fetchRandomPhotos = async() => {
        try {
            setLoading(true);
            const orientation = ['portrait', 'landscape', 'squarish'];
            const promises = orientation.map(orientation => 
                axios.get(`https://api.unsplash.com/photos/random`, {
                    params: {
                        count: 2,
                        client_id: client_id,
                        orientation: orientation
                    }
                }).then(response => response.data)
            );
            const results = await Promise.all(promises);
            const photos = results.flat();
            setPhotos(photos);
            setLoading(false);
            console.log(photos);
        } catch (error) {
            console.error("Error fetching photos", error);
            setLoading(false);
        }
    };


    const handleSearch = async(query) => {
        try {
        setLoading(true);
        const orientation = ['portrait', 'landscape', 'squarish'];
        const promises = orientation.map(orientation => 
        axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
                query: query,
                client_id: client_id,
                orientation: orientation,
                per_page: 30
            }
        }).then(response => response.data.results || [])
    );
    const results = await Promise.all(promises);
    const photos = results.flat();
                setSearchResults(photos);
                setIsSearchPerformed(true);
                setLoading(false);
            } 
             catch (error) {
                console.error("Error fetching search results:", error);
                setLoading(false);
            };
    };

    const toggleUpload = () => {
        setShowUpload(!showUpload);
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <>
                    <Header onSearch={handleSearch}
                     onUploadClick={toggleUpload}/>
                    {showUpload && <Upload />}
                    <Gallery photos={isSearchPerformed ? searchResults : photos}
                        loading={loading}
                           isSearchPerformed={isSearchPerformed} />
                </>
            )
        },
        {
            path: '/descriptive/:id',
            element: <Descriptive fetchRandomPhotos={fetchRandomPhotos}/>
        },
        {
            path: '/collection',
            element: <Collection />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/signup',
            element: <SignUp />
        }
      
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
