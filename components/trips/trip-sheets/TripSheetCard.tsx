import {Text, StyleSheet, View, Dimensions, Pressable, FlatList} from 'react-native';
import Card from "@/components/ui/Card";
import {Colors} from "@/utils/Colors";
import {Image} from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, {useState} from "react";
import {showLocation} from "react-native-map-link";
import Ionicons from "@expo/vector-icons/Ionicons";
import DotPagination from "@/components/ui/DotPagination";
import {router} from "expo-router";
import ShareButton from "@/components/ui/buttons/ShareButton";
import * as Linking from "expo-linking";
import {TripSheet} from "@/types/trips";

const {width} = Dimensions.get('screen');

interface TripSheetCardProps {
    tripSheet: TripSheet;
}


export default function TripSheetCard({tripSheet}: TripSheetCardProps) {
    const [pagination, setPagination] = useState(0);

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
                    source={tripSheet.primaryImage ?? ""}
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
                                        <Text>{segment.departureDate}</Text>
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
                                                                address: segment.departureAirport.location,
                                                            });
                                                        }}
                                                    >
                                                        <Text>{segment.departureAirport?.location}</Text>
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
                                                    <Text style={[styles.right, styles.airportName]}>{segment.destinationAirport?.name}</Text>
                                                    <Pressable
                                                        onPress={() => {
                                                            showLocation({
                                                                address: segment.destinationAirport.location,
                                                            });
                                                        }}
                                                    >
                                                        <Text style={styles.right}>{segment.destinationAirport?.name}</Text>
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