import {View, Text, FlatList} from "react-native";
import TripReportCard from "@/components/trips/trip-reports/TripReportCard";
export default function TripReportSection() {
    return (
        <View>
            <View style={{padding: 15}}>
                <Text style={{fontSize: 20}}>Trip Report</Text>
            </View>
            <TripReportCard />
        </View>
    );
}