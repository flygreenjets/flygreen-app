import TripSheetView from "@/components/trips/trip-sheets/TripSheetView";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
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