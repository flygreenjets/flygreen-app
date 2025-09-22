import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/utils/Colors";
import {Loyalty} from "@/types/types";

interface LoyaltyProgressBarProps {
    progress: number;
    loyaltyTier: Loyalty;
    nextLoyaltyTier?: Loyalty;
}

export default function LoyaltyProgressBar({ progress, loyaltyTier, nextLoyaltyTier }: LoyaltyProgressBarProps) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "center",
            width: "100%",
            gap: 10,
        }}>
            <Text style={styles.tierText}>{loyaltyTier.name}</Text>
            <View style={styles.container}>
                <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: Colors.white }]}/>
            </View>
            <Text style={[styles.tierText, {textAlign: "right"}]}>{nextLoyaltyTier?.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tierText: {
        color: Colors.white,
    },
    container: {
        flex: 8,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: Colors.white,
        padding: 2,
    },
    progressFill: {
        padding: 5,
        borderRadius: 50,
        overflow: 'hidden',
    },
    shimmerWrapper: {
        ...StyleSheet.absoluteFillObject,
    }
});
