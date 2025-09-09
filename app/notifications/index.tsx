import {View, Text, StyleSheet, ScrollView, Pressable} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Colors} from "@/utils/Colors";
import { formatDistanceStrict } from "date-fns";
import {router} from "expo-router";
import ListItem from "@/components/ui/parts/ListItem";
import {FontAwesome6} from "@expo/vector-icons";

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
                       <ListItem
                           borderBottom={key < notifications.length-1 && notifications.length > 1}
                           key={key}
                           onPress={() => {router.push(`/trip/${notification.tripId}`)}}
                           icon={<FontAwesome6 style={styles.icon} name="bell" size={28} color="white" />
                       }>
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
                       </ListItem>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    notifTitleContainer: {
        flexDirection: "row",
        gap: 5
    },
    icon: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: Colors.flygreenGreen,
        borderRadius: 50,
    }
})