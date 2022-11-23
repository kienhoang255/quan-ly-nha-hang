import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

export const ProtectRoute = () => {
    const isLogin = document.cookie === '';

    return <>{isLogin ? <Navigate to="/" /> : <Outlet />}</>;
};

export const IsLogged = () => {
    const isLogin = document.cookie === '';

    return <>{isLogin ? <Outlet /> : <Navigate to="/home" />}</>;
};
