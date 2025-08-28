import {Text, Pressable, StyleSheet, View, TextInput} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {Formik} from "formik";
import {useAuth} from "@/providers/AuthProvider";
import {Colors} from "@/utils/Colors";
import {Image} from "expo-image";
import {useState} from "react";
import SpinnerLoading from "@/components/animations/SpinnerLoading";

export default function LoginPage() {
    const {login} = useAuth();
    const [loading, setLoading] = useState(false);
    async function submit(values: {email: string, password: string}) {
        setLoading(true);
        const success = await login(values.email, values.password)
        setLoading(success);
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
                <View style={styles.container}>
                    <Image
                        style={{width: "100%", height: 125, alignSelf: 'center', marginVertical: 50}}
                        source={"https://cdn.flygreen.co/app-resources/logo-flygreen-full.png"}
                        contentFit="contain"
                        transition={1000}
                    />
                    <Formik initialValues={{email: '', password: ''}} onSubmit={submit}>
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                            <View>
                                <TextInput
                                    placeholderTextColor={Colors.lightGray}
                                    editable={!loading}
                                    style={styles.input}
                                    placeholder="Email"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <TextInput
                                    placeholderTextColor={Colors.lightGray}
                                    editable={!loading}
                                    style={styles.input}
                                    placeholder="Password"
                                    secureTextEntry
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                                {loading ? (
                                    <SpinnerLoading/>
                                ) : (
                                    <>
                                        <Pressable onPress={() => {handleSubmit()}}>
                                            <Text style={styles.loginButton}>Login</Text>
                                        </Pressable>
                                        <Pressable onPress={() => {router.push('/(login)/register')}}>
                                            <Text style={styles.registerLink}>Don't have an account? Register</Text>
                                        </Pressable>
                                    </>
                                )}
                            </View>
                        )}
                    </Formik>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: Colors.white,
        padding: 20,
    },
    loginButton: {
        color: Colors.white,
        textAlign: 'center',
        backgroundColor: Colors.flygreenGreen,
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        fontSize: 18,
    },
    registerLink: {
        color: '#007AFF',
        textAlign: 'center',
        marginTop: 30
    },
    input: {
        height:60,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    }
});