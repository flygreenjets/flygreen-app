import {Button, StyleSheet, View, Text, Pressable} from "react-native";
import { useState } from "react";
import {Colors} from "@/utils/Colors";
import {router} from "expo-router";

interface TripTabsProps {
    tab: number;
    setTab: (tab: number) => void;
}

export default function TripTabs({tab, setTab}: TripTabsProps) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Pressable onPress={() => {setTab(1)}}>
                    <Text style={StyleSheet.compose(styles.buttonText, (tab === 1 ? styles.selectedButtonText : ""))}>Upcoming</Text>
                </Pressable>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={() => {setTab(2)}}>
                    <Text style={StyleSheet.compose(styles.buttonText, (tab === 2 ? styles.selectedButtonText : ""))}>Past</Text>
                </Pressable>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={() => {setTab(3)}}>
                    <Text style={StyleSheet.compose(styles.buttonText, (tab === 3 ? styles.selectedButtonText : ""))}>Requested</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 20
    },
    buttonContainer: {
        flex: 1
    },
    buttonText: {
        color: Colors.gray,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10,
    },
    selectedButtonText: {
        color: Colors.flygreenGreen,
        borderBottomColor: Colors.flygreenGreen,
        borderBottomWidth: 1,
    }
});