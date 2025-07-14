import {Stack} from "expo-router";
import { StatusBar } from 'expo-status-bar';
import {AuthProvider} from "@/providers/AuthProvider";

export default function RootLayout() {
    return (
        <AuthProvider>
            <StatusBar style="dark" />
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="trip"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="trip-sheet"
                    options={{headerShown: false}}
                />
            </Stack>
        </AuthProvider>
    )
}
