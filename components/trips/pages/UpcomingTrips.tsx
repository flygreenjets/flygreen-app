import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TripCard from "@/components/trips/TripCard";
import useToggle from "@/hooks/toggle";
import TripTabs from "@/components/trips/TripTabs";
import {router} from "expo-router";
import {Trip} from "@/types/trips";
import EmptyTripList from "@/components/ui/trips/EmptyTripList";

interface UpcomingTripsProps {
    trips: Trip[];
}

export default function UpcomingTrips({trips}: UpcomingTripsProps) {
    return (
        <>
            {trips.length > 0 ? trips.map((trip) => (
                <Pressable key={trip.id} onPress={() => router.push(`/trip/${trip.id}`)}>
                    <TripCard trip={trip} />
                </Pressable>
            )) : (
                <EmptyTripList/>
            )}
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