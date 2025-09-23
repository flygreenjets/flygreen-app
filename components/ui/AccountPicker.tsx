import {Text, View, StyleSheet, TouchableWithoutFeedback, Pressable} from 'react-native';
import SlidingModal from "@/components/ui/modal/SlidingModal";
import useToggle from "@/hooks/toggle";
import {useAuth} from "@/providers/AuthProvider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {router} from "expo-router";
import SpinnerLoading from "@/components/animations/SpinnerLoading";
import {useEffect, useState} from "react";

export default function AccountPicker() {
    const {activeAccount, user, setActiveAccount, refreshUser} = useAuth();
    const [isLoading, setLoading] = useState(false);

    const {
        value: isOpen,
        setTrue: setOpen,
        setFalse: setClose
    } = useToggle(false);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            refreshUser().then(() => {
                setLoading(false);
            })
        }
    }, [isOpen]);

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
            <SlidingModal isOpen={isOpen} onClose={setClose}>
                {isLoading && (
                    <SpinnerLoading/>
                )}
                {!isLoading && user.accounts && user.accounts.length > 1 && (
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
                )}
            </SlidingModal>
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