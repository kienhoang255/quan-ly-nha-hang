import { useLocation, Navigate, Outlet } from 'react-router-dom';

import React from 'react';
import { useStore } from '~/store';
import { isRequiredStaff } from '~/utils/specialRoute';
import { getToLocalStorage } from '~/utils/saveToBrowser';

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();

    const isRoles = getToLocalStorage('user').role === allowedRoles;
    const isLogin = document.cookie === '';

    return (
        <>
            {isRoles ? (
                <Outlet />
            ) : isLogin ? (
                <Navigate to="/login" state={{ from: location }} replace />
            ) : (
                <Navigate to="/" state={{ from: location }} replace />
            )}
        </>
    );
};

export default RequireAuth;
