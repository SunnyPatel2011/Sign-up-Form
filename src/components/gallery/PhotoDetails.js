import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PhotoDetails = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/${id}?client_id=${process.env.REACT_APP_CLIENT_ID}`)
      .then((response) => response.json())
      .then((data) => {
        setPhoto(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!photo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img src={photo.urls.small} alt={photo.alt_description || 'Photo'} />
      <p>{photo.description || 'No description available'}</p>
    </div>
  );
};

export default PhotoDetails;
