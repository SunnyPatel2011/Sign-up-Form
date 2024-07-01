import React from "react";
import './signup.css';

function SignUp () {
return (
    <>
    <div className="signup-header">
        <h2>Join Unsplash</h2>
        <p>Already have an account? <span>Login</span></p>
    </div>
    
    <div className="signup-name">
    <div className="signup-group">
        <label htmlFor="">First name</label>
        <input type="text" />
        </div>
        <div className="signup-group">
        <label htmlFor="">Last name</label>
        <input type="text" />
    </div>
    </div>
    </>
)
}
export default SignUp;