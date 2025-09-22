import {router, Stack} from "expo-router";
import {Colors} from "@/utils/Colors";
import {Pressable} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ContactMenu from "@/components/ui/ContactMenu";

export default function WebViewerLayout() {
    return (
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
                headerRight: () => (
                    <ContactMenu/>
                ),
                headerStyle: {
                    backgroundColor: Colors.flygreenGreen,
                },
            }}
        />
    )
}