import {useLocalSearchParams, useRouter} from "expo-router";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import TripView from "@/components/trips/TripView";
import {useEffect} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import useQuery from "@/hooks/query";
import {Alert, RefreshControl, ScrollView} from "react-native";

export default function TripPage({}) {
    const {tripId} = useLocalSearchParams();
    const router = useRouter();

    const {data, loading, error, refetch} = useQuery(`/trips/${tripId}`);

    useEffect(() => {
        if (error) {
            Alert.alert("Error", "Failed to load trip.", [
                { text: "OK", onPress: () => router.back() }
            ]);
        }
        if (loading) return;
    }, [loading]);

    return (
        <GestureHandlerRootView>
            <SafeAreaProvider>
                <SafeAreaView>
                    <ScrollView
                        style={{
                            height: "100%"
                        }}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
                    >
                        <TripView trip={data?.data} />
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}