import {useNavigation} from "expo-router";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import TripView from "@/components/trips/TripView";
import {useEffect} from "react";

export default function TripPage() {
    const trip = {
        id: 2,
        name: "Martin's Trip to Miami",
        description: "Description 1",
        departureDate: "Fri, Apr 4, 2025",
        departureAirport: {
            code: "Upcoming",
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
        pax: 5,
        duration: "2h 30m",
        fuelStops: 2,
    };

    const navigation = useNavigation();

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