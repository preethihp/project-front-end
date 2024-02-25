import React, { useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from  "formik";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = (values, { setSubmitting }) => {
    
        axios.post('http://localhost:8000/login/', values)
        
            .then(response => {
                console.log(response);
                setSubmitting(false);
                navigate( "/dashboard" );
                //console.log("Navigating to dashboard");
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                setSubmitting(false);
                setErrorMessage('Invalid username or password');
            });
            //console.log(values);
    };
    
    return (
    <div>
        <header className="header">
        <div className="header-links">
          <Link exact to="/" >RENTFURLAX</Link>
          <Link  to="/login" >Login</Link>
          <Link to="/register" >Register</Link>
        </div>
      </header>
        <h1>Please Login</h1>
    
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Formik
            initialValues={{ username: '', password: '' }}
            validate={values => {
            const errors = {};
                if (!values.username) {
                    errors.username = 'Username is required';
                }
                if (!values.password) {
                    errors.password = 'Password is required';
                }
                return errors;
            }}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
            <Form>
                <ErrorMessage name="username" component="div" />
                <label htmlFor="username">Username</label>
                
                <Field type="text" name="username" />
                
                <ErrorMessage name="password" component="div" />
                <label htmlFor="password">Password</label>
                
                <Field type='password' name="password" />
                
                
                <button type="submit" disabled={isSubmitting}>
                Login
                </button>
            </Form>
            )}
        </Formik>
    </div>
    );
    }
    
    export default Login;
    