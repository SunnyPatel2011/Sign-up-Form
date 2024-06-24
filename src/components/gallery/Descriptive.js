import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import './descriptive.css';
import toast, { Toaster } from 'react-hot-toast';
import icon_black from '../assets//Descriptive/heart_black.png';
import icon_white from '../assets/Descriptive/heart_white.png';
import icon_plus from '../assets/Descriptive/plus.png';
import icon_drop from '../assets/Descriptive/drop_down.png';
import Gif_loader from '../assets/Descriptive/loaderGif.gif';
import calender_icon from '../assets/Descriptive/calendar.png';
import camera_icon from '../assets/Descriptive/camera2.png';
import security_icon from '../assets/Descriptive/verified.png';
import location_icon from '../assets/Descriptive/location.png';
import share_icon from '../assets/Descriptive/share.png';
import info_icon from '../assets/Descriptive/info.png';
import action_icon from '../assets/Descriptive/more.png';
import Header from "../header/header";


const Descriptive = () => {
    const { id } = useParams();
    const [isFocused, setIsFocused] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [shareDropdown, setShareDropdown] = useState(false);
    const navigate = useNavigate();
    const client_id = process.env.REACT_APP_CLIENT_ID;



    useEffect(() => {
        fetchPhotoDetails();
        fetchRandomPhotos();
    }, [id]);

    const fetchPhotoDetails = () => {
        fetch(`https://api.unsplash.com/photos/${id}?client_id=${client_id}`)
            .then(response => response.json())
            .then(data => {
                setPhoto(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching photo details:", error);
                setLoading(false);
            });
    };

    const fetchRandomPhotos = () => {
        fetch(`https://api.unsplash.com/photos/random?count=12&client_id=${client_id}`)
            .then(response => response.json())
            .then(data => {
                setPhotos(data);
                window.scrollTo(0, 0);
            })
            .catch(error => {
                console.error("Error fetching random photos:", error);
            });
    };


    const handleChange = () => {
        setIsFocused(!isFocused);
        toast("You Liked the image");
    }

    const handleDownload = (size) => {
        let url = photo.links.download;
        if (size) {
            url += `&w=${size}`;
        }
        const link = document.createElement('a');
        link.href = `${url}&force=true`;
        link.download = photo.alt_description || 'downloaded-image';
        link.click();
        setDropdownVisible(false);
    };

    const toggleShareDropdown = () => {
        setShareDropdown(!shareDropdown);
    }

    const toggleButtonHandle = () => {
        setDropdownVisible(!dropdownVisible);
    }

    const toggleFullScreen = () => {
        console.log('image clicked for full screen');
        setIsFullScreen(!isFullScreen);
    }

    const handleAddToCollection = () => {
        let collection = JSON.parse(localStorage.getItem('imageCollection')) || [];
        if (!collection.includes(photo.id)) {
            collection.push(photo.id);
            localStorage.setItem('imageCollection', JSON.stringify(collection));
            toast.success("Image added to collection");
            console.log("Plus button clicked", handleAddToCollection);
        } else {
            toast("Image is already in the collection");
        }
    };


    if (!photo) {
        console.log('photo is clciked');
        return <img src={Gif_loader} className="loaders_gif" />;
    }
    if (loading) {
        console.log("loader is clicked");
        return <img src={Gif_loader} className="gif_loader" />
    }


    /// DATE /////
    const date = new Date(photo.created_at);
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'short' });
    const year = date.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;

    return (
        <div>
            <Header showCategoryList={false} />
            <div className="inside_image">
                {photo ? (
                    <>
                        {/* HEADER PART */}

                        <div className="div_user">
                            <Link to={photo.user.links.html}>
                                <img src={photo.user.profile_image.medium} className='profile_img' alt="" />
                            </Link>
                            <div>
                                <p className="username"><Link to={photo.user.links.html}>{photo.user.name}</Link></p>
                                <p className="bio"><Link to={photo.user.links.html}>{photo.user.location}</Link></p>
                            </div>
                            <img src={isFocused ? icon_white : icon_black}
                                className={`icon ${isFocused ? 'icon_change' : ''}`}
                                alt="toggle icon"
                                onClick={handleChange} />
                            <img src={icon_plus} alt="" className="plus_icon" onClick={handleAddToCollection} />

                            <button className="download_size" onClick={() => handleDownload()}>Download</button>
                            <div className="dropdown-container">
                                <img src={icon_drop} alt="" className="drop_icon" onClick={toggleButtonHandle} />
                                {dropdownVisible && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => handleDownload(640)}>Small (640w)</button><hr />
                                        <button onClick={() => handleDownload(1080)}>Medium (1080w)</button><hr />
                                        <button onClick={() => handleDownload()}>Original</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Image */}

                        <div>
                            <img src={photo.urls.small} alt={photo.alt_description}
                                onClick={toggleFullScreen}
                                className={`main_image ${isFullScreen ? 'full_screen' : ''}`} />

                            {/* After Image Component */}

                            <div className="all_details">
                                <div className="view">
                                    <p className="views_para">Views</p>
                                    <p>{photo.views || "No description available"}</p>
                                </div>
                                <div className="download">
                                    <p className="download_para">Downloads</p>
                                    <p>{photo.downloads}</p>
                                </div>
                                <div className="camera">
                                    <p className="camera_para">{photo.user.first_name} Clicked Photos</p>
                                    <p>{photo.user.total_photos || "No Data Available"}</p>
                                </div>

                                <div className="share_icon" onClick={toggleShareDropdown}>
                                    <div style={{ display: "flex", textAlign: "center", marginTop: '-10%' }}>
                                        <img src={share_icon} alt="share_icon" />&nbsp;&nbsp;
                                        <p>Share</p>
                                    </div>
                                    {shareDropdown && (
                                        <div className="share-dropdown">
                                            <p>Facebook</p>
                                            <p>Twitter</p>
                                            <p>Pinterest</p>
                                            <p>Email</p>
                                            <p>Share via</p>
                                        </div>
                                    )}
                                </div>
                                <div className="info_icon">
                                    <img src={info_icon} alt="info_details" />&nbsp;&nbsp;
                                    <p>Info</p>
                                </div>
                                <div className="action_icon">
                                    <img src={action_icon} alt="action_details" className="action_image" />
                                </div>
                            </div>
                        </div>

                        {/* Information of Images */}
                        <div>
                            <div className="icon_location">
                                {photo.location.name ? (
                                    <>
                                        <img src={location_icon} alt="location" className="icon_image_location" />&nbsp;
                                        <p className="location_para">{photo.location.name}</p>
                                    </>
                                ) : ''}
                            </div>
                            <div className="iocn_calender">
                                <img src={calender_icon} alt="Calender" />&nbsp;&nbsp;
                                <p className="calender_para">Published at {formattedDate}</p>
                            </div>
                            <div className="icon_camera">
                                {photo.exif.name ? (
                                    <>
                                        <img src={camera_icon} alt="Camera_details" className="icon_image" />&nbsp;&nbsp;
                                        <p className="camera_para">{photo.exif.name}</p>
                                    </>
                                ) : ''}
                            </div>
                            <div className="icon_security">
                                <img src={security_icon} alt="security_details" />&nbsp;&nbsp;
                                <p className="security_para">Free to use under the <Link to={'https://unsplash.com/license'}>Unsplash License</Link></p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>No photo data available</p>
                )}
            </div>

            {/* Rendering Images */}

            <h1>Explore more Images</h1>
            <div className="image-grid">
                {photos.map((image) => (
                    <div key={image.id} onClick={() => navigate(`/descriptive/${image.id}`)}>
                        <img
                            src={image.urls.small}
                            alt={image.alt_description}
                            className="grid-images" />
                    </div>
                ))}
            </div>
            <Toaster />
        </div>
    );
};

export default Descriptive;
