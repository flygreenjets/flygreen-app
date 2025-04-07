import {Button, StyleSheet, View, Text, Pressable} from "react-native";
import { useState } from "react";
import {Colors} from "@/utils/Colors";

export default function TripTabs() {
    const [tab, setTab] = useState(1);
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Pressable onPress={() => {alert('ALOO')}}>
                    <Text>Upcoming</Text>
                </Pressable>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {setTab(2)}}
                    title="Past"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {setTab(3)}}
                    title="Requested"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        color: Colors.flygreenGreen,
        borderBottomColor: Colors.flygreenGreen,
        borderBottomWidth: 1,
        flex: 1
    }
});