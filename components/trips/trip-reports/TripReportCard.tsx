import {Text, StyleSheet, View, Dimensions, Pressable, FlatList} from 'react-native';
import Card from "@/components/ui/Card";
import {Colors} from "@/utils/Colors";
import {Image} from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {showLocation} from "react-native-map-link";
import Ionicons from "@expo/vector-icons/Ionicons";
import DotPagination from "@/components/ui/DotPagination";
import {router} from "expo-router";
import ShareButton from "@/components/ui/buttons/ShareButton";

const {width} = Dimensions.get('screen');

export default function TripSheetCard() {
    return (
        <Card style={styles.mainContainer}>
            <View style={styles.rowContainer}>
                <View>
                    <Text style={styles.subTitle}>FLIGHT DISTANCE</Text>
                    <Text>2588 nm</Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>TIME FLOWN</Text>
                    <Text>6 hours 17 minutes</Text>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View>
                    <Text style={styles.subTitle}>CRUISING ALTITUDE</Text>
                    <Text>{(41000).toLocaleString()} feet</Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>Points Earned</Text>
                    <Text>{(15000).toLocaleString()}</Text>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 10,
    },
    subTitle: {
        fontSize: 12,
        color: '#888',
    },
    value: {
        fontSize: 16,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    middle: {
        textAlign: 'center',
    },
    right: {
        textAlign: 'right',
    },
});