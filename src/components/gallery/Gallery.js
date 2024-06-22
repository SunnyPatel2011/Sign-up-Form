import React from "react";
import "./gallery.css";
import { useNavigate } from "react-router-dom";


const Gallery = ({ photos, loading, isSearchPerformed }) => {
  console.log("header photo fetched", isSearchPerformed);
  const navigate = useNavigate();


  return (
    <div className="gallery">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* {!isSearchPerformed && <p>Please perform a search to see photos.</p>} */}

          {isSearchPerformed && photos.length === 0 && <p>No photos available.</p>}
          {photos.map((photo) => (
            <div key={photo.id} onClick={() =>  navigate(`/descriptive/${photo.id}`)}>
                <img
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  className="grid-images"
                 />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Gallery;
