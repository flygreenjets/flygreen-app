import {Pressable, StyleSheet, Text, View} from "react-native";
import {Trip} from "@/types/trips";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {router} from "expo-router";
import { ReactNode } from "react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import SpinnerLoading from "@/components/animations/SpinnerLoading";


interface TripCardProps {
    trip: Trip,
    showAsCard?: boolean
}
export default function TripCard({trip, showAsCard = true}: TripCardProps) {
    const getContainer = (children: ReactNode) => {
        return showAsCard ? (
            <Card>
                {children}
            </Card>
        ) : (
            <View>
                {children}
            </View>
        )
    }

    return getContainer(
        <>
            <View>
                <Text style={{
                    marginBottom: 8
                }}>
                    {trip.departureDate}
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
            }}>
                <View style={styles.airportInfo}>
                    <Text style={styles.airportCode}>{trip.departureAirport.code}</Text>
                    <Text style={styles.airportName}>{trip.departureAirport.name}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name="airplane" size={26} color="#205046" />
                </View>
                <View style={{...styles.airportInfo, alignItems: 'flex-end'}}>
                    <Text style={styles.airportCode}>{trip.destinationAirport.code}</Text>
                    <Text style={{...styles.airportName, textAlign: "right"}}>{trip.destinationAirport.name}</Text>
                </View>
            </View>
            {trip.stage === "Closed Won" ? (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                }}>
                    <View style={{...styles.flightInfo}}>
                        <MaterialIcons name="person" size={16} color="#205046" />
                        <Text>{trip.pax}</Text>
                    </View>
                    <View style={{...styles.flightInfo, justifyContent: 'center'}}>
                        <MaterialIcons name="access-time" size={16} color="#205046" />
                        <Text style={{
                            textAlign: "center"
                        }}>{trip.duration}</Text>
                    </View>
                    <View style={{...styles.flightInfo, justifyContent: 'flex-end'}}>
                        <MaterialIcons name="location-pin" size={16} color="#205046" />
                        <Text>
                            {trip.fuelStops && trip.fuelStops > 0 ?
                                `${trip.fuelStops} stop${trip.fuelStops && trip.fuelStops > 1 ? 's' : null}`
                            : "Non-stop"}

                        </Text>
                    </View>
                </View>
            ) : (
                <View style={styles.progressView}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={styles.progressText}>Confirming aircraft availability and pricing</Text>
                    </View>
                    <ProgressBar progress={trip.rfqCount > 0 ? ((Number(trip.rfqResolved)/Number(trip.rfqCount))*100): 10} />
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 75,
        paddingHorizontal: 20,
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
    progressView: {
        backgroundColor: "#fff",
        paddingVertical: 10,
    },
    progressText: {
        marginVertical: 10,
        fontSize: 14,
    }
});