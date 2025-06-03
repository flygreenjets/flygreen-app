import {View, StyleSheet, Text} from "react-native";
import { Image } from 'expo-image';
import Card from "@/components/ui/Card";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {Colors} from "@/utils/Colors";

interface QuoteCardProps {
    quote: {
        departureDate: string;
        departureAirport: {
            code: string;
            name: string;
        };
        destinationAirport: {
            code: string;
            name: string;
        };
        pax: number;
        duration: string;
        fuelStops: number;
        price: number;
        ratings: {
            takeoffReliability: number;
            cabin: number;
        };
    },
    flag?: {
        label: string;
        color: string;
    };
}

export default function QuoteCard({quote, flag}: QuoteCardProps) {
    return (
        <Card flag={flag}>
            <View>
                <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                    <Text style={{fontSize: 16}}>Citation X</Text>
                </View>
                <Text style={{color: 'gray', fontSize: 12}}>Super Midsize Jet</Text>
            </View>
            <View style={styles.separator}/>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <View style={{...styles.flightInfo}}>
                    <Text>Takeoff reliability:</Text>
                    <View style={styles.rating}>
                        <Text>{quote.ratings.takeoffReliability}</Text>
                        <MaterialIcons name="star" size={16} color={Colors.gold} />
                    </View>
                </View>
                <View style={{...styles.flightInfo, justifyContent: 'flex-end'}}>
                    <Text>Cabin:</Text>
                    <View style={styles.rating}>
                        <Text>{quote.ratings.cabin}</Text>
                        <MaterialIcons name="star" size={16} color={Colors.gold} />
                    </View>
                </View>
            </View>
            <View style={styles.separator}/>
            <View>
                <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={{color: 'gray', fontSize: 14}}>8 seats</Text>
                    <Text style={styles.priceText}>$ {quote.price.toLocaleString()}</Text>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        backgroundColor: '#0553',
    },
    container: {
        flex: 1,
        paddingTop: 75,
        paddingHorizontal: 20,
    },
    rating: {
      flexDirection: 'row',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
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
    flightInfo: {
        flexDirection: "row",
        gap: 5,
        flex: 1,
    },
    separator: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 10,
    },
    priceText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right'
    }
});