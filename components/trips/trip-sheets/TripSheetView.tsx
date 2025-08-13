import {StyleSheet, View, Text, Dimensions, ScrollView} from "react-native";
import RenderHtml from 'react-native-render-html';
import {Colors} from "@/utils/Colors";
import Card from "@/components/ui/Card";

const tripSheet = {
    id: 1,
    departureDate: "Jun 14th, 10:00am",
    tailNumber: "N350HH",
    pilotInCommand: "William Chau",
    secondInCommand: "Keith Chau",
    cabinAttendant: "William Chau",
    segments: [
        {
            from: "CYUL to CYYZ",
            date: "05/14 10:00am",
            duration: "2h 30m",
            passengers: "5 PAX",
            departureAirport: {
                "name": "Los Angeles Intl",
                "code": "KLAX",
                "city": "Los Angeles"
            },
            departureFbo: {
                "name": "Signature Flight Support",
                "address": "6201 W Imperial Hwy \nLos Angeles, California 90045",
                "phone": "+1 310-410-9605"
            },
            destinationAirport: {
                "name": "Charlottetown",
                "code": "CYYG",
                "city": "Charlottetown"
            },
            destinationFbo: {
                "name": "Main Terminal",
                "address": "250 Maple Hills Ave, \nCharlottetown, PE, C1C 1N2",
                "phone": "+1 902-566-7997"
            }
        },
        {
            from: "CYUL to CYYZ",
            date: "05/14 10:00am",
            duration: "2h 30m",
            passengers: "5 PAX",
            departureAirport: {
                "name": "Los Angeles Intl",
                "code": "KLAX",
                "city": "Los Angeles"
            },
            departureFbo: {
                "name": "Signature Flight Support",
                "address": "6201 W Imperial Hwy \nLos Angeles, California 90045",
                "phone": "+1 310-410-9605"
            },
            destinationAirport: {
                "name": "Charlottetown",
                "code": "CYYG",
                "city": "Charlottetown"
            },
            destinationFbo: {
                "name": "Main Terminal",
                "address": "250 Maple Hills Ave, \nCharlottetown, PE, C1C 1N2",
                "phone": "+1 902-566-7997"
            }
        },
        {
            from: "CYUL to CYYZ",
            date: "05/14 10:00am",
            duration: "2h 30m",
            passengers: "5 PAX",
            departureAirport: {
                "name": "Los Angeles Intl",
                "code": "KLAX",
                "city": "Los Angeles",
                "address": "6201 W Imperial Hwy \nLos Angeles, California 90045"
            },
            departureFbo: {
                "name": "Signature Flight Support",
                "address": "6201 W Imperial Hwy \nLos Angeles, California 90045",
                "phone": "+1 310-410-9605"
            },
            destinationAirport: {
                "name": "Charlottetown",
                "code": "CYYG",
                "city": "Charlottetown",
                "address": "6201 W Imperial Hwy \nLos Angeles, California 90045"
            },
            destinationFbo: {
                "name": "Main Terminal",
                "address": "250 Maple Hills Ave, \nCharlottetown, PE, C1C 1N2",
                "phone": "+1 902-566-7997"
            }
        }
    ],
    passengers: [
        "John Doe",
        "Jane Smith",
        "Bob Johnson",
        "Alice Brown",
        "Charlie White"
    ],
    notes: "<p><b>Catering: Stevie's Catering</b></p><p><b>Breakfast:</b> 3x Scrambled Eggs + Bacon // 2x Breakfast Burrito<br><b>Lunch: </b>Crispy Vegetable Spring Rolls // Pico de Gallo + Spicy Guacamole &amp; Chips // 3x Chicken Teriyaki Plates // 4x House Salad with Chicken // 1x Steak // 1x Macaroni and Cheese // 1x Spaghetti Tomato Sauce<br><b>Drinks:</b> Coors Light // 2x bottles of Pinot Noir</p><p>&nbsp;</p><p><b>CYYG Driver:</b> 1 902 439-4636</p>",
}

const {width} = Dimensions.get('window');

export default function TripSheetView() {
    let passengersChunk = [];
    for (let i = 0; i < tripSheet.passengers.length; i+= 3) {
        passengersChunk.push(tripSheet.passengers.slice(i, i+3));
    }
    return (
        <ScrollView style={styles.viewContainer}>
            <Card>
                <Text style={styles.cardTitle}>Trip</Text>
                <View style={styles.crewContainer}>
                    <View>
                        <Text style={styles.crewTitle}>Departure</Text>
                        <Text style={styles.departureDate}>{tripSheet.departureDate}</Text>
                    </View>
                    <View>
                        <Text style={styles.crewTitle}># Passengers</Text>
                        <Text style={styles.departureDate}>5</Text>
                    </View>
                </View>
            </Card>
            <Card>
                <Text style={styles.cardTitle}>Aircraft</Text>
                <View style={styles.crewContainer}>
                    <View>
                        <Text style={styles.crewTitle}>Tail Number</Text>
                        <Text style={styles.tailNumber}>{tripSheet.tailNumber}</Text>
                    </View>
                    <View>
                        <Text style={styles.crewTitle}>Model</Text>
                        <Text style={styles.tailNumber}>Cessna Citation XLS</Text>
                    </View>
                </View>
            </Card>
            <Card>
                <Text style={styles.cardTitle}>Crew</Text>
                <View style={styles.crewContainer}>
                    <View style={styles.segment}>
                        <Text style={[styles.crewTitle, styles.middle]}>Pilot in Command</Text>
                        <Text style={[styles.crewName, styles.middle]}>{tripSheet.pilotInCommand}</Text>
                    </View>
                    <View style={styles.segment}>
                        <Text style={[styles.crewTitle, styles.middle]}>Second In Command</Text>
                        <Text style={[styles.crewName, styles.middle]}>{tripSheet.secondInCommand}</Text>
                    </View>
                    <View style={styles.segment}>
                        <Text style={[styles.crewTitle, styles.middle]}>Cabin Attendant</Text>
                        <Text style={[styles.crewName, styles.middle]}>{tripSheet.cabinAttendant}</Text>
                    </View>
                </View>
            </Card>
            <Card>
                <Text style={styles.cardTitle}>Passengers</Text>
                {passengersChunk.map((chunk, id) => (
                    <View style={styles.passengerContainer} key={id}>
                        {
                            chunk.map((passenger, idx) => (
                                <Text style={{flex: 1}} key={idx}>{passenger}</Text>
                            ))
                        }
                    </View>
                ))}
                <View style={styles.passengerContainer}>

                </View>
            </Card>
            <Card>
                <Text style={styles.cardTitle}>Notes</Text>
                <RenderHtml
                    contentWidth={width}
                    source={{
                        html: `${tripSheet.notes}`
                    }}
                />
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 15,
    },
    buttonsContainer: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
    },
    segment: {
        gap: 5
    },
    crewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    bottomBar: {
        backgroundColor: Colors.flygreenGreen,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 15
    },
    tailNumber: {
        color: Colors.flygreenGreen,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right',
    },
    departureDate: {
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right',
    },
    crewTitle: {
        fontSize: 12,
        color: '#888',
    },
    crewName: {
        fontSize: 16,
    },
    middle: {
        textAlign: 'center',
    },
    right: {
        textAlign: 'right',
    },
    passengerContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold"
    },
});