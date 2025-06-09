import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TripCard from "@/components/trips/TripCard";
import useToggle from "@/hooks/toggle";
import TripTabs from "@/components/trips/TripTabs";
import {router} from "expo-router";

export default function UpcomingTrips() {
    // trips data
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
    ];

    return (
        <>
            {trips.map((trip) => (
                <Pressable key={trip.id} onPress={() => router.push(`/trip/${trip.id}`)}>
                    <TripCard trip={trip} />
                </Pressable>
            ))}
        </>
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