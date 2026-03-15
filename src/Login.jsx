import { useState } from "react";
import styles from './Login.module.css'


const URL = "https://journal-app-backend-soa3.onrender.com/public/login";


export const Login = ({onSwitch, onLoginSuccess}) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const updateCredentials = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        setError("");
        event.preventDefault();
        if(credentials.username.trim().length === 0 || credentials.password.trim().length === 0) {
            return;
        }
        try {
            const response = await fetch(URL,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    "username":credentials.username,
                    "password":credentials.password
                })
            });
            if(!response.ok) {
                const message = await response.text();
                setError(message);
                return;
            }
            const token = await response.text();
            localStorage.setItem("token", token);
            onLoginSuccess();
        }
        catch (error) {
            console.log(error);
            setError("Network error. Please try again.");
        }
    }

    return(
        <div className={styles.header}>
            <div className={styles.loginBox}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Username</label>
                        <input type="text" name="username" value={credentials.username} onChange = {updateCredentials} placeholder="Type your username"/>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input type="password" name="password" value={credentials.password} onChange={updateCredentials} placeholder="Type your password"/>
                    </div>
                    {error && (
                        <p className={styles.errorMessage}>
                            {error}
                        </p>
                    )}
                    <div className={styles.formActions}>
                        <button type="submit">Login</button>
                    </div>
                </form>
                <p>Don't have an account? <a href="" onClick={onSwitch}>Sign Up</a></p>
            </div>
        </div>
    );
};