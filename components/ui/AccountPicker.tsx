import {Text, View, StyleSheet, TouchableWithoutFeedback, Pressable} from 'react-native';
import SlidingModal from "@/components/ui/modal/SlidingModal";
import useToggle from "@/hooks/toggle";

interface AccountPickerProps {
    accounts: any[];
}

export default function AccountPicker({accounts}: AccountPickerProps) {
    const {
        value: isOpen,
        setTrue: setOpen,
        setFalse: setClose
    } = useToggle(false);

    return (
        <>
            <Pressable onPress={setOpen}>
                <Text style={styles.title}>Ero Copper Corp.</Text>
            </Pressable>
            <SlidingModal isOpen={isOpen} onClose={setClose}>
                <View>
                    <Text style={styles.title}>Select Account</Text>
                    {accounts.map(account => (
                        <TouchableWithoutFeedback key={account.id} onPress={() => {
                            // Handle account selection
                            setClose();
                        }}>
                            <View style={{padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee'}}>
                                <Text>{account.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </SlidingModal>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})