import {Text, Pressable, StyleSheet, View, TextInput} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {Formik} from "formik";
import {useAuth} from "@/providers/AuthProvider";

export default function LoginPage() {
    const {login} = useAuth();

    function submit(values: {email: string, password: string}) {
        const success = login(values.email, values.password)
        if (success) {
            router.replace('/(tabs)');
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>Login Page</Text>
                <Formik initialValues={{email: '', password: ''}} onSubmit={submit}>
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <>
                            <TextInput placeholder="Email" onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
                            <TextInput placeholder="Password" secureTextEntry onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
                            <Pressable onPress={() => {handleSubmit()}} style={{backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginTop: 10}}>
                                <Text style={{color: '#fff', textAlign: 'center'}}>Login</Text>
                            </Pressable>
                            <Pressable onPress={() => {router.push('/(login)/register')}} style={{marginTop: 10}}>
                                <Text style={{color: '#007AFF', textAlign: 'center'}}>Don't have an account? Register</Text>
                            </Pressable>
                        </>
                    )}
                </Formik>

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