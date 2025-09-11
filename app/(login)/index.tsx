import {
    Text,
    Pressable,
    StyleSheet,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {Formik} from "formik";
import {useAuth} from "@/providers/AuthProvider";
import {Colors} from "@/utils/Colors";
import {Image} from "expo-image";
import {useState} from "react";
import SpinnerLoading from "@/components/animations/SpinnerLoading";
import * as Yup from 'yup';

export default function LoginPage() {
    const {login} = useAuth();
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState(false);
    async function submit(values: {email: string, password: string}) {
        setLoading(true);
        setAuthError(false);
        const success = await login(values.email, values.password)
        setLoading(false);
        if (!success) {
            setAuthError(true);
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                    <View style={styles.container}>
                        <Image
                            style={{width: "100%", height: 125, alignSelf: 'center', marginVertical: 50}}
                            source={"https://cdn.flygreen.co/app-resources/logo-flygreen-full.png"}
                            contentFit="contain"
                            transition={1000}
                        />
                        <Formik
                            initialValues={{email: '', password: ''}}
                            onSubmit={submit}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email('Invalid email').required('Email is required'),
                                password: Yup.string().required('Password is required'),
                            })}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, errors, submitCount}) => (
                                <KeyboardAvoidingView
                                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                                >
                                    {authError && (
                                        <View style={{marginBottom: 10}}>
                                            <Text style={{color: 'red'}}>Invalid email or password</Text>
                                        </View>
                                    )}
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
                                        autoCapitalize="none"
                                    />
                                    {loading ? (
                                        <SpinnerLoading/>
                                    ) : (
                                        <>
                                            {errors && submitCount > 0 && (
                                                <View style={{marginBottom: 10}}>
                                                    {errors.email && <Text style={{color: 'red'}}>{errors.email}</Text>}
                                                    {errors.password && <Text style={{color: 'red'}}>{errors.password}</Text>}
                                                </View>
                                            )}
                                            <Pressable onPress={() => {handleSubmit()}}>
                                                <Text style={styles.loginButton}>Login</Text>
                                            </Pressable>
                                            <Pressable onPress={() => {router.push('/(login)/register')}}>
                                                <Text style={styles.registerLink}>Don't have an account? Register</Text>
                                            </Pressable>
                                        </>
                                    )}
                                </KeyboardAvoidingView>
                            )}
                        </Formik>
                    </View>
                </TouchableWithoutFeedback>
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
