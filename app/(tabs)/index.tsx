import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Homepage from "@/components/pages/Homepage";
import useQuery from "@/hooks/query";
import {useAuth} from "@/providers/AuthProvider";
import {HomepageResponse} from "@/types/responses";
import {useNotifications} from "@/providers/NotificationsProvider";
import {useEffect} from "react";

export default function Home() {
    const {activeAccount} = useAuth();
    const {data, loading, refetch} = useQuery<HomepageResponse>(`/homepage/${activeAccount.id}`);
    const {setBadgeCount} = useNotifications();

    useEffect(() => {
        if (!loading) {
            setBadgeCount(data?.notificationCount ?? 0);
        }
    }, [data]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={{paddingBottom: 30, paddingHorizontal: 20}}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={refetch} />
                    }
                >
                    <Homepage
                        activeAccount={data?.activeAccount ?? null}
                        nextTrip={data?.nextConfirmedTrip}
                        nextRequestedTrip={data?.nextRequestedTrip}
                        recentDocs={data?.recentlySharedDocs ?? []}
                    />
                </ScrollView>
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