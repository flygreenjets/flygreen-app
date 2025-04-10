import {View, Text, StyleSheet, FlatList} from "react-native";
import {Trip} from "@/types/trips";
import TripCard from "@/components/trips/TripCard";

interface TripViewProps {
    trip: Trip
}

export default function TripView({trip}: TripViewProps) {
    return (
        <View style={styles.container}>
            <TripCard trip={trip} showAsCard={false} />
            <View>
                <Text>Itinerary</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },

});