import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login.js';
import Register from './components/Register';
import ItemDetails from './components/ItemDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/item/:id" element={<ItemDetails/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/orders" element={<Orders/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}


export default App;
