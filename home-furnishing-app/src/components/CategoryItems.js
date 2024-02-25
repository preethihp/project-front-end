import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CategoryItems.css';

const CategoryItems = () => {
  const { categoryType } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/products/${categoryType}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
          console.log(data);
        } else {
          throw new Error('Data is not an array');
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [categoryType]);

  return (
    <div>
      <header className="header">
        <div className="header-links">
          <Link to="/" >RENTFURLAX</Link>
          <Link to="/login" >Login</Link>
          <Link to="/register" >Register</Link>
        </div>
      </header>
      <h1 className='browse-category'>{categoryType} Items on Rent</h1>
      <div className="underline"></div>
      <div className="category-items-container">
      {products.map((product) => {
        const optionString = product.option.replace(/OrderedDict\(/g, '').replace(/\)/g, '');
        const rentalOptionString = product.rental_option.replace(/\[OrderedDict\(/g, '[').replace(/OrderedDict\(/g, '').replace(/\)/g, '');
        const options = JSON.parse(optionString.replace(/'/g, '"'));
        const rentalOptions = JSON.parse(rentalOptionString.replace(/'/g, '"'));
        const firstRentalOption = rentalOptions[0];
        return (
          <div key={product.id} className="product-item">
            <img src={options.imageurl} alt={product.name} />
            <div className='product-details'>
            <h3>{product.name}</h3>
            <p> {firstRentalOption.tenure} months</p>
            <p>{firstRentalOption.ratepermonth} per month</p>
            {product.id && (
              <div className="button-container">
                <Link to={`/Category/${categoryType}/${product.id}`} className="details-button">Details</Link>
              </div>
            )}
            </div>
          </div>
        );
      })}
      </div>    
    </div>
  );
};

export default CategoryItems;
