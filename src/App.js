import React, { useState, useEffect } from "react";
import "./App.css";
import Descriptive from "./components/gallery/Descriptive.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/header/header.js";
import Gallery from "./components/gallery/Gallery.js";
import Collection from "./components/gallery/collection.js";
import Gif_loader from './components/assets/Descriptive/loaderGif.gif';

function App() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const client_id = process.env.REACT_APP_CLIENT_ID;

    useEffect(() => {
        if (!photos.length) {
            fetch(`https://api.unsplash.com/photos/random?count=3&client_id=${client_id}`)
                .then(response => response.json())
                .then(data => {
                    setPhotos(data);
                    setLoading(false);
                    console.log(data);
                })
                .catch(error => {
                    console.error("Error fetching photos:", error);
                    setLoading(false);
                });
        }
    }, [client_id, photos.length]);


    if (loading) {
        return <div className="loader_gif"><img src={Gif_loader} /></div>;
    }


    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <>
                    <Header />
                    <Gallery photos={photos} loading={loading} />

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
