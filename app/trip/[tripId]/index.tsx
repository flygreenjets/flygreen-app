import {router, useLocalSearchParams, useNavigation, useRouter} from "expo-router";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import TripView from "@/components/trips/TripView";
import {useEffect} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import useQuery from "@/hooks/query";
import axios, {Axios} from "axios";
import {useAuth} from "@/providers/AuthProvider";
import SpinnerLoading from "@/components/animations/SpinnerLoading";
import {Alert, RefreshControl, ScrollView, View} from "react-native";

const trips = [
    {
        id: 2,
        name: "Trip to New York",
        description: "Description 1",
        departureDate: "Tue, June 10, 2025",
        departureAirport: {
            code: "CYUL",
            name: "Montreal Airport, QC",
        },
        destinationAirport: {
            code: "KTEB",
            name: "Newark Liberty Intl. Airport, NJ",
        },
        aircraft: {
            category: 'Super Midsize Jet',
            model: 'Citation X',
            registration: 'C-GREEN',
        },
        stage: "Closed Won",
        pax: 2,
        duration: "1h 39m",
        fuelStops: 0,
    },
    {
        id: 1,
        name: "Martin's Trip to Miami",
        description: "Description 1",
        departureDate: "Fri, Apr 4, 2025",
        departureAirport: {
            code: "KTEB",
            name: "Newark Liberty Intl. Airport, NJ",
        },
        destinationAirport: {
            code: "KTMB",
            name: "Miami Executive Airport, FL",
        },
        aircraft: {
            category: 'Light Jet',
            model: 'Phenom 300',
            registration: 'N12345',
        },
        stage: "Sourcing",
        pax: 5,
        duration: "2h 30m",
        fuelStops: 2,
    }
];

export default function TripPage({}) {
    const {tripId} = useLocalSearchParams();
    const router = useRouter();

    const {data, loading, error, refetch} = useQuery(`/trips/${tripId}`);

    useEffect(() => {
        if (error) {
            Alert.alert("Error", "Failed to load trip.", [
                { text: "OK", onPress: () => router.back() }
            ]);
        }
        if (loading) return;
    }, [loading]);

    return (
        <GestureHandlerRootView>
            <SafeAreaProvider>
                <SafeAreaView>
                    <ScrollView
                        style={{
                            height: "100%"
                        }}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
                    >
                        <TripView trip={data?.data} />
                    </ScrollView>

                </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}