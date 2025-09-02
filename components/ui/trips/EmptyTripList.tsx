import {StyleSheet, Text, View} from "react-native";
import ContactMenu from "@/components/ui/ContactMenu";
import {Colors} from "@/utils/Colors";

export default function EmptyTripList() {
    return (
        <View style={styles.emptyContainer}>
            <Text>You don’t have any charters right now.</Text>
            <Text>Contact your broker to start planning.</Text>
            <ContactMenu button={(
                <Text style={{
                    marginTop: 20,
                    color: 'white',
                    backgroundColor: Colors.flygreenGreen,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 20,
                    fontWeight: '600',
                    fontSize: 16,
                }}>Contact Broker</Text>
            )}/>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    }
});