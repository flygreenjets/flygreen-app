import {StyleSheet, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ProfilePage from "@/components/pages/ProfilePage";
import {Colors} from "@/utils/Colors";

export default function Home() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ProfilePage />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
        paddingBottom: 0,
        backgroundColor: Colors.white
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingTop: 5,
        height: "100%"
    }
});