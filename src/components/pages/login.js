import React from "react";
import './login.css';
import { useNavigate } from "react-router-dom";

function Login () {
const navigate = useNavigate();

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
        <input type="text" />
        <label htmlFor="">Password</label>
        <input type="password"/>
    </div>
    </div>
    <div className="login-btn">
    <button>Login</button>
    </div>
    <p className="sign-up-redirect">Don't hae an account?
        &nbsp;<span onClick={() => navigate('/')}>Join</span></p>
    </>
)
}
export default Login;