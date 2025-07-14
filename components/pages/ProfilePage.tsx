import {View, Text, StyleSheet, Pressable} from "react-native";
import * as Linking from "expo-linking";
import {Colors} from "@/utils/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Separator from "@/components/ui/Separator";

const account = {
    name: "Ero Copper",
    rewardTier: "Gold",
    points: 1200,
    progressTowardNextTier: 83, // percentage
    flightsBooked: 10,
}

export default function profilePage() {
    return (
        <View style={{paddingHorizontal: 10}}>
            <View style={styles.accountInfoContainer}>
                <Text style={styles.accountName}>Ero Copper Corp.</Text>
            </View>
            <View style={styles.loyaltyInfoContainer}>
                <Text style={styles.loyaltyInfo}>
                    <Text style={{fontWeight: "bold"}}>Gold</Text>
                    {"\n"}
                    Tier
                </Text>
                <Text style={[styles.loyaltyInfo, styles.loyaltyInfoMiddle]}>
                    <Text style={{fontWeight: "bold"}}>182,293</Text>
                    {"\n"}
                    Points
                </Text>
                <Text style={[styles.loyaltyInfo]}>
                    <Text style={{fontWeight: "bold"}}>87%</Text>
                    {"\n"}
                    to next tier
                </Text>
            </View>
            <Separator style={{width: "90%", marginHorizontal: "auto"}} />
            <View style={styles.yourBrokerContainer}>
                <Text style={styles.yourBrokerTitle}>Your Broker:</Text>
                <View style={styles.yourBrokerInfoContainer}>
                    <Text style={styles.yourBrokerText}>Pascal Couture-Tremblay</Text>
                </View>
            </View>
                <View style={styles.yourBrokerContactInfo}>
                    <Pressable onPress={() => {
                        Linking.openURL(`telprompt:+1234567890`);
                    }} style={styles.yourBrokerContactButtons}>
                        <MaterialCommunityIcons name="phone-outline" size={30} color={Colors.white} />
                        <Text style={styles.yourBrokerContactButtonText}>
                            Call Pascal
                        </Text>
                    </Pressable>
                    <Pressable style={styles.yourBrokerContactButtons}>
                        <MaterialCommunityIcons name="email-outline" size={30} color={Colors.white} />
                        <Text style={styles.yourBrokerContactButtonText}>
                            Email Pascal
                        </Text>
                    </Pressable>
                </View>
                <View style={[styles.yourBrokerContactInfo, {marginTop: 10}]}>
                    <Pressable onPress={() => {
                        Linking.openURL(`sms:+1234567890`);
                    }} style={styles.yourBrokerContactButtons}>
                        <MaterialCommunityIcons name="message-outline" size={30} color={Colors.white} />
                        <Text style={styles.yourBrokerContactButtonText}>
                            Text Pascal
                        </Text>
                    </Pressable>
                    <Pressable style={styles.yourBrokerContactButtons}>
                        <MaterialCommunityIcons name="whatsapp" size={30} color={Colors.white} />
                        <Text style={styles.yourBrokerContactButtonText}>
                            Text Pascal
                        </Text>
                    </Pressable>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    accountInfoContainer: {

    },
    accountName: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
    },
    yourBrokerContainer: {
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    yourBrokerTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
    },
    yourBrokerInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    yourBrokerContactInfo: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 15
    },
    yourBrokerText: {
        textAlign: "center",
        fontSize: 18
    },
    yourBrokerContactButtons: {
        flex: 1,
        backgroundColor: Colors.flygreenGreen,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    yourBrokerContactButtonText: {
        color: Colors.white,
        fontSize: 16,
    },
    loyaltyInfoContainer: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    loyaltyInfoMiddle: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: Colors.flygreenGreen,
    },
    loyaltyInfo: {
        flex: 1,
        textAlign: "center",
        fontSize: 15,
        marginVertical: 5,
    },
});