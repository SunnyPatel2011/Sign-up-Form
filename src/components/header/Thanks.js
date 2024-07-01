import React from "react";
import './Thanks.css'
import close from '../assets/Header/close.png';
import { Link } from "react-router-dom";

function Thanks({ photo, onClose }) {
    return (
        <div className="thanks-container">
            {photo && (
                <div className="thanks-content">
                    <img src={photo.urls.thumb} alt="image-donwload" className="thanks-image" />
                    <div className="content">
                        <p className="para">Say Thanks!</p>
                        <p>Give a shoutout to <Link to={photo.user.links.html}><span>{photo.user.name}</span></Link></p>
                    </div>
                    <img src={close} onClick={onClose} alt="close" className="img1" />
                </div>
            )}
        </div>
    );
};
export default Thanks;