import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Homepage from "@/components/pages/Homepage";
import useQuery from "@/hooks/query";
import {useAuth} from "@/providers/AuthProvider";
import {useEffect} from "react";
import {HomepageResponse} from "@/types/responses";

export default function Home() {
    const {activeAccount} = useAuth();
    const {data, loading, error, refetch} = useQuery<HomepageResponse>(`/homepage/${activeAccount.id}`);

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
                        nextTrip={data?.nextConfirmedTrip}
                        nextRequestedTrip={data?.nextRequestedTrip}
                        recentDocs={data?.recentlySharedDocs ?? []}
                        notificationCount={data?.notificationCount ?? 0}
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