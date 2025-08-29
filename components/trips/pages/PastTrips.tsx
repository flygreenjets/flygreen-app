import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TripCard from "@/components/trips/TripCard";
import useToggle from "@/hooks/toggle";
import TripTabs from "@/components/trips/TripTabs";
import {router} from "expo-router";
import {Trip} from "@/types/trips";

interface PastTripsProps {
    trips: Trip[];
}

export default function PastTrips({trips: trips}: PastTripsProps) {
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