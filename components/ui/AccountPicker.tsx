import {Text, View, StyleSheet, TouchableWithoutFeedback, Pressable} from 'react-native';
import SlidingModal from "@/components/ui/modal/SlidingModal";
import useToggle from "@/hooks/toggle";
import {useAuth} from "@/providers/AuthProvider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {router} from "expo-router";

export default function AccountPicker() {
    const {activeAccount, user, setActiveAccount} = useAuth();

    const {
        value: isOpen,
        setTrue: setOpen,
        setFalse: setClose
    } = useToggle(false);

    return (
        <>
            <Pressable style={styles.titleContainer} onPress={setOpen}>
                <Text style={styles.title}>
                    {activeAccount.name}
                </Text>
                {user.accounts && user.accounts.length > 1 && (
                    <MaterialCommunityIcons name="chevron-down" size={30} color="black" />
                )}
            </Pressable>
            {user.accounts && user.accounts.length > 1 && (
                <SlidingModal isOpen={isOpen} onClose={setClose}>
                    <View>
                        <Text style={styles.title}>Select Account</Text>
                        {user.accounts && user.accounts.map(account => (
                            <TouchableWithoutFeedback key={account.id} onPress={() => {
                                setActiveAccount(account);
                                setClose();
                                router.navigate('/');
                            }}>
                                <View style={{padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee'}}>
                                    <Text>{account.name}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </SlidingModal>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})