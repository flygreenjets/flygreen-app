import {StyleSheet, View, Text, Dimensions} from "react-native";
import React from "react";

const {width} = Dimensions.get('window');

export default function TripReportView() {

    return (
        <View style={styles.viewContainer}>
            <View>
                <View>
                    <View>
                        <Text>FLIGHT DISTANCE</Text>
                        <Text>2588 nm</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text>TIME FLOWN</Text>
                        <Text>6 hours 17 minutes</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text>CRUISING ALTITUDE</Text>
                        <Text>{(41000).toLocaleString()}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 15,
    }
});