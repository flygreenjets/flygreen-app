import {router, Slot, Stack, useLocalSearchParams} from "expo-router";
import {Colors} from "@/utils/Colors";
import {Button, Pressable, Text} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function TripPageLayout() {
    return (
        <Stack
            screenOptions={{
                headerBackVisible: false,
                animationTypeForReplace: "pop",
                contentStyle: {
                    paddingHorizontal: 16,
                    paddingTop: 16,
                    backgroundColor: Colors.white,
                },
                title: "",
                headerLeft: () => (
                    <Pressable
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color={Colors.white} />
                    </Pressable>
                ),
                headerStyle: {
                    backgroundColor: Colors.flygreenGreen,
                }
            }}
        />
    )
}
