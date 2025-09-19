import {
    Text,
    Pressable,
    StyleSheet,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView, Platform
} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {Colors} from "@/utils/Colors";
import {Image} from "expo-image";
import {Formik} from "formik";
import {useState} from "react";
import SpinnerLoading from "@/components/animations/SpinnerLoading";
import {useAuth} from "@/providers/AuthProvider";
import * as Yup from "yup";

interface RegisterFormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirm: string;
}

export default function Register() {
    const {register} = useAuth();
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    async function submit(values: RegisterFormValues) {
        setLoading(true);
        setAuthError(false);
        const success = await register(values.name, values.email, values.phone, values.password);
        setLoading(false);
        if (success) {
            setShowConfirmation(true);
        } else {
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
                        {showConfirmation ? (
                            <View>
                                <Text style={{textAlign: 'center', marginBottom: 10, fontSize: 20}}>Thank you for registering!</Text>
                                <Text style={{textAlign: 'center', marginBottom: 20, fontSize: 16}}>Please verify your email address, and a member of our team will be in touch with you shortly afterwards.</Text>
                                <Pressable onPress={() => {router.back()}}>
                                    <Text style={styles.goBackLink}>Back to Login</Text>
                                </Pressable>
                            </View>
                        ) : (
                            <Formik
                                initialValues={{name: '', email: '', phone: '', password: '', passwordConfirm: ''}}
                                onSubmit={submit}
                                validationSchema={Yup.object().shape({
                                    name: Yup.string().required('Name is required'),
                                    email: Yup.string().email('Invalid email').required('Email is required'),
                                    phone: Yup.string(),
                                    password: Yup.string().required('Password is required'),
                                    passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
                                })}
                            >
                                {({handleChange, handleBlur, handleSubmit, values, errors, submitCount}) => (
                                    <KeyboardAvoidingView
                                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                    >
                                        <Text style={styles.title}>Registration Form</Text>
                                        {authError && (
                                            <View style={{marginBottom: 10}}>
                                                <Text style={{color: 'red'}}>Email already in use.</Text>
                                            </View>
                                        )}
                                        <TextInput
                                            placeholderTextColor={Colors.lightGray}
                                            editable={!loading}
                                            style={styles.input}
                                            placeholder="Name"
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            value={values.name}
                                            keyboardType="name-phone-pad"
                                            autoCapitalize="words"
                                            autoCorrect={false}
                                        />
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
                                            placeholder="Phone Number"
                                            onChangeText={handleChange('phone')}
                                            onBlur={handleBlur('phone')}
                                            value={values.phone}
                                            keyboardType="phone-pad"
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
                                        <TextInput
                                            placeholderTextColor={Colors.lightGray}
                                            editable={!loading}
                                            style={styles.input}
                                            placeholder="Confirm Password"
                                            secureTextEntry
                                            onChangeText={handleChange('passwordConfirm')}
                                            onBlur={handleBlur('passwordConfirm')}
                                            value={values.passwordConfirm}
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
                                                        {errors.passwordConfirm && <Text style={{color: 'red'}}>{errors.passwordConfirm}</Text>}
                                                    </View>
                                                )}
                                                <Pressable onPress={() => {handleSubmit()}}>
                                                    <Text style={styles.loginButton}>Register</Text>
                                                </Pressable>
                                                <Pressable onPress={() => {router.back()}}>
                                                    <Text style={styles.goBackLink}>Back to Login</Text>
                                                </Pressable>
                                            </>
                                        )}
                                    </KeyboardAvoidingView>
                                )}
                            </Formik>
                        )}
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