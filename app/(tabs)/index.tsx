import { View, Text, StyleSheet } from 'react-native';

export default function Tab() {
    // trips data
    const trips = [
        {
            id: 1,
            name: "Trip 1",
            description: "Description 1",
        },
        {
            id: 2,
            name: "Trip 2",
            description: "Description 2",
        },
    ];

    return (
        <View style={styles.container}>
            <Text>Tab Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 75,
        paddingHorizontal: 20,
    },
});