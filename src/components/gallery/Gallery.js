import React, { useEffect, useState } from "react";
import "./gallery.css";
import { useNavigate } from "react-router-dom";
import loader from '../assets/Descriptive/loaderGif.gif';
import download_icon from '../assets/Header/download.png';
import verified_tik from '../assets/Descriptive/verified_tik.png';
import Unsplash_img from '../assets/Header/unsplash.png';

const Gallery = ({ photos, loading, isSearchPerformed }) => {
  console.log("header photo fetched", photos);
  const navigate = useNavigate();
  const [isScroll, setIsScroll] = useState(false);

  const handleDownload = (url, altDescription) => {
    const link = document.createElement('a');
    link.href = `${url}&force=true`;
    link.download = altDescription || 'downloaded-image';
    link.click();
  }

  useEffect(() => {
    if (photos.length === 0 || isSearchPerformed) {
      setIsScroll(false);
    } else {
      setIsScroll(true);
    }
  }, [photos]);

 
  return (
    <>
      <div className="gallery">
        {loading ? (
          <img src={loader} alt="loader_gif" className="loader" />
        ) : (
          <>

            {isSearchPerformed && photos.length === 0 && <p>No Such Photos Available</p>}
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="photo-container"
                onClick={() => navigate(`/descriptive/${photo.id}`)}>
                <img
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  className="grid-images"
                />

                <img src={photo.user.profile_image.medium}
                  alt="user_profile"
                  className="gallery_userimage" />

                <p className="gallery_username">{photo.user.first_name}</p>

                {photo.user.for_hire && (
                  <div className="for-hire">
                    <p>Available for hire</p>
                    <img src={verified_tik} alt="Verified Tik" className="verified-tik" />
                  </div>
                )}

                <img
                  src={download_icon}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(photo.links.download, photo.alt_description);
                  }}
                  alt='download'
                  className="download" />
              </div>
            ))}
          </>
        )}
      </div>
      {isScroll && (<div className="unsplash_down" onClick={() => window.scroll(0, 0)}>
        <img src={Unsplash_img} alt="unsplash logo" />
        <p>Make Something Awesome</p>
      </div>
      )}
    </>
  );
};

export default Gallery;
