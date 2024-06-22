import React, { useState } from "react";
import "./header.css";
import Logo from '../assets/Header/unsplash.png';
import menu from '../assets/Header/menu.png';
// import visual from '../assets/Header/visual-search.png';
import search from '../assets/Header/search-b.png';
import Growth from '../assets/Header/growth-icon.png';
import img1 from '../assets/Header/img1.jpg';
import img2 from '../assets/Header/img2.jpg';
import img3 from '../assets/Header/img3.jpg';
import img4 from '../assets/Header/img4.jpg';
import { Link } from 'react-router-dom';
import Gallery from "../gallery/Gallery.js";



const Header = () => {
	const [query, setQuery] = useState("");
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [isSearchPerformed, setIsSearchPerformed] = useState(false);

	const client_id = process.env.REACT_APP_CLIENT_ID;

	const selecthandler = () => {
		setIsFocused(true);
	}

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

			<div className='back'>
				<img src={Logo} alt="" className='imglogo' />
				<div className={`search_box ${isFocused ? 'focused' : ''}`}>
					<img src={search} alt="" />&nbsp;&nbsp;&nbsp;
					<form onSubmit={handleSubmit}>
						<input type="text"
							className='input'
							onChange={(event) => setQuery(event.target.value)}
							value={query}
							onClick={selecthandler}
							placeholder='Search photos and illustrations' />
					</form>
					{/* <Link to='https://unsplash.com/plus'><img src={visual} alt="" /></Link> */}
				</div>
				<p className="unsplash_plus">Get Unsplash+</p>
				<p className="submit_image">Submit an image</p>
				<img src={menu} alt="Menu" className="menu_icon" />
			</div>

			{isFocused && (
				<div className='searchdrop'>

					<p className='trending'>Trending Searches</p>
					<div className='displayfix'>

						<div className='box1'>
							<img src={Growth} alt="" />&nbsp;
							<p>event</p>
						</div>

						<div className='box2'>
							<img src={Growth} alt="" />&nbsp;
							<p>boys</p>
						</div>

						<div className='box3'>
							<img src={Growth} alt="" />&nbsp;
							<p>music</p>
						</div>

						<div className='box4'>
							<img src={Growth} alt="" />&nbsp;
							<p>value</p>
						</div>

					</div>

					<p className='trendingTopic'>Trending Topics</p>
					<div className='imgboxfix'>

						<Link to="https://unsplash.com/t/animals"><div className='imgbox1'>
							<img src={img1} alt="" />
							<p>Animals</p>
						</div></Link>

						<div className='imgbox2'>
							<img src={img2} alt="" />
							<p>Goals</p>
						</div>

						<div className='imgbox3'>
							<img src={img3} alt="" />
							<p>Travel</p>
						</div>

						<div className='imgbox4'>
							<img src={img4} alt="" />
							<p>Foods</p>
						</div>

					</div>

				</div>
			)}

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