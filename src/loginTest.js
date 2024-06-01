import React, { useState, useEffect } from "react";
import './loginTest.css';
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { loginApi } from './api/usersApi'; 
import { registerApi } from './api/registerApi'; // Import the register API
import { validateFullName, validateEmail, validateConfirmPassword } from "./formValidation";
import { toast } from 'react-toastify';

const Login = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true); 
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); 
    const [loading, setLoading] = useState(false); 

    const [fullNameValidation, setFullNameValidation] = useState({ isValid: true, message: '' });
    const [emailValidation, setEmailValidation] = useState({ isValid: true, message: '' });
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState({ isValid: true, message: '' });

    useEffect(() => {
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        const addActiveClass = () => container.classList.add("active");
        const removeActiveClass = () => container.classList.remove("active");

        if (registerBtn && loginBtn) {
            registerBtn.addEventListener('click', addActiveClass);
            loginBtn.addEventListener('click', removeActiveClass);
        }

        return () => {
            if (registerBtn && loginBtn) {
                registerBtn.removeEventListener('click', addActiveClass);
                loginBtn.removeEventListener('click', removeActiveClass);
            }
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Email/Password is required!");
            return;
        }

        setLoading(true);
        try {
            const res = await loginApi(email, password);
            if (res && res.data.token) {
                localStorage.setItem("token", res.data.token);
                toast.success("Login successful!");
            } else if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        } catch (error) {
            toast.error("Login failed!");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const fullNameValidation = validateFullName(fullName);
        const emailValidation = validateEmail(email);
        const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);

        setFullNameValidation(fullNameValidation);
        setEmailValidation(emailValidation);
        setConfirmPasswordValidation(confirmPasswordValidation);

        if (!fullNameValidation.isValid || !emailValidation.isValid || !confirmPasswordValidation.isValid) {
            setMessage('Please correct the errors and try again');
            setMessageType('error');
            return;
        }

        setLoading(true);
        try {
            const response = await registerApi(fullName, email, password, confirmPassword);
            if (response.status === 201) {
                setMessage('SIGNUP SUCCESSFULLY');
                setMessageType('success');
                setIsLogin(true); 
            } else {
                setMessage('SIGNUP FAILED');
                setMessageType('error');
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                setMessage(error.response.data.message || 'SIGNUP FAILED');
                setMessageType('error');
            } else if (error.request) {
                // Request was made but no response received
                setMessage('No response from server');
                setMessageType('error');
            } else {
                // Something else caused the error
                setMessage(error.message);
                setMessageType('error');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`container ${!isLogin ? 'active' : ''}`} id="container">
            {isLogin ? (
                <div className="form-container sign-in">
                    <form onSubmit={handleLogin}>
                        <h1>LOG IN</h1>
                        <div className="social-icons">
                            <a href="#" className="icon" style={{ color: "red" }}><FaGoogle /></a>
                            <a href="#" className="icon" style={{ color: "blue" }}><FaFacebookF /></a>
                        </div>
                        <span>or use your account for login</span>
                        <input
                            type="text"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <a href="#">Forgot Password</a>
                        <button type="submit" className="signInBtn">
                            {loading && <i className="fas fa-sync fa-spin"></i>}
                            Sign In
                        </button>
                        {message && <p className={messageType}>{message}</p>}
                    </form>
                </div>
            ) : (
                <div className="form-container sign-up">
                    <form onSubmit={handleRegister}>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href="#" className="icon" style={{ color: "red" }}><FaGoogle /></a>
                            <a href="#" className="icon" style={{ color: "blue" }}><FaFacebookF /></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input
                            type="text"
                            value={fullName}
                            placeholder="FullName"
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className={fullNameValidation.isValid ? '' : 'error-input'}
                        />
                        {fullNameValidation.message && <p className="errorVal">{fullNameValidation.message}</p>}
                        <input
                            type="text"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={emailValidation.isValid ? '' : 'error-input'}
                        />
                        {emailValidation.message && <p className="errorVal">{emailValidation.message}</p>}
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className={confirmPasswordValidation.isValid ? '' : 'error-input'}
                        />
                        {confirmPasswordValidation.message && <p className="errorVal">{confirmPasswordValidation.message}</p>}
                        <button type="submit" className="signUpBtn">Sign Up</button>
                        {message && <p className={messageType}>{message}</p>}
                    </form>
                </div>
            )}
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>badminton is joy</h1>
                        <p>Enter your userFullName password to schedule now!!</p>
                        <button className="hidden" id="login" onClick={() => setIsLogin(true)}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>badminton is life</h1>
                        <p>Register with your personal details to use all of the site features!!</p>
                        <button className="hidden" id="register" onClick={() => setIsLogin(false)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
