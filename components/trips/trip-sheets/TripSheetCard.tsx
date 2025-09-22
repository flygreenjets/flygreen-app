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
import {Airport, Fbo, Segment, TripSheet} from "@/types/trips";
import {FontAwesome} from "@expo/vector-icons";

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
                    <Text style={[styles.crewTitle, {color: Colors.white}]}>Departure</Text>
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
                                    <LegAirportInfo
                                        airport={segment.departureAirport!}
                                        fbo={segment.departureFbo!}
                                    />
                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <Ionicons name="airplane" size={26} color="#205046" />
                                    </View>
                                    <LegAirportInfo
                                        airport={segment.destinationAirport!}
                                        fbo={segment.destinationFbo!}
                                        isArrival={true}
                                    />
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
                            router.push(`/web-viewer/${encodeURIComponent(process.env.EXPO_PUBLIC_API_URL + `/agent/pdfs/trip-sheet/${tripSheet.id}`)}`)
                        }}
                    >
                        <Text style={{color: Colors.flygreenGreen}}>See details</Text>
                        <MaterialCommunityIcons name="file-document-outline" size={20} color={Colors.flygreenGreen} />
                    </Pressable>
                    <ShareButton shareUrl="http://www.flygreen.test/trip-sheet/1" dialogTitle="Share Trip Sheet" buttonText="Share" mimeType="text/plain" />
                </View>
            </View>
        </Card>
    );
}

interface LegAirportInfoProps {
    airport: Airport;
    isArrival?: boolean;
    fbo?: Fbo;
}

function LegAirportInfo({airport, isArrival = false, fbo}: LegAirportInfoProps) {
    return (
        <View style={[styles.airportInfo, isArrival && {alignItems: 'flex-end'}]}>
            <Text style={styles.airportCode}>{airport?.code}</Text>
            {fbo ? (
                <>
                    <Text style={[styles.airportName, isArrival && styles.right]}>{fbo?.name}</Text>
                    <Pressable
                        onPress={() => {
                            showLocation({
                                address: fbo.address,
                            });
                        }}
                    >
                        <Text style={[isArrival && styles.right]}><FontAwesome name="map-marker" size={20} color="black" /> {fbo.address}</Text>
                    </Pressable>
                    {fbo.phone && (
                        <Pressable onPress={() => {Linking.openURL(`telprompt:${fbo.phone}`);}}>
                            <View style={styles.iconText}>
                                <FontAwesome name="phone" size={18} color="black" />
                                <Text style={[isArrival && styles.right]}>{fbo.phone}</Text>
                            </View>
                        </Pressable>
                    )}
                </>
            ) : (
                <>
                    <Text style={[styles.airportName, isArrival && styles.right]}>{airport?.name}</Text>
                    <Pressable
                        onPress={() => {
                            showLocation({
                                address: airport.location,
                            });
                        }}
                    >
                        <View style={styles.iconText}>
                            <FontAwesome name="map-marker" size={20} color="black" />
                            <Text style={[isArrival && styles.right]}>{airport?.location}</Text>
                        </View>
                    </Pressable>
                    {airport.phone && (
                        <Pressable onPress={() => {Linking.openURL(`telprompt:${airport.phone}`);}}>
                            <View style={styles.iconText}>
                                <FontAwesome name="phone" size={18} color="black" />
                                <Text style={[isArrival && styles.right]}>{airport.phone}</Text>
                            </View>
                        </Pressable>
                    )}
                </>
            )}
        </View>
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
        gap: 8
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
    },
    iconText: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
});