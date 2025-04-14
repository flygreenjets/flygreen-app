import {View, Text, StyleSheet, FlatList} from "react-native";
import {Trip} from "@/types/trips";
import TripCard from "@/components/trips/TripCard";
import SegmentItem from "@/components/trips/ititnerary/SegmentItem";
import {useNavigation} from "expo-router";

interface TripViewProps {
    trip: Trip
}

const data = [
    {
        "departureAirportCode": "KTEB",
        "destinationAirportCode": "CYYZ",
        "departureDate": "2025-04-12 00:00:00",
        "departureTime": null,
        "departureTimeTBD": null,
        "arrivalDate": null,
        "arrivalTime": null,
        "blockMinutes": 0,
        "numPaxTbd": false,
        "numPaxTBD": null,
        "numStops": 0,
        "numPax": 1,
        "sort": 1,
        "duration": null,
        "departureTimeTbd": true
    },
    {
        "departureAirportCode": "CYYZ",
        "destinationAirportCode": "KTEB",
        "departureDate": "2025-04-30 00:00:00",
        "departureTime": null,
        "departureTimeTBD": null,
        "arrivalDate": null,
        "arrivalTime": null,
        "blockMinutes": 0,
        "numPaxTbd": false,
        "numPaxTBD": null,
        "numStops": 0,
        "numPax": 1,
        "sort": 2,
        "duration": null,
        "departureTimeTbd": true
    },
    {
        "departureAirportCode": "KTEB",
        "destinationAirportCode": "KOPF",
        "departureDate": "2025-05-27 00:00:00",
        "departureTime": null,
        "departureTimeTBD": null,
        "arrivalDate": null,
        "arrivalTime": null,
        "blockMinutes": 0,
        "numPaxTbd": false,
        "numPaxTBD": null,
        "numStops": 0,
        "numPax": 1,
        "sort": 3,
        "duration": null,
        "departureTimeTbd": true
    }
];

export default function TripView({trip}: TripViewProps) {
    const navigation = useNavigation();
    navigation.setOptions({
        title: `Your trip to ${trip.destinationAirport.name}`,
    })

    return (
        <>
            <View style={{
                backgroundColor: "#fff",
                paddingHorizontal: 16,
                paddingVertical: 20,
            }}>
                <TripCard trip={trip} showAsCard={false}/>
            </View>
            <View style={styles.container}>
                <View style={styles.itineraryContainer}>
                    <Text style={{...styles.itineraryTitle, marginLeft: 0}}>Itinerary</Text>
                    {data.map(((segment, idx) => (
                        <SegmentItem key={idx} segment={segment}/>
                    )))}
                </View>
                <View>
                    <Text style={styles.itineraryTitle}>Quotes</Text>
                    <FlatList
                        style={styles.verticalCardScroll}
                        data={data}
                        horizontal={true}
                        keyExtractor={(item) => item.departureDate}
                        renderItem={({item}) => (
                            <SegmentItem segment={item} />
                        )}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    itineraryContainer: {
        marginHorizontal: 16,
    },
    itineraryTitle: {
        marginLeft: 16,
        marginTop: 20,
        marginBottom: 10,
        fontSize: 20,
    },
    verticalCardScroll: {
        paddingHorizontal: 16,
        paddingBottom: 10
    },

});