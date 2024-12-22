import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosFetch from '@/lib/axios';

type AuthContextType = {
    user: any | undefined,
    loading: boolean,
    isLoggedIn: () => boolean
}

const initialState = {
    user: undefined,
    loading: false,
    isLoggedIn: () => false
}

const AuthContext = createContext<AuthContextType>(initialState);

export const useAuthContext = () => {
    return useContext(AuthContext);
}

const AuthContextProvider = ({ children }: any) => {
    
    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            if(!localStorage.getItem('access_token') || !localStorage.getItem("refresh_token")) return

            const response = await axiosFetch.get('/auth/checkUser').catch(() => undefined)

            if(!response) return;

            return response.data;
        },
    })

    const isLoggedIn = () => {
        // just check if user exist or not
        return user ? true : false
    }

    const value = {
        user,
        loading: isLoading,
        isLoggedIn,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;