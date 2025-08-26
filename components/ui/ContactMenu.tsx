import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import * as Linking from "expo-linking";
import SlidingModal from "@/components/ui/modal/SlidingModal";
import {AntDesign} from "@expo/vector-icons";
import useToggle from "@/hooks/toggle";

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

export default function ContactMenu() {
    const {
        value: isOpen,
        setTrue: setOpen,
        setFalse: setClose
    } = useToggle(false);

    return (
        <>
            <Pressable
                onPress={() => {setOpen()}}
                style={{marginRight: 10}}
            >
                <AntDesign name="phone" size={24} color="white" />
            </Pressable>
            <SlidingModal isOpen={isOpen} onClose={setClose}>
                <View>
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