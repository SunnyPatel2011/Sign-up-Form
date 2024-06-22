import React, { useState } from "react";
import "./header.css";
import App from "../../App.js";
import Gallery from "../gallery/Gallery.js";



const Header = () => {
	const [query, setQuery] = useState("");
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isSearchPerformed, setIsSearchPerformed] = useState(false);

	const client_id = process.env.REACT_APP_CLIENT_ID;

	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		
		fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${client_id}&per_page=20`)
		.then((response) => response.json())
		.then((data) => {
			if (data.results) {
				setPhotos(data.results || []);
				setIsSearchPerformed(true);
					setLoading(false);
					console.log("Search query data Feteched", data.results);
				}
			})
			.catch((error) => {
				console.error("Error fetching photos:", error);
				setLoading(false);
			});

		setQuery("");
		
	};

	return (
		<>
	
			<div className="header">
				<h2 className="header-container">Splash Clone</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="header-input"
						onChange={(event) => setQuery(event.target.value)}
						value={query}
						placeholder="Search for images..."
					/>
				</form>
			</div>
			{/* <App isSearchPerformed={isSearchPerformed}/> */}
			{isSearchPerformed && (
				<Gallery
					photos={photos}
					loading={loading}
					isSearchPerformed={isSearchPerformed}
				/>)}
				
			
		</>
	);
};
export default Header;