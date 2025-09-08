import {View, Text, StyleSheet} from "react-native";
import {Trip, TripStage} from "@/types/trips";
import TripCard from "@/components/trips/TripCard";
import {Colors} from "@/utils/Colors";
import QuoteSection from "@/components/trips/QuoteSection";
import TripSheetSection from "@/components/trips/trip-sheets/TripSheetSection";
import TripReportSection from "@/components/trips/trip-reports/TripReportSection";
import TripDocumentSection from "./trip-documents/TripDocumentSection";
import {stageIsBefore} from "@/lib/helpers";
import {useAuth} from "@/providers/AuthProvider";

interface TripViewProps {
    trip: Trip
}

// const data: Quote[] = [];
export default function TripView({trip}: TripViewProps) {
    const {activeAccount} = useAuth();
    if (!trip) {
        return null;
    }

    return (
        <>
            <View style={{
                backgroundColor: "#fff",
                paddingHorizontal: 16,
                paddingVertical: 20,
            }}>
                <TripCard trip={trip} showAsCard={false}/>
            </View>
            {stageIsBefore(trip.stage, TripStage.ClosedWon) ?
                trip.quotes && trip.quotes.length > 0 ? (
                    <QuoteSection quotes={trip.quotes} />
                ) : (
                    <View>
                        <Text style={styles.banner}>
                            {activeAccount.agent.shortName} is currently sourcing quotes for this trip. Please check back later.
                        </Text>
                    </View>
                ) : null
            }

            {trip.stage === TripStage.ClosedWon && (
                <>
                    {trip.tripReports.length === 0 && trip.tripSheets && trip.tripSheets.length > 0 && (<TripSheetSection tripSheet={trip.tripSheets[0]}/>)}
                    {trip.tripReports && trip.tripReports.length > 0 && (<TripReportSection trip={trip} account={trip.account} tripReport={trip.tripReports[0]}/>)}
                </>
            )}
            {trip.documents && trip.documents.length > 0 && (
                <TripDocumentSection docs={trip.documents} />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: Colors.flygreenGreen,
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        marginHorizontal: 16,
        textAlign: "center",
        color: Colors.white,
    }
})