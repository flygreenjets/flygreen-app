import {View, Text, FlatList} from "react-native";
import TripSheetCard from "@/components/tripSheets/TripSheetCard";

export default function TripSheetSection() {
    return (
        <View>
            <View style={{padding: 15}}>
                <Text style={{fontSize: 20}}>Trip Sheet</Text>
            </View>
            <TripSheetCard />
        </View>
    );
}