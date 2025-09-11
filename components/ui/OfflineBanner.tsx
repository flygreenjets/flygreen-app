import {isConnected} from "@/lib/api/ApiFactory";
import {StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {Colors} from "@/utils/Colors";

export default function OfflineBanner() {
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const init = async () => {
            const status = await isConnected();
            setConnected(status);
        }
        init();
    }, []);

    return !connected ? (
        <View style={styles.offlineBanner}>
            <Text style={{textAlign: "center"}}>
                You are currently offline. Data might be outdated. Some features may be unavailable.
            </Text>
        </View>
    ) : null
}

const styles = StyleSheet.create({
    offlineBanner: {
        backgroundColor: Colors.gold,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})