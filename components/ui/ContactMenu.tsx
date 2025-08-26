import {Modal as RNModal, View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Pressable} from 'react-native';
import * as Linking from "expo-linking";

const {height} = Dimensions.get('window');

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

export default function ContactMenu({isOpen, onClose}: { isOpen: boolean, onClose: () => void }) {
    return (
        <RNModal
            animationType="slide"
            transparent={true}
            visible={isOpen}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={[styles.modalOverlay]} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContent}>
                <View style={styles.menuContainer}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Contact Your Broker</Text>
                    <Pressable
                        onPress={() => {
                            Linking.openURL(`telprompt:${contact.account.broker.phone}`);
                        }}
                    >
                        <Text style={styles.menuItem}>Call</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            Linking.openURL(`sms:${contact.account.broker.phone}`);
                        }}
                    >
                        <Text style={styles.menuItem}>SMS</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {

                        }}
                    >
                        <Text style={styles.menuItem}>Email</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {

                        }}
                    >
                        <Text style={styles.menuItem}>WhatsApp</Text>
                    </Pressable>
                </View>
            </View>
        </RNModal>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    menuContainer: {
        width: '100%',
        backgroundColor: 'white',
        height: height/3,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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