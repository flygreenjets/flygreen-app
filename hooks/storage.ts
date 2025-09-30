import  { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseStateHook<T> = [{loading: boolean; data: T}, (value: T | string) => void];
function useAsyncState<T>(
    initialValue: {loading: boolean; data: T | string} = {loading: true, data: ''},

): UseStateHook<T> {
    return useReducer(
        (state: {loading: boolean; data: T | string}, action: T | string = ""): {loading: boolean; data: T | string} => ({loading: false, data: action}),
        initialValue
    ) as UseStateHook<T>;
}

export function useSecureStorageState(key: string): UseStateHook<string> {
    const [state, setState] = useAsyncState<string>();

    useEffect(() => {
        SecureStore.getItemAsync(key).then(value => {
            if (value == null) {
                console.warn(`No value found for key: ${key}`);
            }
            setState(value as string);
        });
    }, [key]);

    // Set
    const setValue = useCallback(
        (value: string | null) => {
            setState(value ?? '');
            if (value == null) {
                SecureStore.deleteItemAsync(key);
            } else {
                SecureStore.setItemAsync(key, value);
            }
        },
        [key]
    );

    return [state, setValue];
}

export function useStorageState<T>(key: string): UseStateHook<T> {
    const [state, setState] = useAsyncState<any>();

    useEffect(() => {
        AsyncStorage.getItem(key).then(value => {
            let parsedValue: any = '';
            try {
                parsedValue = value ? JSON.parse(value) : '';
            } catch (error) {}
            setState(parsedValue);
        }).catch(error => {
            console.error(`Error fetching ${key} from AsyncStorage:`, error);
        });
    }, [key]);

    // Set
    const setValue = useCallback(
        (value: any | null) => {
            setState(value ?? '');
            if (value === null) {
                AsyncStorage.removeItem(key).catch(error => {
                    console.error(`Error removing ${key} from AsyncStorage:`, error);
                });
            } else {
                AsyncStorage.setItem(key, JSON.stringify(value)).catch(error => {
                    console.error(`Error setting ${key} in AsyncStorage:`, error);
                });
            }
        },
        [key]
    );

    return [state, setValue];
}
