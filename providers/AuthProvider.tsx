import {createContext, useContext, useMemo, useState} from 'react';
import {getApi} from "@/lib/api/ApiFactory";
import {useSecureStorageState, useStorageState} from "@/hooks/storage";
import {Account, User} from "@/types/types";

interface AuthContextProps {
    token: string;
    activeAccount: Account;
    user: User,
    isAuthenticated: boolean;
    loading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    setActiveAccount: (account: Account) => void;
}


const AuthContext = createContext<AuthContextProps>({
    token: "",
    activeAccount: {id: 0, name: '', loyaltyPoints: 0, cashbackBalance: 0, agent: {id: 0, name: '', shortName: '', phone: '', email: ''}, nextLoyaltyTierThreshold: 1, loyalty: {id: 0, name: '', threshold: 0, imageUrl: ""}, isMainAccount: false},
    user: {id: 0, name: '', email: '', accounts: []},
    isAuthenticated: false,
    loading: false,
    login: () => {return Promise.resolve(false);},
    logout: () => {},
    setActiveAccount: () => {}
});

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [{data: token, loading}, setToken] = useSecureStorageState('session');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [{data: user}, setUser] = useStorageState<User>('user');
    const [{data: activeAccount}, setActiveAccount] = useStorageState<Account>('active-account');

    const login = async (email: string, password: string) => {
        try {
            setUser('');
            setToken('');
            const api = await getApi();
            const {token, user}: {
                token: string;
                user: User;
            } = await api.fetchData('/auth/login', 'POST', {
                email, password
            });
            setToken(token); // Use actual token from response
            setUser(user); // Use actual user data from response
            setActiveAccount(user.accounts.find(acc => acc.isMainAccount) || user.accounts[0]);
            setIsAuthenticated(true); // Set authentication status
            return true;
        } catch (error: any) {
            console.error("Login failed", error.message);
            return false;
        }
    }

    const logout = () => {
        setToken('');
        setIsAuthenticated(false);
    }

    const contextValue = useMemo(() => ({
        token,
        activeAccount,
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        setActiveAccount
    }), [token, user, isAuthenticated, loading, login, logout, activeAccount, setActiveAccount]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
