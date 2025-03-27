import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { login, setUserFromLocalStorage } from "../../authorizationSlice";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setRole } from '../../roleSlice';

function LoginPage() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthorized = useSelector((state: RootState) => state.authorization.isAuthorized);

    useEffect(() => {
        if (isAuthorized) {
            navigate('/home');
        } else {
            dispatch(setUserFromLocalStorage());
        }
    }, [isAuthorized, dispatch, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            alert('Please provide valid username and password');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7145/api/User/Login',
                {
                    username,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data && response.data.token) {
                const user = {
                    username,
                    email: response.data.email,
                    role: response.data.role,
                    token: response.data.token,
                };

                dispatch(login(user));
                dispatch(setRole(user.role));

                localStorage.setItem('user', JSON.stringify(user));

                navigate('/home');
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            alert('Error logging in');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <h1 className={styles.uvitanie}>Kaufland Inventory API </h1>
                <p className={styles.loginInfo}>To Login please provide valid Username and Password</p>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username"></label>
                        <input className={styles.loginInput} placeholder={"username"} type="text" id="username" ref={usernameRef} />
                    </div>
                    <div>
                        <label htmlFor="password"></label>
                        <input className={styles.loginInput} placeholder={"password"} type="password" id="password" ref={passwordRef} />
                    </div>
                    <button className={styles.loginButton} type="submit">Prihlasenie</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;