import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/Context'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { auth, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate('/');
        }
    }, []);

    return children
}

export default ProtectedRoute
