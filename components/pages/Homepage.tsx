import {View, Text, StyleSheet} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function Homepage() {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
                <Text style={styles.title}>Welcome back Alex!</Text>
                <MaterialIcons name="notifications" size={24} color="black" />
            </View>
            <View>
                <Text>Here you can find all the latest updates and features.</Text>
                <Text>Explore our new collections and offers.</Text>
                <Text>Don't forget to check your notifications for any important updates.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});