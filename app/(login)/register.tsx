import {Text, Pressable, StyleSheet, View, TextInput} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";

export default function Register() {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>Register Page</Text>
                <Text>Please register to continue.</Text>
                <Pressable onPress={() => {
                    router.back();
                }}>
                    <Text style={{color: '#007AFF', textAlign: 'center'}}>Go Back</Text>
                </Pressable>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}