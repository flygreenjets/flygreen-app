import { View, Animated, Easing, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "@/utils/Colors";
import { useEffect, useRef } from "react";
import {profile} from "@expo/fingerprint/build/utils/Profile";

interface ProgressBarProps {
    progress: number; // Progress percentage (0 to 100)
    done?: boolean;
    doneColor?: string;
}

export default function ProgressBar({ progress, done = false, doneColor = "green" }: ProgressBarProps){
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const translateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-150, 300], // Adjust based on shimmer width
    });

    return (
        <View style={styles.container}>
            <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: done ? doneColor : Colors.lightGreen }]}>
                {!done && (
                    <Animated.View
                        style={[
                            styles.shimmerWrapper,
                            { transform: [{ translateX }] },
                        ]}
                    >
                        <LinearGradient
                            colors={['transparent', 'rgba(255,255,255,0.4)', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.shimmer}
                        />
                    </Animated.View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 10,
        backgroundColor: '#e0e0df',
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
    },
    progressFill: {
        height: '100%',
        borderRadius: 50,
        overflow: 'hidden',
    },
    shimmerWrapper: {
        ...StyleSheet.absoluteFillObject,
    },
    shimmer: {
        width: 100,
        height: '100%',
    },
});
