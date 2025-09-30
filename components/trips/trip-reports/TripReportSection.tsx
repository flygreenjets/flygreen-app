import {View, Text, FlatList} from "react-native";
import TripReportCard from "@/components/trips/trip-reports/TripReportCard";
import {Trip, TripReport} from "@/types/trips";
import {Account} from "@/types/types";

interface TripReportSectionProps {
    tripReport: TripReport;
    account: Account;
    trip: Trip;
}

export default function TripReportSection({tripReport, account, trip}: TripReportSectionProps) {
    return (
        <View>
            <View style={{padding: 15}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Trip Report</Text>
            </View>
            <TripReportCard account={account} tripReport={tripReport} trip={trip}/>
        </View>
    );
}