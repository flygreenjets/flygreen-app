import {View, Text, StyleSheet} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import {formatDistanceStrict} from "date-fns";
import {Colors} from "@/utils/Colors";

interface ListItemProps{
    icon: React.ReactNode;
    children: React.ReactNode;
}

export default function ListItem({icon, children}: ListItemProps) {
    return (
        <View style={styles.notificationContainer}>
            <View>
                {icon}
            </View>
            <View>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    notificationContainer: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 17,
        gap: 10,
        backgroundColor: Colors.white,
        alignItems: "center",
    },
})