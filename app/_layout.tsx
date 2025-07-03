import {Stack} from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {

    return (
        <>
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
        </>
    )
}
