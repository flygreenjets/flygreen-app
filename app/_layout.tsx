import {Stack} from "expo-router";
import { StatusBar } from 'expo-status-bar';
import {AuthProvider, useAuth} from "@/providers/AuthProvider";
import Splash from "@/components/pages/Splash";
import {Colors} from "@/utils/Colors";
import {useEffect, useState} from "react";
import {isConnected} from "@/lib/api/ApiFactory";
import * as Sentry from '@sentry/react-native';
import {NotificationsProvider} from "@/providers/NotificationsProvider";
import NetInfo from '@react-native-community/netinfo';

Sentry.init({
  enabled: !__DEV__,
  dsn: 'https://2b28e77adcc0ec2a0f408add6ffec00e@o4505370587299840.ingest.us.sentry.io/4510024505229312',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
    return (
        <AuthProvider>
            <NotificationsProvider>
                <StatusBar style="dark" />
                <Splash />
                <RootNavigator />
            </NotificationsProvider>
        </AuthProvider>
    )
});

function RootNavigator() {
    const {token} = useAuth();
    const [connected, setConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setConnected(state.isConnected as boolean);
        });

        return () => unsubscribe();
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
                    title: "Offline mode.",
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
                    <Stack.Screen
                        name="web-viewer"
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