import React, { useState } from "react";
import './login.css';
import { useNavigate } from "react-router-dom";

function Login () {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('userData')) || [];
    
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        navigate('/');
    } else {
        alert("Invalid email or password");
    }
}


return (
    <>
    <div className="login-header">
    <h2>Login</h2>
    <p>Welcome Back</p>
    <h6>OR</h6>
    </div>

    <div className="login-main">
    <div className="login-form">
        <label htmlFor="">Email</label>
        <input type="text" 
        id="email-name"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
    </div>
    </div>
    <div className="login-btn">
    <button onClick={handleLogin}>Login</button>
    </div>
    <p className="sign-up-redirect">Don't have an account?
        &nbsp;<span onClick={() => navigate('/signup')}>Join</span></p>
    </>
)
}
export default Login;