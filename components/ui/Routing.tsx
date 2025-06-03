import {Text, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Segment} from "@/types/trips";

interface RoutingProps {
    segment: Segment
}

export default function Routing({segment}: RoutingProps) {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: "space-between",
        }}>
            <View style={styles.airportInfo}>
                <Text style={styles.airportCode}>{segment.departureAirport.code}</Text>
                <Text style={styles.airportName}>{segment.departureAirport.name}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons name="airplane" size={26} color="#205046" />
            </View>
            <View style={{...styles.airportInfo, alignItems: 'flex-end'}}>
                <Text style={styles.airportCode}>{segment.destinationAirport.code}</Text>
                <Text style={{...styles.airportName, textAlign: "right"}}>{segment.destinationAirport.name}</Text>
            </View>
        </View>
    );
}

const styles = {
    airportInfo: {
        flex: 2
    },
    airportCode: {
        fontSize: 30,
        color: "#205046"
    },
    airportName: {
        fontSize: 12,
        color: 'gray'
    },
}