import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthorization } from './Context/AuthorizationContext';

const ProtectedRoute: React.FC = () => {
    const { isAuthorized } = useAuthorization();

    return isAuthorized ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;