import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateUser.module.css';

interface User {
    username: string;
    email: string;
    password: string;
    rola: number;
}
const API_URL = 'https://localhost:7145/api/User/CreateUser';
function CreateUser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(1);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Selected role before submitting:", role);
        setIsLoading(true);
        setError('');

        // Validation
        if (!username || !email || !password || !role) {
            setError('All fields are required!');
            setIsLoading(false);
            return;
        }

        const userData: User = { username, email, password, rola: role };
        console.log("User data sent to API:", userData);

        try {
            const response = await axios.post(API_URL, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                alert('User created successfully!');
                setUsername('');
                setEmail('');
                setPassword('');
                setRole(1);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setError('There was an error creating the user. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create User</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.label}>Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                        placeholder="Enter username"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        placeholder="Enter email"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="Enter password"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="role" className={styles.label}>Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(Number(e.target.value))}
                        className={styles.select}
                    >
                        <option value={1}>VOD</option>
                        <option value={2}>VST</option>
                        <option value={3}>PPO</option>
                    </select>

                </div>

                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </div>
    );
}

export default CreateUser;