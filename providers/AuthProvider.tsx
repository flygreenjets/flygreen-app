import {createContext, useContext, useMemo, useState} from 'react';
import {getApi} from "@/lib/api/ApiFactory";

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

    const login = (email: string, password: string) => {
        getApi().then(api => {
            api.fetchData('/app/auth/login', 'POST', {
                email, password
            }).then(response => {
                setToken(response.token); // Use actual token from response
                setIsAuthenticated(true); // Set authentication status
                console.log(response);
            }).catch(error => {
                console.error("Login failed", error);
            });
        });
        // setToken("mocked-token"); // Replace with actual token from login response
        // setIsAuthenticated(true); // Set authentication status
        // return "mocked-token"; // Replace with actual login logic
        return token;
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