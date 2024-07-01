import React, { useState } from "react";
import "./header.css";
import Logo from '../assets/Header/unsplash.png';
import menu from '../assets/Header/menu.png';
import search from '../assets/Header/search-b.png';
import company_icon from '../assets/Header/company.png';
import product_icon from '../assets/Header/product.png';
import community_icon from '../assets/Header/community.png';
import { useNavigate, Link, useLocation } from "react-router-dom";
import HeaderDetails from "./headerDetails";


const Header = ({ onSearch, showCategoryList=true,showHeaderdetail = true, onUploadClick }) => {
	const [query, setQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const [activeCategory, setActiveCategory] = useState('Editorial');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const selecthandler = () => {
		setIsFocused(true);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		onSearch(query);
		setQuery("");
		setIsFocused(false);
		setActiveCategory('');
	};

	const handleCategoryClick = (category) => {
		onSearch(category);
		setActiveCategory(category);
	}

	const handleEditorialClick = () => {
		onSearch('random images');
		setActiveCategory('Editorial');
	}

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	}


	return (
		<>
		<div className="header_background">

			<div className='back'>
				<img src={Logo} alt="unsplah_logo" className='imglogo' />
				<div className={`search_box ${isFocused ? 'focused' : ''}`}>
					<img src={search} alt="Search_bar" />&nbsp;&nbsp;&nbsp;
					<form onSubmit={handleSubmit}>
						<input type="text"
							className='input'
							onChange={(event) => setQuery(event.target.value)}
							value={query}
							onClick={selecthandler}
							readOnly={location.pathname.startsWith('/descriptive')}
							placeholder='Search photos and illustrations' />
					</form>
				</div>
				<div className="header_component">
				<p className="unsplash_plus"><Link to={'https://unsplash.com/plus'}>Get Unsplash+</Link></p>
				<p className="submit_image" onClick={onUploadClick}>Submit an image</p>
				<p className="my_collection" onClick={() => navigate('/collection')}>My Collection</p>
				</div>
				<div className="menu_container">
					<img src={menu} alt="Menu" className="menu_icon" onClick={toggleMenu} />
					{isMenuOpen && (
						<div className="dropdown_menu">
							<div className="menu_header">
								<div className="company">
									<div style={{ display: "flex", alignItems: "center", fontWeight: 600 }}>
										<img src={company_icon} alt="Company icon" />&nbsp;&nbsp;
										<p>Company</p>
									</div>
									<div className="company_para">
										<p><Link to={'https://unsplash.com/about'}>About</Link></p>
										<p><Link to={'https://unsplash.com/history'}>History</Link></p>
										<p><Link to={'https://unsplash.com/hiring'}>Join the team</Link></p>
										<p><Link to={'https://unsplash.com/blog'}>Blog</Link></p>
										<p><Link to={'https://unsplash.com/press'}>Press</Link></p>
										<p><Link to={'https://unsplash.com/contact-us'}>Contact us</Link></p>
										<p><Link to={'https://help.unsplash.com/en?utm_medium=referral&utm_source=unsplash'}>Help Center</Link></p>
									</div>
								</div>
								<div className="product">
									<div style={{ display: "flex", alignItems: "center", fontWeight: 600 }}>
										<img src={product_icon} alt="Product icon" />&nbsp;&nbsp;
										<p>Product</p>
									</div>
									<div className="product_para">
										<p><Link to={'https://unsplash.com/developers'}>Developers/API</Link></p>
										<p><Link to={'https://unsplash.com/data'}>Unsplash Dataset</Link></p>
										<p><Link to={'https://apps.apple.com/us/app/unsplash/id1290631746?ls=1&utm_medium=referral&utm_source=unsplash'}>Unsplash for IOS</Link></p>
										<p><Link to={'https://unsplash.com/apps'}>Apps & Plugins</Link></p>
									</div>
								</div>
								<div className="community">
									<div style={{ display: "flex", alignItems: "center", fontWeight: 600 }}>
										<img src={community_icon} alt="community icon" />&nbsp;&nbsp;
										<p>Community</p>
									</div>
									<div className="community_para">
										<p><Link to={"https://unsplash.com/community"}>Become a Contributor</Link></p>
										<p><Link to={'https://unsplash.com/t'}>Topics</Link></p>
										<p><Link to={'https://unsplash.com/collections'}>Collections</Link></p>
										<p><Link to={'https://unsplash.com/trends'}>Trends</Link></p>
										<p><Link to={'https://unsplash.com/awards'}>Unsplash Awards</Link></p>
										<p><Link to={'https://unsplash.com/stats'}>Stats</Link></p>
									</div>
								</div>
							</div>
							<hr className="hr_drop" />
							<div className="menu_down">
								<p><Link to={'https://unsplash.com/license'}>License</Link></p>
								<p><Link to={'https://unsplash.com/privacy'}>Privacy Policy</Link></p>
								<p><Link to={'https://unsplash.com/terms'}>Terms</Link></p>
								<p><Link to={'https://unsplash.com/secuity'}>Security</Link></p>
							</div>
						</div>
					)}
				</div>
			</div>
			
			{showCategoryList && (
				<div className="categoery">
					<p className={activeCategory === 'Editorial' ? 'active' : ''}
						onClick={() => handleEditorialClick()}>Editorial</p>
					<hr className="hr_tag" />
					<div className="main_categoery">
						{["Wallpaper", "Nature", "3D Renders", "Travel", "Textures & Patterns", "Film", "Archival", "Experiment", "Animals", "People", "Business & Work", "Food & Drink", "Sports"].map(category => (
							<p key={category}
								onClick={() => handleCategoryClick(category)}
								className={activeCategory === category ? 'active' : ''}>{category}</p>
						))}
					</div>
				</div>
			)}

		</div>
		{ showHeaderdetail && (
		<HeaderDetails />
		)}
		</>
	);
};
export default Header;