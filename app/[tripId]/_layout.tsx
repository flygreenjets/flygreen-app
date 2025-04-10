import {router, Slot, Stack, useLocalSearchParams} from "expo-router";
import {Colors} from "@/utils/Colors";
import {Button, Pressable, Text, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function TripPageLayout() {
    return (
        <Stack
            screenOptions={{
                contentStyle: {
                    paddingHorizontal: 16,
                    paddingTop: 16,
                    backgroundColor: Colors.white,
                },
                title: "Trip Details",
                headerShown: false,
            }}
        />
    )
}
