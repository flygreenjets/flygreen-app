import {createContext, useContext, useMemo, useState} from 'react';
import {getApi} from "@/lib/api/ApiFactory";
import * as SecureStore from 'expo-secure-store';

interface AuthContextProps {
    token: string;
    user: User,
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

interface User {
    id: number,
    name: string,
    email: string,
}

const AuthContext = createContext<AuthContextProps>({
    token: "",
    user: {id: 0, name: '', email: ''},
    isAuthenticated: false,
    login: () => false,
    logout: () => {}
});

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User>({id: 0, name: '', email: ''});

    const login = (email: string, password: string) => {
        getApi().then(api => {
            api.fetchData('/app/auth/login', 'POST', {
                email, password
            }).then(response => {
                setToken(response.token); // Use actual token from response
                SecureStore.setItemAsync('authToken', response.token); // Store token securely
                setUser(response.user); // Use actual user data from response
                setIsAuthenticated(true); // Set authentication status
                console.log(response);
            }).catch(error => {
                console.error("Login failed", error);
            });
        });
        // setToken("mocked-token"); // Replace with actual token from login response
        // setIsAuthenticated(true); // Set authentication status
        // return "mocked-token"; // Replace with actual login logic
        return isAuthenticated;
    }

    const logout = () => {
        //@todo implement actual login logic
        setToken(""); // Replace with actual token from login response
        setIsAuthenticated(false); // Set authentication status
    }

    const contextValue = useMemo(() => ({
        token,
        user,
        isAuthenticated,
        login,
        logout
    }), [token, user, isAuthenticated, login, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}