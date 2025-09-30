import { Colors } from "@/utils/Colors";
import {View, StyleSheet, ViewStyle} from "react-native";
export default function Separator({style = null}: {style?: any}) {
    return (
        <View style={[styles.separator, style]}/>
    );
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: Colors.separatorColor,
        marginVertical: 10,
    }
});