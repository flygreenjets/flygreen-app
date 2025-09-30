import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Colors} from "@/utils/Colors";

export default function GradientContainer({children}: {children: React.ReactNode}) {
    return (
            <LinearGradient
                colors={[Colors.flygreenGreenOpacity, Colors.white]}
                style={styles.background}
                locations={[0.001, 0.2]}
            >
                {children}
            </LinearGradient>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
    },
    background: {
        height: '100%',
    },
    button: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
    },
});
