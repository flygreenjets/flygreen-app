import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TripCard from "@/components/trips/TripCard";

export default function MyTrips() {
    // trips data
    const trips = [
        {
            id: 1,
            name: "Trip 1",
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
            pax: 5,
            duration: "2h 30m",
            fuelStops: 2,
        },
        {
            id: 2,
            name: "Trip 1",
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
            pax: 5,
            duration: "2h 30m",
            fuelStops: 2,
        },
        {
            id: 3,
            name: "Trip 1",
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
            pax: 5,
            duration: "2h 30m",
            fuelStops: 2,
        },
        {
            id: 4,
            name: "Trip 1",
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
            pax: 5,
            duration: "2h 30m",
            fuelStops: 2,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {trips.map((trip) => (
                    <TripCard trip={trip} key={trip.id} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingTop: 5
    }
});