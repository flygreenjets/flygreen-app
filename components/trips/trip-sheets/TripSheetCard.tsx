import {Text, StyleSheet, View, Dimensions, Pressable, FlatList} from 'react-native';
import Card from "@/components/ui/Card";
import {Colors} from "@/utils/Colors";
import {Image} from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {showLocation} from "react-native-map-link";
import Ionicons from "@expo/vector-icons/Ionicons";
import DotPagination from "@/components/ui/DotPagination";
import {router} from "expo-router";
import ShareButton from "@/components/ui/buttons/ShareButton";
import * as Linking from "expo-linking";

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
            <View style={styles.bottomBar}>
                <View>
                    <Text style={[styles.crewTitle, {color: Colors.white}]}>Next Departure</Text>
                    <Text style={styles.departureDate}>{tripSheet.departureDate}</Text>
                </View>
                <View>
                    <Text style={[styles.crewTitle, {color: Colors.white}, styles.right]}>Tail #</Text>
                    <Text style={styles.tailNumber}>{tripSheet.tailNumber}</Text>
                </View>
            </View>
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
                    <View style={styles.segment}>
                    <FlatList
                            data={tripSheet.segments}
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            onViewableItemsChanged={({changed, viewableItems}) => {
                                if (changed.length > 0) {
                                    setPagination(viewableItems[0].index || 0);
                                }
                            }}
                            renderItem={({item: segment, index}) =>
                                <View style={{
                                    width: width - 50,
                                    paddingHorizontal: 5
                                }}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text>Leg {index+1}</Text>
                                        <Text>June 14th, 10:00am</Text>
                                    </View>
                                    <View key={index} style={{
                                        flexDirection: 'row',
                                    }}>
                                        <View style={styles.airportInfo}>
                                            <Text style={styles.airportCode}>{segment.departureAirport?.code}</Text>
                                            {segment.departureFbo ? (
                                                <>
                                                    <Text style={styles.airportName}>{segment.departureFbo?.name}</Text>
                                                    <Pressable
                                                        onPress={() => {
                                                            showLocation({
                                                                address: segment.departureFbo.address,
                                                            });
                                                        }}
                                                    >
                                                        <Text>{segment.departureFbo.address}</Text>
                                                    </Pressable>
                                                    <Pressable onPress={() => {Linking.openURL(`telprompt:${segment.departureFbo.phone}`);}}>
                                                        <Text>{segment.departureFbo.phone}</Text>
                                                    </Pressable>
                                                </>
                                            ) : (
                                                <>
                                                    <Text style={styles.airportName}>{segment.departureAirport?.name}</Text>
                                                    <Pressable
                                                        onPress={() => {
                                                            showLocation({
                                                                address: segment.departureAirport.address,
                                                            });
                                                        }}
                                                    >
                                                        <Text>{segment.departureAirport?.address}</Text>
                                                    </Pressable>
                                                    <Pressable onPress={() => {Linking.openURL(`telprompt:${segment.departureAirport.phone}`);}}>
                                                        <Text>{segment.departureAirport.phone}</Text>
                                                    </Pressable>
                                                </>
                                            )}
                                        </View>
                                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                            <Ionicons name="airplane" size={26} color="#205046" />
                                        </View>
                                        <View style={{...styles.airportInfo, alignItems: 'flex-end'}}>
                                            <Text style={styles.airportCode}>{segment.destinationAirport?.code}</Text>
                                            {segment.destinationFbo ? (
                                                <>
                                                    <Text style={styles.airportName}>{segment.destinationFbo?.name}</Text>
                                                    <Pressable
                                                        onPress={() => {
                                                            showLocation({
                                                                address: segment.destinationFbo.address,
                                                            });
                                                        }}
                                                    >
                                                        <Text style={styles.right}>{segment.destinationFbo.address}</Text>
                                                    </Pressable>
                                                    <Pressable onPress={() => {Linking.openURL(`telprompt:${segment.destinationFbo.phone}`);}}>
                                                        <Text>{segment.destinationFbo.phone}</Text>
                                                    </Pressable>
                                                </>
                                            ) : (
                                                <>
                                                    <Text style={styles.airportName}>{segment.destinationAirport?.name}</Text>
                                                    <Pressable
                                                        onPress={() => {
                                                            showLocation({
                                                                address: segment.destinationAirport.address,
                                                            });
                                                        }}
                                                    >
                                                        <Text>{segment.destinationAirport?.name}</Text>
                                                    </Pressable>
                                                    <Pressable onPress={() => {Linking.openURL(`telprompt:${segment.destinationAirport.phone}`);}}>
                                                        <Text>{segment.destinationAirport.phone}</Text>
                                                    </Pressable>
                                                </>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            }
                        />
                        <View style={{flex: 1, marginTop: 20}}>
                            <DotPagination
                                activeDotColor={Colors.flygreenGreen}
                                inactiveDotColor={Colors.flygreenGreen + '50'}
                                items={tripSheet.segments}
                                paginationIndex={pagination}
                            />
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
        backgroundColor: Colors.flygreenGreen,
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
    }
});