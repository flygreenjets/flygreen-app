import {ReactNode, useState} from 'react';
import {Alert, Modal as ReactModal, StyleSheet, Text, Pressable, View} from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

interface ModalProps {
    animationType?: 'none' | 'slide' | 'fade';
    transparent?: boolean;
    visible?: boolean;
    modalVisible: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({modalVisible, onClose, children, animationType = "slide", transparent = true}: ModalProps) {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ReactModal
                    animationType={animationType}
                    transparent={transparent}
                    visible={modalVisible}
                    onRequestClose={() => {
                        onClose();
                    }}>
                    <View style={styles.centeredView}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => onClose()}
                        >
                            <MaterialCommunityIcons
                                name="close-circle-outline"
                                size={28}
                                color="white"
                            />
                        </Pressable>
                        {children}
                    </View>
                </ReactModal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    button: {
        zIndex: 9999,
        elevation: 2,
        borderRadius: 20,
        padding: 10,
    },
    buttonClose: {
        position: 'absolute',
        top: 50,
        right: 0
    },
});