import {StyleSheet, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text>Home</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
        paddingBottom: 0,
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingTop: 5,
        height: "100%"
    }
});