import {View, Text, StyleSheet, Pressable, Alert} from "react-native";
import * as Linking from "expo-linking";
import {Colors} from "@/utils/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Card from "@/components/ui/Card";
import React, {useState} from "react";
import {useAuth} from "@/providers/AuthProvider";
import ConfirmButton from "@/components/ui/buttons/ConfirmButton";
import {router} from "expo-router";
import {formatForWhatsApp} from "@/utils/helpers";
import SpinnerLoading from "@/components/animations/SpinnerLoading";

export default function profilePage() {
    const [loggingOut, setLoggingOut] = useState(false);
    const {logout, user, activeAccount} = useAuth();
    return (
        <View style={{paddingHorizontal: 10}}>
            <View style={{marginBottom: 15}}>
                <Text style={styles.accountName}>{user.name}</Text>
                <View style={styles.contactInfo}>
                    <Text>{user.email}</Text>
                </View>
            </View>
            <Card>
                <Text style={[styles.accountName, {textAlign: "center"}]}>{activeAccount.name}</Text>
                <View style={styles.loyaltyInfoContainer}>
                    <Text style={styles.loyaltyInfo}>
                        <Text style={{fontWeight: "bold"}}>{activeAccount.loyalty.name}</Text>
                        {"\n"}
                        Tier
                    </Text>
                    <Text style={[styles.loyaltyInfo, styles.loyaltyInfoMiddle]}>
                        <Text style={{fontWeight: "bold"}}>{(activeAccount.loyaltyPoints).toLocaleString()}</Text>
                        {"\n"}
                        Points
                    </Text>
                    <Text style={[styles.loyaltyInfo]}>
                        {activeAccount.nextLoyaltyTier ? (
                            <>
                                <Text style={{fontWeight: "bold"}}>{((activeAccount.loyaltyPoints / activeAccount.nextLoyaltyTier.threshold)*100).toFixed(0)}%</Text>
                                {"\n"}
                                to next tier
                            </>
                        ) : (
                            <>
                                <Text style={{fontWeight: "bold"}}>N/A</Text>
                                {"\n"}
                                at top tier
                            </>
                        )}
                    </Text>
                </View>
                <Pressable
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 5}}
                    onPress={() => {
                        router.push(`/web-viewer/${encodeURIComponent(process.env.EXPO_PUBLIC_API_URL + `/agent/pdfs/loyalty-points/${activeAccount.id}`)}`);
                    }}
                >
                    <Text style={{color: Colors.flygreenGreen}}>View Rewards History</Text>
                    <MaterialCommunityIcons name="file-document-outline" size={20} color={Colors.flygreenGreen} />
                </Pressable>
            </Card>
            {activeAccount.agent && (
                <Card>
                    <View style={styles.yourBrokerContainer}>
                        <Text style={styles.yourBrokerTitle}>Your Broker:</Text>
                        <Text style={styles.yourBrokerText}>{activeAccount.agent.name}</Text>
                    </View>
                    <View style={styles.yourBrokerContactInfo}>
                        <Pressable onPress={() => {
                            Linking.canOpenURL(`telprompt:${activeAccount.agent.phone}`).then((url) => {
                                if (url) {
                                    Linking.openURL(`telprompt:${activeAccount.agent.phone}`);
                                } else {
                                    Alert.alert("We've encountered an issue", "An error occurred while trying to make the call.");
                                }
                            });
                        }} style={styles.yourBrokerContactButtons}>
                            <MaterialCommunityIcons name="phone-outline" size={30} color={Colors.white} />
                            <Text style={styles.yourBrokerContactButtonText}>
                                Call
                            </Text>
                        </Pressable>
                        <Pressable style={styles.yourBrokerContactButtons}
                                   onPress={() => {
                                       Linking.canOpenURL(`mailto:${activeAccount.agent.email}`).then((url) => {
                                           if (url) {
                                               Linking.openURL(`mailto:${activeAccount.agent.email}`);
                                           } else {
                                               Alert.alert("We've encountered an issue", "An error occurred while trying to send the email.");
                                           }
                                       });
                                   }}
                        >
                            <MaterialCommunityIcons name="email-outline" size={30} color={Colors.white} />
                            <Text style={styles.yourBrokerContactButtonText}>
                                Email
                            </Text>
                        </Pressable>
                    </View>
                    <View style={[styles.yourBrokerContactInfo, {marginTop: 10}]}>
                        <Pressable onPress={() => {
                            Linking.canOpenURL(`sms:${activeAccount.agent.phone}`).then((url) => {
                                if (url) {
                                    Linking.openURL(`sms:${activeAccount.agent.phone}`);
                                } else {
                                    Alert.alert("We've encountered an issue", "An error occurred while trying to send the sms.");
                                }
                            });
                            Linking.openURL(`sms:${activeAccount.agent.phone}`);
                        }} style={styles.yourBrokerContactButtons}>
                            <MaterialCommunityIcons name="message-outline" size={30} color={Colors.white} />
                            <Text style={styles.yourBrokerContactButtonText}>
                                Text
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                Linking.canOpenURL(`whatsapp://send?phone=${formatForWhatsApp(activeAccount.agent.phone, "1")}`).then((url) => {
                                    if (url) {
                                        Linking.openURL(`whatsapp://send?phone=${formatForWhatsApp(activeAccount.agent.phone, "1")}`);
                                    } else {
                                        Alert.alert("We've encountered an issue", "An error occurred while trying to open WhatsApp.");
                                    }
                                });
                            }}
                            style={styles.yourBrokerContactButtons}
                        >
                            <MaterialCommunityIcons name="whatsapp" size={30} color={Colors.white} />
                            <Text style={styles.yourBrokerContactButtonText}>
                                WhatsApp
                            </Text>
                        </Pressable>
                    </View>
                </Card>
            )}
            {loggingOut ? (
                <SpinnerLoading/>
            ) : (
                <ConfirmButton
                    buttonStyle={styles.logoutButton}
                    confirmAction={() => {
                        setLoggingOut(true);
                        logout().then(() => {
                            setLoggingOut(false);
                        });
                    }}
                    buttonText={"Logout"}
                    confirmTitle="Logout"
                    confirmText="Are you sure you want to logout?"
                />
            )}
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
    },
    logoutButton: {
        fontWeight: "bold",
        backgroundColor: "white",
        borderColor: Colors.flygreenGreen,
        borderWidth: 1,
        color: Colors.flygreenGreen ,
        padding: 15,
        textAlign: "center",
        borderRadius: 50,
    }
});