import {StyleSheet, Pressable} from 'react-native';
import TripCard from "@/components/trips/TripCard";
import {router} from "expo-router";
import EmptyTripList from "@/components/ui/trips/EmptyTripList";
import {Trip} from "@/types/trips";

interface RequestedTripsProps {
    trips: Trip[];
}

export default function RequestedTrips({trips}: RequestedTripsProps) {
    return (
        <>
            {trips.length > 0 ? trips.map((trip) => (
                <Pressable key={trip.id}  onPress={() => router.push(`/trip/${trip.id}`)}>
                    <TripCard trip={trip} key={trip.id} />
                </Pressable>
            )) : (
                <EmptyTripList
                    firstLine="You don’t have any requested trips."
                />
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