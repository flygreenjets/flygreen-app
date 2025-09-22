import {View, StyleSheet, Platform} from "react-native";
import WebView from "react-native-webview";
import {useState} from "react";
import SpinnerLoading from "@/components/animations/SpinnerLoading";
import {Colors} from "@/utils/Colors";
import {useLocalSearchParams} from "expo-router";

export default function Url() {
    const [loading, setLoading] = useState(true);
    const {url} = useLocalSearchParams();

    const getUrl = () => {
        if (Platform.OS === "ios") {
            return url as string;
        }
        return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url as string)}`
    }

    return (
        <>
            {loading &&
                <View style={styles.container}>
                    <SpinnerLoading/>
                </View>
            }
            <WebView
                onLoad={() => {setLoading(false)}}
                source={{ uri: getUrl() }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
})