import {createContext, useContext, useMemo, useState} from 'react';
import {getApi} from "@/lib/api/ApiFactory";
import {useSecureStorageState, useStorageState} from "@/hooks/storage";

interface AuthContextProps {
    token: string;
    activeAccount: string;
    user: User,
    isAuthenticated: boolean;
    loading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

interface User {
    id: number,
    name: string,
    email: string,
}

const AuthContext = createContext<AuthContextProps>({
    token: "",
    activeAccount: "",
    user: {id: 0, name: '', email: ''},
    isAuthenticated: false,
    loading: false,
    login: () => {return Promise.resolve(false);},
    logout: () => {}
});

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [{data: token, loading}, setToken] = useSecureStorageState('session');
    const [{data: activeAccount, loading: activeAccountLoading}, setActiveAccount] = useSecureStorageState('active-account');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //const [user, setUser] = useState<User>({id: 0, name: '', email: ''});
    const [{data: user}, setUser] = useStorageState<User>('user');

    const login = async (email: string, password: string) => {
        try {
            const api = await getApi();
            const response = await api.fetchData('/app/auth/login', 'POST', {
                email, password
            });
            setToken(response.token); // Use actual token from response
            setUser(response.user); // Use actual user data from response
            setIsAuthenticated(true); // Set authentication status
            return true;
        } catch (error: any) {
            console.error("Login failed", error.message);
            return false;
        }
    }

    const logout = () => {
        //@todo implement actual login logic
        setToken(''); // Replace with actual token from login response
        setIsAuthenticated(false); // Set authentication status
    }

    const contextValue = useMemo(() => ({
        token,
        activeAccount,
        user,
        isAuthenticated,
        loading,
        login,
        logout
    }), [token, user, isAuthenticated, loading, login, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
