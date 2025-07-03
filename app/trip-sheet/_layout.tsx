import {StatusBar} from "expo-status-bar";
import {router, Stack} from "expo-router";
import {Colors} from "@/utils/Colors";
import {Pressable} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TripSheetPageLayout() {
    return (
        <>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerBackVisible: false,
                    animationTypeForReplace: "pop",
                    title: "",
                    headerTitleStyle: {
                        color: Colors.white,
                    },
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
        </>
    )
}