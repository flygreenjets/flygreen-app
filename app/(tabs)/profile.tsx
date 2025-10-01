import ProfilePage from '@/components/pages/ProfilePage';
import { StyleSheet } from 'react-native';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Colors} from "@/utils/Colors";
import {useAuth} from "@/providers/AuthProvider";
import {useEffect} from "react";

export default function Tab() {
    const {refreshUser, activeAccount} = useAuth();
    useEffect(() => {
        refreshUser(activeAccount?.id?.toLocaleString());
    }, []);

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
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingTop: 5,
        height: "100%"
    }
});