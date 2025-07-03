import TripSheetView from "@/components/tripSheets/TripSheetView";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "react-native";
import { useNavigation } from "expo-router";
import {useEffect} from "react";

export default function TripSheetPage() {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            title: `Your trip to there`,
        })
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <TripSheetView/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}