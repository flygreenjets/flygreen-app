import {StyleSheet, ScrollView} from 'react-native';
import {SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TripTabs from "@/components/trips/TripTabs";
import UpcomingTrips from "@/components/trips/pages/UpcomingTrips";
import {useState} from "react";
import {switchCase} from "@babel/types";
import PastTrips from "@/components/trips/pages/PastTrips";
import RequestedTrips from "@/components/trips/pages/RequestedTrips";
import useApi from "@/hooks/api";
import {Trip} from "@/types/trips";

export default function Trips() {
    // const {data, loading, error} = useApi<Trip[]>('/trips/1214');
    // console.log(data);

    const [tab, setTab] = useState(1);
    const renderList = (tab: number) => {
        switch (tab) {
            case 1:
                return <RequestedTrips />
            case 2:
                return <UpcomingTrips/>
            case 3:
                return <PastTrips/>
            default:
                return null;
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <TripTabs tab={tab} setTab={setTab}/>
                <ScrollView style={styles.scrollView}>
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