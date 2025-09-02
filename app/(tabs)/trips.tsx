import {StyleSheet, RefreshControl, ScrollView, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TripTabs from "@/components/trips/TripTabs";
import UpcomingTrips from "@/components/trips/pages/UpcomingTrips";
import {useState} from "react";
import PastTrips from "@/components/trips/pages/PastTrips";
import RequestedTrips from "@/components/trips/pages/RequestedTrips";
import {AccountTripsResponse} from "@/types/responses";
import useQuery from "@/hooks/query";
import {useAuth} from "@/providers/AuthProvider";

export default function Trips() {
    const {activeAccount} = useAuth();
    const [tab, setTab] = useState(1);
    const { data, loading, refetch } = useQuery<AccountTripsResponse>(`/accounts/${activeAccount.id}/trips`);

    const renderList = (tab: number) => {
        switch (tab) {
            case 1:
                return <RequestedTrips trips={data?.requested ?? []}/>
            case 2:
                return <UpcomingTrips trips={data?.upcoming ?? []}/>
            case 3:
                return <PastTrips trips={data?.past ?? []}/>
            default:
                return null;
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <TripTabs tab={tab} setTab={setTab}/>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
                    }
                    style={styles.scrollView}>
                    {renderList(tab)}
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