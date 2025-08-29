import {StyleSheet, Pressable} from 'react-native';
import TripCard from "@/components/trips/TripCard";
import {router} from "expo-router";
import {Trip} from "@/types/trips";

interface RequestedTripsProps {
    trips: Trip[];
}

export default function RequestedTrips({trips}: RequestedTripsProps) {
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