import {Text, Pressable, StyleSheet, View, TextInput} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {Colors} from "@/utils/Colors";
import {Image} from "expo-image";
import {Formik} from "formik";
import {useState} from "react";
import SpinnerLoading from "@/components/animations/SpinnerLoading";
import {useAuth} from "@/providers/AuthProvider";

interface RegisterFormValues {
    email: string;
    password: string;
    passwordConfirm: string;
}

export default function Register() {
    const [loading, setLoading] = useState(false);
    const {register} = useAuth();
    const [registrationFormSent, setRegistrationFormSent] = useState(false);
    async function submit(values: RegisterFormValues) {

    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={styles.container}>
                    <Image
                        style={{width: "100%", height: 125, alignSelf: 'center', marginVertical: 50}}
                        source={"https://cdn.flygreen.co/app-resources/logo-flygreen-full.png"}
                        contentFit="contain"
                        transition={1000}
                    />
                    <Text style={styles.title}>Registration Form</Text>
                    <Formik initialValues={{email: '', password: '', passwordConfirm: ''}} onSubmit={submit}>
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                            <View>
                                <TextInput
                                    placeholderTextColor={Colors.lightGray}
                                    style={styles.input}
                                    placeholder="Email"
                                    value={values.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                                <TextInput
                                    placeholderTextColor={Colors.lightGray}
                                    style={styles.input}
                                    placeholder="Password"
                                    secureTextEntry
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                                <TextInput
                                    placeholderTextColor={Colors.lightGray}
                                    style={styles.input}
                                    placeholder="Confirm Password"
                                    secureTextEntry
                                    onChangeText={handleChange('passwordConfirm')}
                                    onBlur={handleBlur('passwordConfirm')}
                                    value={values.passwordConfirm}
                                />
                                {loading ? (
                                    <SpinnerLoading/>
                                ) : (
                                    <>
                                        <Pressable onPress={() => {handleSubmit()}}>
                                            <Text style={styles.loginButton}>Register</Text>
                                        </Pressable>
                                        <Pressable onPress={() => {
                                            router.back();
                                        }}>
                                            <Text style={styles.goBackLink}>Go Back</Text>
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
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 20
    },
    input: {
        height:60,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: Colors.black
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
    goBackLink: {
        color: '#007AFF',
        textAlign: 'center',
        marginTop: 30
    },
});