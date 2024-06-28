import { useEffect, useState } from 'react';
import img1 from '../assets/Header/imgg3.jpg';
import img2 from '../assets/Header/imgg1.jpg';
import img3 from '../assets/Header/imgg2.jpg';
import img4 from '../assets/Header/imgg4.jpg';
import beach from '../assets/Header/beach.jpg';
import fatherhood from '../assets/Header/fatherhood.jpg';
import food from '../assets/Header/food.jpg';
import texture from '../assets/Header/pattern.jpg';
import square_icon from '../assets/Header/spacespuare.png';
import search from '../assets/Header/search-b.png';
import './headerDetails.css';
import { Link } from 'react-router-dom';

const images = [img1, img2, img3, img4];

function HeaderDetails({ onSearch }) {
    const [currentIndexImage, setCurrentIndexImage] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState("");


    const selecthandler = () => {
        setIsFocused(true);
    }
    const handleDetailSubmit = (event) => {
        event.preventDefault();
        onSearch(query);
        setQuery("");
        setIsFocused(false);
    };
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndexImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, [])

    return (
        <div className='headerdeatails-all'>
                <div className='splashimage'>
                <h2>Unsplash</h2>
                <p>The internet’s source for visuals.</p>
                <p>Powered by creators everywhere.</p>
            </div>

            <div className='squarespace'>
                <Link to={'https://www.squarespace.com/website-design'}>
                    <p>Supported by<img src={square_icon} /><span>SQUARESPACE</span></p></Link>
            </div>
            <div className={`search_detailbox ${isFocused ? 'focused' : ''}`}>
                <img src={search} alt="Search_bar" />&nbsp;&nbsp;&nbsp;
                <form onSubmit={handleDetailSubmit}>
                    <input type="text"
                        className='input'
                        onChange={(event) => setQuery(event.target.value)}
                        value={query}
                        onClick={selecthandler}
                        placeholder='Search photos and illustrations' />
                </form>
            </div>
            <div className='image-carousel'>
                <Link to={'https://unsplash.com/plus'}>
                    <img src={images[currentIndexImage]} alt='images' className='img_for_carousel' /></Link>
            </div>
            <Link to={'https://unsplash.com/plus'}>
                <div className='Text-image'>
                    <h5>Discover Unsplash+</h5>
                    <p>Unlimited downloads.</p>
                    <p>Full legal protections.</p>
                    <p>No ads.</p>
                </div></Link>

            <div className='collection_full'>
                <div className='collection_top'>
                    <p className='item1'>Collection</p>
                    <Link to={'https://unsplash.com/collections'}>
                        <p className='item2'>See all</p></Link>
                </div>
                <div className='summer_back'>
                    <img src={beach} alt="beach" />
                    <div style={{ display: 'block' }}>
                        <Link to={'https://unsplash.com/collections/d3ZWOIKVvSg/summer-backgrounds'}>
                            <p>Summer Backgrounds</p>
                            <p className='godaddy'>by GoDaddy Studio</p></Link>
                    </div>
                </div>

                <div className='Food-drink'>
                    <img src={food} alt="food" />
                    <div style={{ display: 'block' }}>
                        <Link to={'https://unsplash.com/collections/SwH0hNNr0M0/food-%26-drink'}>
                            <p>Food & Drinks</p>
                            <p className='godaddy'>by Unsplash+ Illustration</p></Link>
                    </div>
                </div>

                <div className='Father-hood'>
                    <img src={fatherhood} alt="food" />
                    <div style={{ display: 'block' }}>
                        <Link to={'https://unsplash.com/collections/ibNd0GyliGo/fatherhood'}>
                            <p>Fatherhood</p>
                            <p className='godaddy'>by Unsplash+ Collections</p></Link>
                    </div>
                </div>

                <div className='Patterns-Tex'>
                    <img src={texture} alt="food" />
                    <div style={{ display: 'block' }}>
                        <Link to={'https://unsplash.com/collections/seNcCozgyrM/patterns-%26-textures'}>
                            <p>Patterns & Textures</p>
                            <p className='godaddy'>by Unsplash+ Collections</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HeaderDetails;