import {Text, StyleSheet, View, Dimensions, Pressable, ImageBackground, Linking} from 'react-native';
import Card from "@/components/ui/Card";
import {Colors} from "@/utils/Colors";
import {Image} from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {router} from "expo-router";
import ShareButton from "@/components/ui/buttons/ShareButton";
import {Trip, TripReport, TripSheet} from "@/types/trips";
import {Account} from "@/types/types";

const {width} = Dimensions.get('screen');

interface TripReportCardProps {
    tripReport: TripReport;
    account: Account;
    trip: Trip;
}

export default function TripSheetCard({tripReport, account, trip}: TripReportCardProps) {
    const hours = Math.floor(tripReport.totalBlockMinutes / 60);
    const minutes = tripReport.totalBlockMinutes - (hours * 60);

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
                        <Text style={styles.departureDate}>{tripReport.flightDistance.toFixed(0)} nm</Text>
                    </View>
                    <View>
                        <Text style={[styles.crewTitle, {color: Colors.white}, styles.right]}>Hours Flown</Text>
                        <Text style={styles.tailNumber}>
                            {hours > 0 ? `${hours} Hour${hours > 1 ? 's' : ''}` : ''} {minutes > 0 ? `${minutes} Minute${minutes > 1 ? 's' : ''}` : ''}
                        </Text>
                    </View>
                </View>
                <View style={[styles.bottomBar, {borderTopRightRadius: 0, borderTopLeftRadius: 0}]}>
                    <View>
                        <Text style={[styles.crewTitle, {color: Colors.white}]}>Acquired Points</Text>
                        <Text style={styles.departureDate}>{trip.pointValue.toFixed().toLocaleString()} points</Text>
                    </View>
                    {tripReport.maxAltitude && tripReport.maxAltitude > 0 && (
                        <View>
                            <Text style={[styles.crewTitle, {color: Colors.white}, styles.right]}>Max Altitude</Text>
                            <Text style={styles.tailNumber}>{tripReport.maxAltitude.toLocaleString()} feet</Text>
                        </View>
                    )}
                </View>
            </ImageBackground>
            <View>
                <Image
                    style={[styles.image]}
                    source={trip.primaryImageUrl}
                    contentFit="cover"
                />
            </View>
            <View style={{padding: 15}}>
                <View style={styles.itineraryContainer}>
                    <View style={styles.tripInfoGrid}>
                        <View>
                            <Text style={styles.tripInfoValue}>{account.loyaltyPoints.toLocaleString()}</Text>
                            <Text style={styles.tripInfoLabel}>Tier Points</Text>
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={styles.tripInfoValue}>{(Number(account.nextLoyaltyTierThreshold) - Number(account.loyaltyPoints)).toLocaleString()}</Text>
                            <Text style={styles.tripInfoLabel}>Points To Access Elite Tier</Text>
                        </View>
                    </View>
                    <View style={styles.tripInfoGrid}>
                        <View>
                            <Text style={styles.tripInfoValue}>{account.cashbackBalance.toLocaleString()}</Text>
                            <Text style={styles.tripInfoLabel}>Redeemable Points</Text>
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={styles.tripInfoValue}>${(account.cashbackBalance/100).toLocaleString()}</Text>
                            <Text style={styles.tripInfoLabel}>Available Cash</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <Pressable
                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 5}}
                        onPress={() => {
                            Linking.openURL(process.env.EXPO_PUBLIC_API_URL + `/agent/pdfs/trip-report/${tripReport.id}`);
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
        textAlign: 'left',
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