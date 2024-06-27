import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import './descriptive.css';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import icon_black from '../assets//Descriptive/heart_black.png';
import icon_white from '../assets/Descriptive/heart_white.png';
import plus_black from '../assets/Descriptive/plus_black.png';
import plus_white from '../assets/Descriptive/plus_white.png';
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
import facebook from '../assets/Descriptive/facebook.png';
import twitter from '../assets/Descriptive/twitter.png';
import pinterest from '../assets/Descriptive/pinterest.png';
import email from '../assets/Descriptive/email.png';
import download_icon from '../assets/Header/download.png';
import verified_tik from '../assets/Descriptive/verified_tik.png';


const Descriptive = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPlusFocused, setIsPlusFocused] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [isReport, setIsreport] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [shareDropdown, setShareDropdown] = useState(false);
    const navigate = useNavigate();
    const client_id = process.env.REACT_APP_CLIENT_ID;


    useEffect(() => {
        fetchPhotoDetails();
        fetchRandomPhotos();
    }, [id]);

    const fetchPhotoDetails = () => {
        axios.get(`https://api.unsplash.com/photos/${id}?client_id=${client_id}`)
            .then(response => {
                setPhoto(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching photo details:", error);
                setLoading(false);
            });
    };

    const fetchRandomPhotos = async () => {
        try {
            setLoading(true);
            const orientation = ['portrait', 'landscape', 'squarish'];
            const promises = orientation.map(orientation =>
                axios.get(`https://api.unsplash.com/photos/random`, {
                    params: {
                        count: 10,
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

    //// Download image Function ////

    const handleDownload = (size) => {
        let url = photo.links.download;
        if (size) {
            url += `&w=${size}`;
        }
        const link = document.createElement('a');
        link.href = `${url}&force=true`;
        link.download = photo.alt_description || 'download-image';
        link.click();
        setDropdownVisible(false);
    };

    const toggleShareDropdown = () => {
        setShareDropdown(!shareDropdown);
    }

    const toggleButtonHandle = () => {
        setDropdownVisible(!dropdownVisible);
    }

    const handleChange = () => {
        setIsFocused(!isFocused);
    }

    const toggleReport = () => {
        setIsreport(!isReport);
    }

    //// Plus Icon Function ////

    const handleAddToCollection = () => {
        let collection = JSON.parse(localStorage.getItem('imageCollection')) || [];
        if (!collection.includes(photo.id)) {
            collection.push(photo.id);
            localStorage.setItem('imageCollection', JSON.stringify(collection));
            setIsPlusFocused(true);
            toast.success("Image added to collection");
            console.log('plus button clicked', handleAddToCollection);
        } else {
            toast("image is already in the collection");
        }
    };


    //// Loader Gif ////
    if (!photo) {
        console.log('photo is clicked')
        return <img src={Gif_loader} className="loaders_gif" />
    }

    if (loading) {
        console.log("loader is clciked");
        return <img src={Gif_loader} alt="gif_loader" />
    }

    //// DATE ////
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
                        <div className="div_user">
                            <Link to={photo.user.links.html}>
                                <img src={photo.user.profile_image.medium} className="profile_img" alt="profile-image" />
                            </Link>
                            <div>
                                <p className="username"><Link to={photo.user.links.html}>{photo.user.name}</Link></p>
                                <Link to={photo.user.links.html}>{photo.user.for_hire && (
                                    <div className="for-hires">
                                        <p>Available for hire</p>
                                        <img src={verified_tik} alt="Verified Tik" className="verified-tiks" />
                                    </div>
                                )}</Link>
                            </div>

                            {/* Like Icon */}

                            <img src={isFocused ? icon_white : icon_black}
                                className={`icon ${isFocused ? 'icon_change' : ''}`}
                                alt="toggle icon"
                                onClick={handleChange} />

                            {/* Plus Icon */}

                            <img src={isPlusFocused ? plus_white : plus_black}
                                alt="plus_icon" className={`plus_icon ${isPlusFocused ? 'plus_change' : ''}`}
                                onClick={handleAddToCollection} />

                            {/* Download Icon  */}

                            <button className="download_size" onClick={() => handleDownload()}>Download</button>
                            <div className="dropdown-container">
                                <img src={icon_drop} alt="drop_icon" className="drop_icon" onClick={toggleButtonHandle} />
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
                                className="main_image"
                            />

                            {/* After Image Component */}

                            <div className="all_details">
                                <div className="view">
                                    <p className="views_para">Views</p>
                                    <p>{photo.views || "No description available"}</p>
                                </div>

                                <div className="download-f">
                                    <p className="download_para">Downloads</p>
                                    <p>{photo.downloads || "No downloads available"}</p>
                                </div>


                                <div className="camera">
                                    <p className="camera_para">{photo.user.first_name} Clicked</p>
                                    <p>{photo.user.total_photos || "No Data Available"}</p>
                                </div>


                                {/* Share Icon */}

                                <div className="share_icon" onClick={toggleShareDropdown}>
                                    <div style={{ display: "flex", textAlign: "center", marginTop: '-10%' }}>
                                        <img src={share_icon} alt="share_icon" />&nbsp;&nbsp;
                                        <p>Share</p>
                                    </div>
                                    {shareDropdown && (
                                        <div
                                            className="share-dropdown">
                                            <p><img src={facebook} />Facebook</p>
                                            <p><img src={twitter} />Twitter</p>
                                            <p><img src={pinterest} />Pinterest</p>
                                            <p><img src={email} />Email</p>
                                            <p><img src={share_icon} />Share via</p>
                                        </div>
                                    )}
                                </div>

                                {/* Info Icon */}

                                <div className="info_icon">
                                    <img src={info_icon} alt="info_details" />&nbsp;&nbsp;
                                    <p>Info</p>
                                </div>
                                <div>

                                    {/* Action Icon */}

                                </div>
                                <div className="action_icon" onClick={toggleReport}>
                                    <img src={action_icon} alt="action_details" className="action_image" />
                                    {isReport && (
                                        <div className="report-dropdown">
                                            <p>Report</p>
                                        </div>
                                    )}
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

            <div className="image-grid_column">
                {photos.map((image) => (
                    <div key={image.id}
                        onClick={() => navigate(`/descriptive/${image.id}`)}
                        className="image-container">
                        <img
                            src={image.urls.small}
                            alt={image.alt_description}
                            className="image_grid_columm"
                        />

                        <img src={plus_black}
                            alt="plus_icon" className="plus_down_design"
                            onClick={handleAddToCollection} />

                        <img src={image.user.profile_image.medium}
                            alt="user_profile"
                            className="descriptive_userimage" />

                        <p className="descriptive_username">{image.user.first_name}</p>

                        {image.user.for_hire && (
                            <div className="for-hire">
                                <p>Available for hire</p>
                                <img src={verified_tik} alt="Verified Tik" className="verified-tik" />
                            </div>
                        )}

                        <img
                            src={download_icon}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(image.links.download, image.alt_description);
                            }}
                            alt='download'
                            className="download_image" />
                    </div>
                ))}
            </div>

            <Toaster />
        </div>
    );
};

export default Descriptive;
