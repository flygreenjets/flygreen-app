import {Text, Pressable} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";

export default function LoginPage() {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>Login Page</Text>
                <Pressable
                    onPress={() => {
                        router.replace('/(tabs)')
                    }}
                >
                    <Text>Allo</Text>
                </Pressable>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}