import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const handleCheckout = () => {
    const invoices = cartItems.map(item => ({
      
      status: "ORDERED",
      product: item.id
    }));
  
    // Make a POST request to the /invoices endpoint
    fetch('http://localhost:8000/invoice/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invoices)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Order submitted:', data);
      // Redirect to the orders page
      window.location.href = '/orders';
    })
    .catch(error => {
      console.error('Error submitting order:', error);
    });
  };
  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {cartItems.length > 0 ? (
        <div>
        <ol>
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-name">
              <p>{item.name}</p>
              <p>{item.rental_option}</p>
              <p>Quantity : {item.quantity}</p>
              </div>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ol>
        <button onClick={handleCheckout}>Checkout</button>
        </div>
      ) : (
        <div>No items in the cart</div>
      )}
    </div>
  );
};

export default Cart;
