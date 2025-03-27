import React from 'react';
import styles from './LogoutButton.module.css';
import { logout } from '../../authorizationSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthorized = useSelector((state: RootState) => state.authorization.isAuthorized);
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        console.log(isAuthorized)
    }

    return (
        <>
            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </>
    );
}

export default LogoutButton;