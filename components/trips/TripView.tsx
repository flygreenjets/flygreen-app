import {View, Text, StyleSheet, FlatList} from "react-native";
import {Trip} from "@/types/trips";
import TripCard from "@/components/trips/TripCard";
import SegmentItem from "@/components/trips/ititnerary/SegmentItem";
import ProgressBar from "@/components/ui/ProgressBar";
import QuoteCard from "@/components/quotes/QuoteCard";
import {Colors} from "@/utils/Colors";

interface TripViewProps {
    trip: Trip
}

const data = [
    {
        id: "1",
        departureDate: "Dec 23 2024",
        departureAirport: {
            code: "CYUL",
            name: "Montreal Airport",
        },
        destinationAirport: {
            code: "KTEB",
            name: "Teterboro Airport",
        },
        pax: 1,
        duration: "98",
        fuelStops: 1,
        quoteFlag: {
            label: "Recommended",
            color: Colors.flygreenGreen,
        },
        ratings: {
            takeoffReliability: 4.7,
            cabin: 3.9,
        },
        price: 31030,
        segments: {
            departure: {
                airport: {
                    code: "CYUL",
                    name: "Montreal Airport",
                },
                date: "Dec 23 2024",
                time: "10:00 AM",
            },
            arrival: {
                airport: {
                    code: "KTEB",
                    name: "Teterboro Airport",
                },
                date: "Dec 23 2024",
                time: "12:38 PM",
            },
            flightTime: "2h 38m",
            fuelStops: 1,
        }
    },
    {
        id: "2",
        departureDate: "Dec 23 2024",
        departureAirport: {
            code: "CYHU",
            name: "Montreal Airport",
        },
        destinationAirport: {
            code: "KLAX",
            name: "Teterboro Airport",
        },
        pax: 1,
        duration: "98",
        fuelStops: 1,
        quoteFlag: {
            label: "Floating",
            color: "#008886",
        },
        ratings: {
            takeoffReliability: 3.1,
            cabin: 4.0,
        },
        price: 26239,
        segments: {
            departure: {
                airport: {
                    code: "CYUL",
                    name: "Montreal Airport",
                },
                date: "Dec 23 2024",
                time: "10:00 AM",
            },
            arrival: {
                airport: {
                    code: "KTEB",
                    name: "Teterboro Airport",
                },
                date: "Dec 23 2024",
                time: "12:38 PM",
            },
            flightTime: "2h 38m",
            fuelStops: 1,
        }
    },
    {
        id: "3",
        departureDate: "Dec 23 2024",
        departureAirport: {
            code: "CYHU",
            name: "Montreal Airport",
        },
        destinationAirport: {
            code: "KLAX",
            name: "Teterboro Airport",
        },
        pax: 1,
        duration: "98",
        fuelStops: 1,
        ratings: {
            takeoffReliability: 3.1,
            cabin: 4.0,
        },
        price: 45226,
        segments: {
            departure: {
                airport: {
                    code: "CYUL",
                    name: "Montreal Airport",
                },
                date: "Dec 23 2024",
                time: "10:00 AM",
            },
            arrival: {
                airport: {
                    code: "KTEB",
                    name: "Teterboro Airport",
                },
                date: "Dec 23 2024",
                time: "12:38 PM",
            },
            flightTime: "2h 38m",
            fuelStops: 1,
        }
    }
];

export default function TripView({trip}: TripViewProps) {
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
                <FlatList
                    ListHeaderComponent={<Text style={styles.itineraryTitle}>Quotes</Text>}
                    style={styles.quoteScroll}
                    contentContainerStyle={{gap: 8}}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <QuoteCard quote={item} flag={item.quoteFlag}/>
                    )}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    quoteProgressView: {
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        paddingVertical: 15,
    },
    quoteProgressText: {
        textAlign: "center",
        marginBottom: 10
    },
    itineraryContainer: {
        marginHorizontal: 16,
    },
    itineraryTitle: {
        marginBottom: 10,
        fontSize: 20,
    },
    quoteScroll: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },

});