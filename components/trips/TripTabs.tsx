import {Button, StyleSheet, View, Text, Pressable} from "react-native";
import { useState } from "react";
import {Colors} from "@/utils/Colors";

interface TripTabsProps {
    tab: number;
    setTab: (tab: number) => void;
}

export default function TripTabs({tab, setTab}: TripTabsProps) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Pressable onPress={() => {setTab(1)}}>
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