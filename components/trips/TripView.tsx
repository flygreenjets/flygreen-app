import {View, ScrollView, Text, StyleSheet, RefreshControl} from "react-native";
import {Quote, Trip} from "@/types/trips";
import TripCard from "@/components/trips/TripCard";
import {Colors} from "@/utils/Colors";
import QuoteSection from "@/components/trips/QuoteSection";
import TripSheetSection from "@/components/trips/trip-sheets/TripSheetSection";
import TripReportSection from "@/components/trips/trip-reports/TripReportSection";
import TripDocumentSection from "./trip-documents/TripDocumentSection";
import {TRIP_STAGE_CLOSED_WON, TRIP_STAGE_DILIGENCE, TRIP_STAGE_QUOTING, TRIP_STAGE_SOURCING} from "@/types/constants";

interface TripViewProps {
    trip: Trip
}

// const data: Quote[] = [];
export default function TripView({trip}: TripViewProps) {

    if (!trip) {
        return null;
    }
    const checkStage = () => {
        return trip.stage === TRIP_STAGE_SOURCING || trip.stage === TRIP_STAGE_QUOTING || trip.stage === TRIP_STAGE_DILIGENCE;
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
            {checkStage() ?
                trip.quotes && trip.quotes.length > 0 ? (
                    <QuoteSection quotes={trip.quotes} />
                ) : (
                    <View>
                        <Text style={styles.banner}>
                            Pascal is currently sourcing quotes for this trip. Please check back later.
                        </Text>
                    </View>
                ) : null
            }

            {trip.stage === TRIP_STAGE_CLOSED_WON && (
                <>
                    {trip.tripSheets && trip.tripSheets.length > 0 && (<TripSheetSection tripSheet={trip.tripSheets[0]}/>)}
                    {trip.tripReports && trip.tripReports.length > 0 && (<TripReportSection trip={trip} account={trip.account} tripReport={trip.tripReports[0]}/>)}
                </>
            )}
            <TripDocumentSection />
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