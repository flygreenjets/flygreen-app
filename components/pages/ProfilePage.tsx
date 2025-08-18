import {View, Text, StyleSheet, Pressable} from "react-native";
import * as Linking from "expo-linking";
import {Colors} from "@/utils/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Separator from "@/components/ui/Separator";
import Card from "@/components/ui/Card";

const contact = {
    firstName: "Paul",
    lastName: "Atreides",
    phone: "+1234567890",
    email: "paul.a@gmail.com",
    account: {
        name: "Ero Copper",
        rewardTier: "Gold",
        points: 1200,
        progressTowardNextTier: 83, // percentage
        flightsBooked: 10,
        broker: {
            name: "Pascal Couture-Tremblay",
            phone: "+1234567890",
            email: "pct@flygreen.co"
        }
    }
}

export default function profilePage() {
    return (
        <View style={{paddingHorizontal: 10}}>
            <View style={{marginBottom: 15}}>
                <Text style={styles.accountName}>{contact.firstName} {contact.lastName}</Text>
                <View style={styles.contactInfo}>
                    <Text>{contact.email}</Text>
                    <Text>{contact.phone}</Text>
                </View>
            </View>
            <Card>
                <Text style={[styles.accountName, {textAlign: "center"}]}>{contact.account.name}</Text>
                <View style={styles.loyaltyInfoContainer}>
                    <Text style={styles.loyaltyInfo}>
                        <Text style={{fontWeight: "bold"}}>{contact.account.rewardTier}</Text>
                        {"\n"}
                        Tier
                    </Text>
                    <Text style={[styles.loyaltyInfo, styles.loyaltyInfoMiddle]}>
                        <Text style={{fontWeight: "bold"}}>{(contact.account.points).toLocaleString()}</Text>
                        {"\n"}
                        Points
                    </Text>
                    <Text style={[styles.loyaltyInfo]}>
                        <Text style={{fontWeight: "bold"}}>{(contact.account.progressTowardNextTier).toFixed(0)}%</Text>
                        {"\n"}
                        to next tier
                    </Text>
                </View>
            </Card>
            <Card>
                <View style={styles.yourBrokerContainer}>
                    <Text style={styles.yourBrokerTitle}>Your Broker:</Text>
                    <Text style={styles.yourBrokerText}>{contact.account.broker.name}</Text>
                </View>
                <View style={styles.yourBrokerContactInfo}>
                    <Pressable onPress={() => {
                        Linking.openURL(`telprompt:${contact.account.broker.phone}`);
                    }} style={styles.yourBrokerContactButtons}>
                        <MaterialCommunityIcons name="phone-outline" size={30} color={Colors.white} />
                        <Text style={styles.yourBrokerContactButtonText}>
                            Call
                        </Text>
                    </Pressable>
                    <Pressable style={styles.yourBrokerContactButtons}>
                        <MaterialCommunityIcons name="email-outline" size={30} color={Colors.white} />
                        <Text style={styles.yourBrokerContactButtonText}>
                            Email
                        </Text>
                    </Pressable>
                </View>
                <View style={[styles.yourBrokerContactInfo, {marginTop: 10}]}>
                    <Pressable onPress={() => {
                        Linking.openURL(`sms:${contact.account.broker.phone}`);
                    }} style={styles.yourBrokerContactButtons}>
                        <MaterialCommunityIcons name="message-outline" size={30} color={Colors.white} />
                        <Text style={styles.yourBrokerContactButtonText}>
                            Text
                        </Text>
                    </Pressable>
                    <Pressable style={styles.yourBrokerContactButtons}>
                        <MaterialCommunityIcons name="whatsapp" size={30} color={Colors.white} />
                        <Text style={styles.yourBrokerContactButtonText}>
                            Text
                        </Text>
                    </Pressable>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    accountName: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
    },
    yourBrokerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    yourBrokerTitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
    },
    yourBrokerInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    yourBrokerContactInfo: {
        marginTop: 10,
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
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
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
    contactInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        marginBottom: 10,
    }
});