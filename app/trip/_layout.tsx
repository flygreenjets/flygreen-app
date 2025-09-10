import {router, Stack} from "expo-router";
import {Colors} from "@/utils/Colors";
import {Pressable} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {StatusBar} from "expo-status-bar";
import ContactMenu from "@/components/ui/ContactMenu";

export default function TripPageLayout() {
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
                            onPress={() => router.canGoBack() ? router.back() : router.push('/')}
                        >
                            <Ionicons name="arrow-back" size={24} color={Colors.white} />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <ContactMenu/>
                    ),
                    headerStyle: {
                        backgroundColor: Colors.flygreenGreen,
                    },
                }}
            />
        </>
    )
}
