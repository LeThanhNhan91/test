import React, { useState, useEffect } from "react";
import './loginTest.css';
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import usersApi from './api/usersApi';
import registerApi from './api/registerApi';
import { validateName, validatePhone, validateEmail, validateUserName } from "./formValidation";

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Trạng thái đăng nhập hoặc đăng ký
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // Loại thông báo: 'success' hoặc 'error'

    const [nameValidation, setNameValidation] = useState({ isValid: true, message: '' });
    const [phoneValidation, setPhoneValidation] = useState({ isValid: true, message: '' });
    const [emailValidation, setEmailValidation] = useState({ isValid: true, message: '' });
    const [userNameValidation, setUserNameValidation] = useState({ isValid: true, message: '' });

    // Sử dụng useEffect để quản lý việc thêm và gỡ bỏ các event listener
    useEffect(() => {
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        // Hàm thêm class "active" cho container
        const addActiveClass = () => container.classList.add("active");
        // Hàm gỡ class "active" từ container
        const removeActiveClass = () => container.classList.remove("active");

        if (registerBtn && loginBtn) {
            registerBtn.addEventListener('click', addActiveClass);
            loginBtn.addEventListener('click', removeActiveClass);
        }

        // Cleanup: Gỡ bỏ event listener khi component bị unmount
        return () => {
            if (registerBtn && loginBtn) {
                registerBtn.removeEventListener('click', addActiveClass);
                loginBtn.removeEventListener('click', removeActiveClass);
            }
        };
    }, []);

    // Hàm xử lý đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await usersApi.loginUser(userName, password);

            if (user) {
                setMessage('LOGIN SUCCESSFULLY');
                setMessageType('success');
            } else {
                setMessage('LOGIN FAILED, TRY AGAIN');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('LOGIN FAILED, TRY AGAIN');
            setMessageType('error');
        }
    }

    // Hàm xử lý đăng ký
    const handleRegister = async (e) => {
        e.preventDefault();

        const nameValidation = validateName(name);
        const phoneValidation = validatePhone(phone);
        const emailValidation = validateEmail(email);
        const userNameValidation = validateUserName(userName);

        setNameValidation(nameValidation);
        setPhoneValidation(phoneValidation);
        setEmailValidation(emailValidation);
        setUserNameValidation(userNameValidation);

        if (!nameValidation.isValid || !phoneValidation.isValid || !emailValidation.isValid || !userNameValidation.isValid) {
            setMessage('Please correct the errors and try again');
            setMessageType('error');
            return;
        }

        const apiUrl = 'https://665821525c361705264700c9.mockapi.io/api/Users/users';
        const userDetailsUrl = 'https://665821525c361705264700c9.mockapi.io/api/Users/userDetails';

        try {
            const response = await fetch(apiUrl);
            const users = await response.json();

            const userExists = users.some(u => u.userName === userName);

            if (userExists) {
                setMessage('USERNAME ALREADY EXISTS');
                setMessageType('error');
                return;
            }

            // Thêm người dùng mới
            const newUser = { userName, password };
            await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(newUser)
            });

            // Thêm thông tin chi tiết người dùng
            const userDetails = { name, email, phone, userName };
            await fetch(userDetailsUrl, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(userDetails)
            });

            setMessage('SIGNUP SUCCESSFULLY');
            setMessageType('success');
            setIsLogin(true); // Chuyển về trang đăng nhập
        } catch (error) {
            setMessage('SIGNUP FAILED');
            setMessageType('error');
        }
    }

    return (
        <div className={`container ${!isLogin ? 'active' : ''}`} id="container" >
            {
                isLogin ? (
                    <div className="form-container sign-in">
                        <form onSubmit={handleLogin}>
                            <h1>LOG IN</h1>
                            <div className="social-icons">
                                <a href="#" className="icon" style={{color: "red"}}><FaGoogle /></a>
                                <a href="#" className="icon" style={{color: "blue"}}><FaFacebookF /></a>
                            </div>
                            <span>or use your account for login</span>
                            <input
                                type="text"
                                value={userName}
                                placeholder="UserName"
                                onChange={(e) => setUserName(e.target.value)}
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
                            <button type="submit" className="signInBtn">Sign In</button>
                            {message && <p className={messageType}>{message}</p>}
                        </form>
                    </div>
                ) : (
                    <div className="form-container sign-up">
                        <form onSubmit={handleRegister}>
                            <h1>Create Account</h1>
                            <div className="social-icons">
                                <a href="#" className="icon" style={{color: "red"}}><FaGoogle /></a>
                                <a href="#" className="icon" style={{color: "blue"}}><FaFacebookF /></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input
                                type="text"
                                value={name}
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                                required
                                className={nameValidation.isValid ? '' : 'error-input'}
                            />
                            
                            <input
                                type="number"
                                value={phone}
                                placeholder="Phone"
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className={phoneValidation.isValid ? '' : 'error-input'}
                            />
                            
                            <input
                                type="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={emailValidation.isValid ? '' : 'error-input'}
                            />
                            
                            <input
                                type="text"
                                value={userName}
                                placeholder="UserName"
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                className={userNameValidation.isValid ? '' : 'error-input'}
                            />
                            
                            <input
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="signUpBtn">Sign Up</button>
                            {message && <p className={messageType}>{message}</p>}
                        </form>
                    </div>
                )
            }
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>badminton is joy</h1>
                        <p>Enter your userName password to schedule now!!</p>
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
