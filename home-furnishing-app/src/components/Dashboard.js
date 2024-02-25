import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import image from '../images/addtocart.png';



const Dashboard = () => {
  
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/categories/')
      .then(response => response.json())
      .then(data => {
        // Decode the image path and remove the leading slash
        const cleanedData = data.map(category => ({
          id: category.id,
          type: category.type,
          // Decode the URL-encoded image path and remove the leading slash
          image: decodeURIComponent(category.image).replace(/^\//, '')
        }));
        setCategories(cleanedData);
        console.log(cleanedData);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);
  return (
    <div className="home-container">
      <header className="header">
        <div className="header-links">
          <Link exact to="/" >RENTFURLAX</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/orders" >Orders</Link>
          <Link to="/logout" >Logout</Link>
          <Link className='addtocart'to ="/cart"><img src={image} alt="addtocart"></img></Link>
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
          {categories.map(category => (
            <div key={category.id} className="image">
              <Link to={`/Category/${category.type}`}>
                <img src={category.image} alt={category.type} />
                <button className="home-button" onClick={(e) => { e.preventDefault(); window.location.href = category.type ? `/Category/${category.type}` : "#"; }}>
                  {category.type}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
