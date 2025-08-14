import {Text, View, StyleSheet} from "react-native";
import WebView from "react-native-webview";
import {useEffect, useState} from "react";
import SpinnerLoading from "@/components/animations/SpinnerLoading";
import {Colors} from "@/utils/Colors";
import {useNavigation} from "expo-router";

export default function CabinView() {
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: `Cabin View`,
        })
    }, []);
    return (
        <>
            {loading &&
                <View style={styles.container}>
                    <SpinnerLoading/>
                </View>
            }
            <WebView
                onLoad={() => {setLoading(false)}}
                source={{ uri: 'https://my.matterport.com/show/?m=S1B5pM6kxJk' }}
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