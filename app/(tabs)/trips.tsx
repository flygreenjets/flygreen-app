import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TripTabs from "@/components/trips/TripTabs";
import UpcomingTrips from "@/components/trips/pages/UpcomingTrips";
import {useState} from "react";
import PastTrips from "@/components/trips/pages/PastTrips";
import RequestedTrips from "@/components/trips/pages/RequestedTrips";
import {AccountTripsResponse} from "@/types/responses";
import useQuery from "@/hooks/query";
import {useAuth} from "@/providers/AuthProvider";
import SpinnerLoading from "@/components/animations/SpinnerLoading";
import {Trip} from "@/types/trips";
import ContactMenu from "@/components/ui/ContactMenu";
import {Colors} from "@/utils/Colors";

export default function Trips() {
    const {activeAccount} = useAuth();
    const [tab, setTab] = useState(1);
    const { data, loading, error } = useQuery<AccountTripsResponse>(`/accounts/${activeAccount.id}/trips`);

    const renderComponent = (trips: Trip[], component: React.ReactNode) => {
        if (trips.length > 0) {
            return component;
        }
        return (
            <View style={styles.emptyContainer}>
                <Text>You don’t have any charters right now.</Text>
                <Text>Contact your broker to start planning.</Text>
                <ContactMenu button={(
                    <Text style={{
                        marginTop: 20,
                        color: 'white',
                        backgroundColor: Colors.flygreenGreen,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 20,
                        fontWeight: '600',
                        fontSize: 16,
                    }}>Contact Broker</Text>
                )}/>
            </View>
        );
    }

    const renderList = (tab: number) => {
        switch (tab) {
            case 1:
                return renderComponent(data?.requested ?? [], <RequestedTrips trips={data?.requested ?? []}/>);
            case 2:
                return renderComponent(data?.upcoming ?? [], <UpcomingTrips trips={data?.upcoming ?? []}/>);
            case 3:
                return renderComponent(data?.upcoming ?? [], <PastTrips trips={data?.upcoming ?? []}/>);
            default:
                return null;
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <TripTabs tab={tab} setTab={setTab}/>
                {loading && !data ? (
                    <SpinnerLoading/>
                ) : (
                    <ScrollView style={styles.scrollView}>
                        {renderList(tab)}
                    </ScrollView>
                )}
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
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    }
});