import {View, Text, FlatList} from "react-native";
import TripSheetCard from "@/components/trips/trip-sheets/TripSheetCard";
import {TripSheet} from "@/types/trips";

interface TripSheetSectionProps {
    tripSheet: TripSheet;
}

export default function TripSheetSection({tripSheet}: TripSheetSectionProps) {
    return (
        <View>
            <View style={{padding: 15}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Trip Sheet</Text>
            </View>
            <TripSheetCard tripSheet={tripSheet}/>
        </View>
    );
}