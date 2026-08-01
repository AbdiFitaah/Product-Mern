import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../../lib/auth/apiClient'
import useAuthStore from '../../lib/store/useAuthStore'

const ProtectedAdmin = ({ children }) => {
    const { user, setAuth, clearAuth, token } = useAuthStore();

    // 1. Haddii uusan Token lahayn, toos leexi /login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["currentUser", token], 
        queryFn: async () => {
            const response = await api.get("/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        },
        enabled: !!token, 
        retry: 1,
    });

    useEffect(() => {
        if (data) {
            setAuth(data.user || data, token); 
        }
    }, [data, token, setAuth]);

    useEffect(() => {
        if (isError) {
            clearAuth();
        }
    }, [isError, clearAuth]);

    // 2. Muuji Loading marka xogta la soo jiidayo
    if (isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader className='animate-spin w-8 h-8 text-primary' />
            </div>
        );
    }

    if (isError) {
        console.log("Profile Fetch Error:", error);
        return <Navigate to="/login" replace />;
    }

    if (!user) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader className='animate-spin w-8 h-8 text-primary' />
            </div>
        );
    }

    if (user.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedAdmin;