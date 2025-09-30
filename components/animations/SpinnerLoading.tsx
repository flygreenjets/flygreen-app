import { Colors } from "@/utils/Colors";
import React, { useRef, useEffect } from "react";
import {Animated, View, StyleSheet, Easing, ActivityIndicator} from "react-native";

export default function SpinnerLoading() {
    const spinAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 1500,
                easing: Easing.inOut(Easing.cubic),
                useNativeDriver: true,
            })
        ).start();
    }, [spinAnim]);

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "361deg"],
    });

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.flygreenGreen} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    spinner: {
        width: 20,
        height: 20,
        borderWidth: 4,
        borderColor: Colors.lightGray,
        borderTopColor: Colors.flygreenGreen, // iOS-style blue
        borderRadius: 20,
    },
});
