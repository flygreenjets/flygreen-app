import {View, Text, StyleSheet, ScrollView, Pressable} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Colors} from "@/utils/Colors";
import { formatDistanceStrict } from "date-fns";
import {router} from "expo-router";

const notifications = [
    {
        icon: "document-text-outline",
        title: "New Quote",
        description: "Your broker has added a new quote to your trip",
        date: "2025-08-21",
        tripId: "1"
    },
    {
        icon: "document-text-outline",
        title: "New Quote",
        description: "Your broker has added a new quote to your trip",
        date: "2025-08-21",
        tripId: "2"
    },
    {
        icon: "document-text-outline",
        title: "New Quote",
        description: "Your broker has added a new quote to your trip",
        date: "2025-08-21",
        tripId: "2"
    },
    {
        icon: "document-text-outline",
        title: "New Quote",
        description: "Your broker has added a new quote to your trip",
        date: "2025-08-21",
        tripId: "1"
    }
]

export default function NotificationsPage() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{backgroundColor: "white"}}>
                <ScrollView style={{height: "100%"}}>
                    {notifications.map((notification, key) => (
                        <Pressable key={key} onPress={() => {router.push(`/trip/${notification.tripId}`)}}>
                            <View style={styles.notificationContainer}>
                                <View style={styles.iconContainer}>
                                    <Ionicons style={styles.icon} name="document-text-outline" size={32} color="white" />
                                </View>
                                <View style={styles.textContainer}>
                                    <View style={styles.notifTitleContainer}>
                                        <Text>{notification.title}</Text>
                                        <Text>•</Text>
                                        <Text style={{color: "#888"}}>
                                            {
                                                formatDistanceStrict(new Date(notification.date), new Date(), {
                                                    addSuffix: true,
                                                })
                                            }
                                        </Text>
                                    </View>
                                    <Text>{notification.description}</Text>
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    notificationContainer: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 17,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
        gap: 10,
        backgroundColor: Colors.white,
        alignItems: "center",
    },
    notifTitleContainer: {
        flexDirection: "row",
        gap: 5
    },
    iconContainer: {

    },
    textContainer: {

    },
    icon: {
        padding: 10,
        backgroundColor: Colors.flygreenGreen,
        borderRadius: 50,
    }
})