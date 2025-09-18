import {createContext, useContext, useMemo, useState} from 'react';
import {getApi} from "@/lib/api/ApiFactory";
import {useSecureStorageState, useStorageState} from "@/hooks/storage";
import {Account, User} from "@/types/types";
import {useNotifications} from "@/providers/NotificationsProvider";
import {ExpoPushToken} from "expo-notifications";

interface AuthContextProps {
    token: string;
    activeAccount: Account;
    user: User,
    isAuthenticated: boolean;
    loading: boolean;
    login: (username: string, password: string, expoPushToken: ExpoPushToken | undefined) => Promise<boolean>;
    logout: () => void;
    register: (username: string, password: string) => Promise<boolean>;
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
    register: () => Promise.resolve(false),
    setActiveAccount: () => {}
});

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [{data: token, loading}, setToken] = useSecureStorageState('session');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [{data: user}, setUser] = useStorageState<User>('user');
    const [{data: activeAccount}, setActiveAccount] = useStorageState<Account>('active-account');

    if (token && (!user || !activeAccount)) {
        setToken('');
        setUser('');
        setIsAuthenticated(false);
    }

    const login = async (email: string, password: string, expoPushToken: ExpoPushToken | undefined) => {
        try {
            setUser('');
            setToken('');
            const api = await getApi();
            const {token, user}: {
                token: string;
                user: User;
            } = await api.fetchData('/auth/login', 'POST', {
                email, password, token: expoPushToken?.data ?? ''
            });
            setToken(token); // Use actual token from response
            setUser(user); // Use actual user data from response
            setActiveAccount(user.accounts.find(acc => acc.isMainAccount) || user.accounts[0]);
            setIsAuthenticated(true); // Set authentication status
            return true;
        } catch (error: any) {
            alert(error.message);
            console.error("Login failed", error.message);
            return false;
        }
    }

    const register = async (email: string, password: string) => {
        return false;
    }

    const logout = async () => {
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
        register,
        setActiveAccount
    }), [token, user, isAuthenticated, loading, login, logout, register, activeAccount, setActiveAccount]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
