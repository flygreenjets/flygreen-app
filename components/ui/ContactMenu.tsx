import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import * as Linking from "expo-linking";
import SlidingModal from "@/components/ui/modal/SlidingModal";
import {AntDesign} from "@expo/vector-icons";
import useToggle from "@/hooks/toggle";
import {useAuth} from "@/providers/AuthProvider";
import {ReactNode} from "react";
import {formatForWhatsApp} from "@/utils/helpers";

interface ContactMenuProps {
    button?: ReactNode;
}

export default function ContactMenu({button}: ContactMenuProps) {
    const {
        value: isOpen,
        setTrue: setOpen,
        setFalse: setClose
    } = useToggle(false);

    const {activeAccount} = useAuth();

    return (
        <>
            <Pressable
                onPress={() => {setOpen()}}
                style={{marginRight: 10}}
            >
                {button ?? (
                    <AntDesign name="phone" size={24} color="white" />
                )}
            </Pressable>
            <SlidingModal isOpen={isOpen} onClose={setClose}>
                <View>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Contact {activeAccount.agent.shortName}</Text>
                    <Pressable
                        onPress={() => {
                            Linking.canOpenURL(`telprompt:${activeAccount.agent.phone}`).then((url) => {
                                if (url) {
                                    Linking.openURL(`telprompt:${activeAccount.agent.phone}`);
                                } else {
                                    Alert.alert("We've encountered an issue", "An error occurred while trying to make the call.");
                                }
                            });
                        }}
                    >
                        <Text style={styles.menuItem}>Call</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            Linking.canOpenURL(`sms:${activeAccount.agent.phone}`).then((url) => {
                                if (url) {
                                    Linking.openURL(`sms:${activeAccount.agent.phone}`);
                                } else {
                                    Alert.alert("We've encountered an issue", "An error occurred while trying to send the sms.");
                                }
                            });
                        }}
                    >
                        <Text style={styles.menuItem}>SMS</Text>
                    </Pressable>
                    <Pressable
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
                        <Text style={styles.menuItem}>Email</Text>
                    </Pressable>
                    {activeAccount.agent.whatsapp && (
                        <Pressable
                            onPress={() => {
                                Linking.canOpenURL(`whatsapp://send?phone=${formatForWhatsApp(activeAccount.agent.whatsapp, "1")}`).then((url) => {
                                    if (url) {
                                        Linking.openURL(`whatsapp://send?phone=${formatForWhatsApp(activeAccount.agent.whatsapp, "1")}`);
                                    } else {
                                        Alert.alert("We've encountered an issue", "An error occurred while trying to open WhatsApp.");
                                    }
                                });
                            }}
                        >
                            <Text style={styles.menuItem}>WhatsApp</Text>
                        </Pressable>
                    )}
                </View>
            </SlidingModal>
        </>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    menuItem: {
        padding: 15,
        fontSize: 18,
        color: '#007AFF',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
});