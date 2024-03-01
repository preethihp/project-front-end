import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './AuthSlice';
import { Link } from 'react-router-dom';

const Login = () => {
    
        const dispatch = useDispatch();
        const navigate = useNavigate();
        
        const [formData, setFormData] = useState({ username: '', password: '' });
      
        const HandelChange= (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          dispatch(loginUser(formData));
        };
        const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
        if (isAuthenticated) {
          navigate('/dashboard'); // Redirect if user is already authenticated
        }
    
      
    
    return (
        <div className="login">
        <header className="header">
           <div className="header-links">
                <Link exact to="/" >RENTFURLAX</Link>
                <Link  to="/login" >Login</Link>
                <Link to="/register" >Register</Link>
            </div>
        </header>
        <div className="body">
        {/* <h2>Please Login</h2> */}
        <form className="loginform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text"  placeholder="Enter Username" id="inp" value={formData.username} onChange={HandelChange} name='username'/>
        <label>Password</label>
        <input type="password" placeholder="Enter Password" id="inp" value={formData.password} onChange={HandelChange} name='password'/>
        <label></label>
        <button type="submit" >LOGIN</button>
        </form>
        </div>
        </div>
    );
}

export default Login;
 