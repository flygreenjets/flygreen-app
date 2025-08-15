import {Text, StyleSheet, View, Dimensions, Pressable, ImageBackground} from 'react-native';
import Card from "@/components/ui/Card";
import {Colors} from "@/utils/Colors";
import {Image} from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {router} from "expo-router";
import ShareButton from "@/components/ui/buttons/ShareButton";

const {width} = Dimensions.get('screen');

const quote = {
    imageUrl: "https://flygreen.s3.us-east-2.amazonaws.com/aircraft-category-pictures/supermidsize-exterior.jpg",
}

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
                "city": "Los Angeles",
                "phone": "+1 310-410-9605"
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
                "phone": "+1 310-410-9605"
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
                "phone": "+1 310-410-9605"
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
                "phone": "+1 310-410-9605"
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
                "address": "6201 W Imperial Hwy \nLos Angeles, California 90045",
                "phone": "+1 310-410-9605"
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
                "address": "6201 W Imperial Hwy \nLos Angeles, California 90045",
                "phone": "+1 310-410-9605"
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

export default function TripSheetCard() {
    const [pagination, setPagination] = React.useState(0);

    return (
        <Card style={styles.mainContainer}>
            <ImageBackground
                source={{uri: 'https://flygreen.s3.us-east-2.amazonaws.com/pdf-assets/rewards/gold.jpg'}}
                imageStyle={{borderTopRightRadius: 10, borderTopLeftRadius: 10}}
                resizeMode={'cover'}
            >
                <View style={[styles.bottomBar, {paddingBottom: 0}]}>
                    <View>
                        <Text style={[styles.crewTitle, {color: Colors.white}]}>Flight Distance</Text>
                        <Text style={styles.departureDate}>413 nautical miles</Text>
                    </View>
                    <View>
                        <Text style={[styles.crewTitle, {color: Colors.white}, styles.right]}>Hours Flown</Text>
                        <Text style={styles.tailNumber}>1 Hour 40 Minutes</Text>
                    </View>
                </View>
                <View style={[styles.bottomBar, {borderTopRightRadius: 0, borderTopLeftRadius: 0}]}>
                    <View>
                        <Text style={[styles.crewTitle, {color: Colors.white}]}>Max Altitude</Text>
                        <Text style={styles.departureDate}>43,000 feet</Text>
                    </View>
                    <View>
                        <Text style={[styles.crewTitle, {color: Colors.white}, styles.right]}>Acquired Points</Text>
                        <Text style={styles.tailNumber}>12,225</Text>
                    </View>
                </View>
            </ImageBackground>
            <View>
                <Image
                    style={[styles.image]}
                    source={quote.imageUrl}
                    contentFit="cover"
                    transition={1000}
                />
            </View>
            <View style={{padding: 15}}>
                <View style={styles.itineraryContainer}>
                    <View style={styles.tripInfoGrid}>
                        <View>
                            <Text style={styles.tripInfoValue}>695,900</Text>
                            <Text style={styles.tripInfoLabel}>Tier Points</Text>
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={styles.tripInfoValue}>304,100</Text>
                            <Text style={styles.tripInfoLabel}>Points To Access Elite Tier</Text>
                        </View>
                    </View>
                    <View style={styles.tripInfoGrid}>
                        <View>
                            <Text style={styles.tripInfoValue}>933,400</Text>
                            <Text style={styles.tripInfoLabel}>Redeemable Points</Text>
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={styles.tripInfoValue}>$9,334</Text>
                            <Text style={styles.tripInfoLabel}>Available Cash</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <Pressable
                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 5}}
                        onPress={() => {
                            router.push(`/trip-sheet/${tripSheet.id}`);
                        }}
                    >
                        <Text style={{color: Colors.flygreenGreen}}>View More</Text>
                        <MaterialCommunityIcons name="file-document-outline" size={20} color={Colors.flygreenGreen} />
                    </Pressable>
                    <ShareButton shareUrl="http://www.flygreen.test/trip-sheet/1" dialogTitle="Share Trip Sheet" buttonText="Share" mimeType="text/plain" />
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    tripInfoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    buttonsContainer: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
    },
    airportInfo: {
        flex: 2,
        gap: 5
    },
    airportCode: {
        fontSize: 30,
        color: "#205046"
    },
    airportName: {
        fontSize: 12,
        color: 'gray'
    },
    segment: {
        gap: 5
    },
    mainContainer: {
        marginHorizontal: 10,
        width: width-20,
        padding: 0
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 15
    },
    tailNumber: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right',
    },
    departureDate: {
        color: Colors.white,
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
    image: {
        flex: 1,
        backgroundColor: '#0553',
        padding: 70,
        width: "100%",
        resizeMode: 'contain',
        zIndex: 1
    },
    topRadius: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    itineraryContainer: {
        marginTop: 5
    },
    passengerContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tripInfoValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    tripInfoLabel: {
        fontSize: 12,
        color: '#888',
    }
});