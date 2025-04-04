import {StyleSheet, View} from "react-native";

export default function TripCard() {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Trip Title</Text>
            <Text style={styles.description}>Trip Description</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 75,
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        
    }
});