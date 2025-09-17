import {StyleSheet, Text, View} from "react-native";
import ContactMenu from "@/components/ui/ContactMenu";
import {Colors} from "@/utils/Colors";

interface EmptyTripListProps {
    firstLine?: string;
    secondLine?: string;
}

export default function EmptyTripList({firstLine = "", secondLine = ""}: EmptyTripListProps) {
    return (
        <View style={styles.emptyContainer}>
            <Text>{firstLine !== "" ? firstLine : `You don’t have any upcoming trips right now.`}</Text>
            <Text>{secondLine !== "" ? secondLine : `Contact your broker to start planning.`}</Text>
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