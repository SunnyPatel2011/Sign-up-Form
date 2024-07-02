import React from "react";
import './signup.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const namepattern = /^[A-Za-z]+$/;
    const emailpattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSignUp = () => {
        if(!firstName || !lastName || !email || !username ||!password){
            alert("please fill out all the feilds.");
            return;
        }

        if(!namepattern.test(firstName) || !namepattern.test(lastName)) {
            alert("First and Last names can only contain letters.");
            return;
        }
        if(!emailpattern.test(email)){
            alert("enter valid email");
            return;
        }

        const userData = {firstName, lastName, email, username, password };

        const existingUsers = JSON.parse(localStorage.getItem('userData')) || [];

        existingUsers.push(userData);

        localStorage.setItem('userData', JSON.stringify(existingUsers));

        navigate('/');
    }


    return (
        <>
            <div className="signup-header">
                <h2>Join Unsplash</h2>
                <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
            </div>

            <div className="signup-name">
                <div className="signup-group">
                    <label htmlFor="">First name</label>
                    <input type="text"
                        id="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        pattern={namepattern.source}
                        title="First name can only contain letters." />
                </div>

                <div className="signup-group">
                    <label htmlFor="">Last name</label>
                    <input type="text"
                        id="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        pattern={namepattern.source}
                        title="Last name can only contain letters." />
                </div>
            </div>

            <div className="signup-next">
                <label htmlFor="">Email</label>
                <input type="text"
                    id="email-name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern={emailpattern.source}
                    title="Enter a valid email." />

                <label htmlFor="">Username</label>
                <input type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="">Password</label>
                <input type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="signup-btn">
                <button onClick={handleSignUp}>Sign up</button>
            </div>
        </>
    )
}
export default SignUp;