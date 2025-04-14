import {View, Text, StyleSheet} from "react-native";
import {Segment} from "@/types/trips";
import {format} from "date-fns";
import Card from "@/components/ui/Card";

interface SegmentItemProps {
    segment: Segment;
}

export default function SegmentItem({segment}: SegmentItemProps) {
    return (
        <Card style={styles.card}>
            <Text>{format(new Date(segment.departureDate), 'PP')}</Text>
            <Text>{segment.departureAirportCode} to {segment.destinationAirportCode}</Text>
            <Text>{segment.numPax}</Text>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        marginBottom: 5,
    },
    itineraryTitle: {
        marginTop: 20,
        fontSize: 20,
    },
    itineraryContainer: {

    }

});