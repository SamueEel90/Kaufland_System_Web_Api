import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { login, logout, setUserFromLocalStorage } from '../authorizationSlice'

interface AuthorizationContextType {
    user: {
        username: string;
        email: string;
        role: number;
        token: string;
    } | null;
    isAuthorized: boolean;
    loginUser: (userData: { username: string; email: string; role: number; token: string }) => void;
    logoutUser: () => void;
}

const AuthorizationContext = createContext<AuthorizationContextType | undefined>(undefined);

export const AuthorizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const { user, isAuthorized } = useSelector((state: RootState) => state.authorization);

    useEffect(() => {
        dispatch(setUserFromLocalStorage());
    }, [dispatch]);

    const loginUser = (userData: { username: string; email: string; role: number; token: string }) => {
        dispatch(login(userData));
    };

    const logoutUser = () => {
        dispatch(logout());
    };

    return (
        <AuthorizationContext.Provider value={{ user, isAuthorized, loginUser, logoutUser }}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export const useAuthorization = () => {
    const context = useContext(AuthorizationContext);
    if (!context) {
        throw new Error('useAuthorization must be used within an AuthorizationProvider');
    }
    return context;
};
