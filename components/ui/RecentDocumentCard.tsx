import {RecentDocument} from "@/types/types";
import {Pressable, Text, View, StyleSheet} from "react-native";
import {Colors} from "@/utils/Colors";
import {router} from "expo-router";

export default function RecentDocumentCard({ document }: { document: RecentDocument }) {
    return (
        <Pressable onPress={() => router.push(`/trip/${document.tripId}`)}>
            <View style={styles.recentDocItem}>
                <Text>{document.type}</Text>
                <Text>{document.itinerary}</Text>
                <Text>{document.description}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    recentDocItem: {
        alignItems: "center",
        marginRight: 15,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: Colors.lightGray,
        padding: 10,
    },
})