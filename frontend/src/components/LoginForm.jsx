/* 
AUTHOR: Hudson Cho
CREATED: 11.20.2025
UPDATED: 11.20.2025
DESCRIPTION:
    LoginForm component: renders username/password input fields and handles
    form submissions for login
*/

import { useState } from "react";

export default function Loginform() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // runs when the user submits the form
    const handleSubmit = async (e) => {
        // stops the browser from reloading the ppage
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                console.error("Login failed:", data.error);
                return;
            }

            console.log("Login successful. Token = ", data.token);

            localStorage.setItem("token", data.token);
        }
        catch (err) {
            console.error("Error connecting to backend:", err);
        }
   }


    // renders a login form with controlled inputs
    return (
        <form onSubmit={handleSubmit}>
        
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    )
}