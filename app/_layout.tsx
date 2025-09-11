import {Stack} from "expo-router";
import { StatusBar } from 'expo-status-bar';
import {AuthProvider, useAuth} from "@/providers/AuthProvider";
import Splash from "@/components/pages/Splash";
import {SafeAreaView} from "react-native-safe-area-context";
import OfflineBanner from "@/components/ui/OfflineBanner";
import {Colors} from "@/utils/Colors";
import {useEffect, useState} from "react";
import {isConnected} from "@/lib/api/ApiFactory";

export default function RootLayout() {
    return (
        <AuthProvider>
            <StatusBar style="dark" />
            <Splash />
            <RootNavigator />
        </AuthProvider>
    )
}

function RootNavigator() {
    const {token} = useAuth();
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const init = async () => {
            const status = await isConnected();
            setConnected(status);
        }
        init();
    }, []);

    return (
        <>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.gold,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    title: "Offline. Data might be outdated.",
                    headerBackVisible: false
                }}

            >
                <Stack.Protected
                    guard={Boolean(token)}
                >
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: !connected }}
                    />
                    <Stack.Screen
                        name="trip"
                        options={{headerShown: !connected}}
                    />
                    <Stack.Screen
                        name="notifications"
                        options={{headerShown: !connected}}
                    />
                    <Stack.Screen
                        name="trip-sheet"
                        options={{headerShown: !connected}}
                    />
                </Stack.Protected>
                <Stack.Protected guard={!Boolean(token)}>
                    <Stack.Screen
                        name="(login)"
                        options={{ headerShown: !connected }}
                    />
                </Stack.Protected>
            </Stack>
        </>
    )
}
