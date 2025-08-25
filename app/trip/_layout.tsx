import {router, Stack} from "expo-router";
import {Colors} from "@/utils/Colors";
import {Pressable} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {StatusBar} from "expo-status-bar";
import {AntDesign} from "@expo/vector-icons";
import useToggle from "@/hooks/toggle";
import ContactMenu from "@/components/ui/ContactMenu";

export default function TripPageLayout() {
    const {
        value: open,
        setTrue: setOpen,
        setFalse: setClose
    } = useToggle(false);
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
                    headerRight: () => (
                        <>
                            <Pressable
                                onPress={() => {setOpen()}}
                                style={{marginRight: 10}}
                            >
                                <AntDesign name="phone" size={24} color="white" />
                            </Pressable>
                            <ContactMenu isOpen={open} onClose={() => setClose()}/>
                        </>
                    ),
                    headerStyle: {
                        backgroundColor: Colors.flygreenGreen,
                    },
                }}
            />
        </>
    )
}
