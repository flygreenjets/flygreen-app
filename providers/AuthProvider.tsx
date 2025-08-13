import {createContext, useContext, useMemo, useState} from 'react';

interface AuthContextProps {
    token: string;
    isAuthenticated: boolean;
    login: (username: string, password: string) => string;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    token: "",
    isAuthenticated: false,
    login: () => "",
    logout: () => {}
});

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (username: string, password: string) => {
        //@todo implement actual login logic
        setToken("mocked-token"); // Replace with actual token from login response
        return "mocked-token"; // Replace with actual login logic
    }

    const logout = () => {
        //@todo implement actual login logic
        setToken(""); // Replace with actual token from login response
        setIsAuthenticated(false); // Set authentication status
    }

    const contextValue = useMemo(() => ({
        token,
        isAuthenticated,
        login,
        logout
    }), [token, isAuthenticated, login, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}