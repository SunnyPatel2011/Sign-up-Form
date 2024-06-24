import React from "react";
import "./gallery.css";
import { useNavigate } from "react-router-dom";
import loader from '../assets/Descriptive/loaderGif.gif';
import download_icon from '../assets/Header/download.png';

const Gallery = ({ photos, loading, isSearchPerformed }) => {
  console.log("header photo fetched", photos);
  const navigate = useNavigate();

  const handleDownload = (url, altDescription) => {
    const link = document.createElement('a');
    link.href = `${url}&force=true`;
    link.download = altDescription || 'downloaded-image';
    link.click();
  }

  return (
    <div className="gallery">
      {loading ? (
        <img src={loader} alt="loader_gif" className="loader" />
      ) : (
        <>

          {isSearchPerformed && photos.length === 0 && <p>No photos available.</p>}
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
  );
};

export default Gallery;
