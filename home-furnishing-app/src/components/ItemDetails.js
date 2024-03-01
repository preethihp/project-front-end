import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CartContext } from './CartContext';
import axios from 'axios';
import './ItemDetails.css'; 

const ItemDetails = () => {
  const { categoryType, itemId } = useParams();
  const [item, setItem] = useState(null);
  const { addToCart } = useContext(CartContext);;
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  useEffect(() => {
    axios.get(`http://localhost:8000/products/${categoryType}/${itemId}`)
      .then(response => {
        const cleanedOption = response.data.option.replace(/OrderedDict\(/g, '').replace(/\)/g, '');
        const cleanedRentalOption = response.data.rental_option.replace(/\[OrderedDict\(/g, '[').replace(/OrderedDict\(/g, '').replace(/\)/g, '');
        const option = JSON.parse(cleanedOption.replace(/'/g, '"'));
        const rentalOption = JSON.parse(cleanedRentalOption.replace(/'/g, '"'));
        console.log(response.data);
        setItem({
          ...response.data,
          option,
          rental_option: rentalOption
        });
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });
    
  }, [categoryType, itemId]);


  const handleAddToCart = () => {
    
      const firstRentalOption = item.rental_option[0];
      const itemToAdd = {
        id: item.id,
        name: item.name,
        image: item.option.imageurl,
        quantity: 1,
        rental_option: `${firstRentalOption.tenure} months : ${firstRentalOption.ratepermonth} per month`
      };
    
      window.alert('Added to cart successfully!');
      addToCart(itemToAdd);
      navigate('/cart');
    
  };


  return (
    <div>
      <header className="header">
        <div className="header-links">
          <Link exact to="/" >RENTFURLAX</Link>
          <Link to="/login" >Login</Link>
          <Link to="/register" >Register</Link>
        </div>
      </header>
      {item && (
        <div className="item-details-content">
          <div className="left-content">
            <img src={item.option.imageurl} alt={item.name} />
            <button onClick={handleAddToCart} >Add to cart</button>
          </div>
          <div className="right-content">
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <div>Color: {item.option.color}</div>
            <div>Size: {item.option.size}</div>
            Rental Options:
            <ul>
              {item.rental_option.map(option => (
                <li key={option.tenure}>
                  {option.tenure} months : {option.ratepermonth} per month
                </li>
              ))}
            </ul>
            <div>Condition : {item.condition}</div>
            <div>Delivered by: 8-10 days</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetails;
