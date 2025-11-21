/* 
AUTHOR: Hudson Cho
CREATED: 11.20.2025
UPDATED: 11.20.2025
DESCRIPTION:
    LoginPage page: allows for users to enter a username and password to login
*/
import React from "react";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    return (
        <div>
            <h1>Login to Studious</h1>
            <LoginForm />
        </div>
    )
}