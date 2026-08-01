import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom' // Iska hubi react-router-dom
import api from '../../lib/auth/apiClient'
import useAuthStore from '../../lib/store/useAuthStore'

const ProtectedRoute = ({ children }) => {
    const { user, setAuth, clearAuth, token } = useAuthStore();

    // 1. Haddii uusan token jirin, isla markiiba u dir Login (API request xitaa ma ordayo)
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const { data, isLoading, isError, error } = useQuery({
        // Add token to queryKey so it refetches when token changes!
        queryKey: ["currentUser", token], 
        queryFn: async () => {
            const response = await api.get("/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        },
        enabled: !!token, // Ma ordayo illaa uu token jiro
        retry: false,     // Wax ka beddel 1 ka dhig false si uusan 401 kuugu laulaugin
    });

    // Handle Auth Profile Updates
    useEffect(() => {
        if (data) {
            // Badanaaba profile endpoint wuxuu soo celiyaa user data oo kaliya
            setAuth(data.user || data, token); 
        }
    }, [data, token, setAuth]);

    // Handle Errors (e.g. Invalid or expired token)
    useEffect(() => {
        if (isError) {
            clearAuth();
        }
    }, [isError, clearAuth]);

    // Show Loading state while fetching user profile
    if (isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader className='animate-spin w-8 h-8 text-primary' />
            </div>
        );
    }

    // Redirect to login if API fails or token is invalid
    if (isError) {
        console.log("Profile Fetch Error:", error);
        return <Navigate to="/login" replace />;
    }

    // If user state is not hydrated yet, show loader instead of immediately kicking them to /login
    if (!user) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader className='animate-spin w-8 h-8 text-primary' />
            </div>
        );
    }

    return children;
}

export default ProtectedRoute;