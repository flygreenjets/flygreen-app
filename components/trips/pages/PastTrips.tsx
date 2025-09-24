import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TripCard from "@/components/trips/TripCard";
import useToggle from "@/hooks/toggle";
import TripTabs from "@/components/trips/TripTabs";
import {router} from "expo-router";
import {Trip} from "@/types/trips";
import ContactMenu from "@/components/ui/ContactMenu";
import {Colors} from "@/utils/Colors";
import EmptyTripList from "@/components/ui/trips/EmptyTripList";

interface PastTripsProps {
    trips: Trip[];
}

export default function PastTrips({trips: trips}: PastTripsProps) {
    return (
        <>
            {trips.length > 0 ? trips.map((trip) => (
                <Pressable key={trip.id}  onPress={() => router.push(`/trip/${trip.id}`)}>
                    <TripCard trip={trip} key={trip.id} />
                </Pressable>
            )) : (
                <EmptyTripList
                    firstLine="You don’t have any past trips."
                />
            )}
        </>
    );
}