import * as Sharing from "expo-sharing";
import {Pressable, Text, StyleSheet} from "react-native";
import {Colors} from "@/utils/Colors";

interface  ShareButtonProps {
    shareUrl: string;
    dialogTitle?: string;
    mimeType?: string;
    buttonText?: string;
}

export default function ShareButton({shareUrl, dialogTitle = "", buttonText = "Share", mimeType = "image/jpeg"}: ShareButtonProps) {
    return (
        <Pressable
            onPress={() => {
                Sharing.shareAsync(shareUrl, {
                    dialogTitle: dialogTitle,
                    mimeType: mimeType,
                }).catch((error) => {
                    console.error("Error sharing quote:", error);
                });
            }}
        >
            <Text style={styles.shareButton}>{buttonText}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    shareButton: {
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.flygreenGreen,
        color: Colors.flygreenGreen,
        fontWeight: "bold",
        fontSize: 16,
    },
});