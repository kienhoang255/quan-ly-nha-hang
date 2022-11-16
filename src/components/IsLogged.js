import { Navigate, Outlet } from 'react-router-dom';
import { isRequiredStaff } from '~/utils/specialRoute';
import React from 'react';

const IsLogged = () => {
    const isLogin = document.cookie !== '';

    return <>{isLogin ? <Navigate to={isRequiredStaff() ? '/info' : '/'} /> : <Outlet />}</>;
};

export default IsLogged;
