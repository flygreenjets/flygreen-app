import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TripCard from "@/components/trips/TripCard";
import useToggle from "@/hooks/toggle";
import TripTabs from "@/components/trips/TripTabs";
import {router} from "expo-router";

export default function RequestedTrips() {
    const trips = [
        {
            id: 3,
            name: "Trip 1",
            description: "Description 1",
            departureDate: "Fri, Apr 4, 2025",
            stage: "Requested",
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
            pax: 5,
            duration: "2h 30m",
            fuelStops: 2,
        },
    ];

    return (
        <>
            {trips.map((trip) => (
                <Pressable key={trip.id}  onPress={() => router.push(`/trip/${trip.id}`)}>
                    <TripCard trip={trip} key={trip.id} />
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