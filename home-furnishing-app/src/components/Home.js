import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Home.css'; 
import Image1 from '../images/bedroom.jpg';
import Image2 from '../images/livingroom.jpg';
import Image3 from '../images/kitchen.jpg';
import Image4 from '../images/study.jpg';


const Home = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://localhost:8000/categories/')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">RENTFURLAX</div>
        <div className="header-links">
          <Link to="/login" >Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </header>
      <div className="body">
        <div className="browse-category">
          Browse by Category
          
          <br/>
          <br/>
          <div className="underline"></div>
        </div>
        <div className="image-container">
          <div className="image">
          <Link to="/Bedroom">
            <img src={Image1} alt="Bedroom" onClick={(e) => e.preventDefault()} />
            <button className='home-button' onClick={() => { window.location.href = '/Bedroom'; }}>Bedroom</button>
          </Link>
          </div>
          <div className="image">
            <Link to="/Livingroom">
              <img src={Image2} alt="Livingroom" onClick={(e) => e.preventDefault()} />
              <button className='home-button' onClick={() => { window.location.href = '/Livingroom'; }}>Livingroom</button>
            </Link>
          </div>
          <div className="image">
            <Link to="/Kitchen">
              <img src={Image3} alt="Kitchen" onClick={(e) => e.preventDefault()} />
              <button className='home-button' onClick={() => { window.location.href = '/Kitchen'; }}>Kitchen</button>
            </Link>

          </div>
          <div className="image">
            <Link to="/Study">
              <img src={Image4} alt="Study" onClick={(e) => e.preventDefault()} />
              <button className='home-button' onClick={() => { window.location.href = '/Study'; }}>Study</button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
