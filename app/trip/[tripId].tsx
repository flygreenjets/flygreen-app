import {useLocalSearchParams, useNavigation, useRouter} from "expo-router";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import TripView from "@/components/trips/TripView";
import {useEffect} from "react";

export default function TripPage({}) {
    const {tripId} = useLocalSearchParams();
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

    const navigation = useNavigation();

    const trip = trips.find(t => t.id === parseInt(tripId as string));
    if (!trip) {
        return null; // or handle the case where the trip is not found
    }
    useEffect(() => {
        navigation.setOptions({
            title: `Your trip to ${trip.destinationAirport.name}`,
        })
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView>
            <TripView trip={trip} />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}