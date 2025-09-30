import {View, Text, FlatList} from "react-native";
import TripSheetCard from "@/components/trips/trip-sheets/TripSheetCard";
import {TripSheet} from "@/types/trips";
import {useAuth} from "@/providers/AuthProvider";
import EmptyTripList from "@/components/ui/trips/EmptyTripList";

interface TripSheetSectionProps {
    tripSheet?: TripSheet;
}

export default function TripSheetSection({tripSheet}: TripSheetSectionProps) {
    const {activeAccount} = useAuth();
    return (
        <View>
            <View style={{padding: 15}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Trip Sheet</Text>
            </View>
            {tripSheet ? (
                <TripSheetCard tripSheet={tripSheet}/>
            ) : (
                <View style={{
                    paddingBottom: 35
                }}>
                    <EmptyTripList
                        firstLine={`${activeAccount.agent.shortName} is currently preparing the trip sheet for this trip.`}
                        secondLine={`Please check back later.`}
                    />
                </View>
            )}
        </View>
    );
}