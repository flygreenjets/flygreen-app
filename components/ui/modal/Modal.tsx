import {ReactNode, useState} from 'react';
import {Alert, Modal as RNModal, StyleSheet, Text, Pressable, View, TouchableWithoutFeedback} from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

interface ModalProps {
    animationType?: 'none' | 'slide' | 'fade';
    transparent?: boolean;
    visible?: boolean;
    modalVisible: boolean;
    onClose: () => void;
    children: ReactNode;
    overlayStyle?: string;
    showCloseButton?: boolean
}

export default function Modal({modalVisible, onClose, children, animationType = "slide", overlayStyle='rgba(0, 0, 0, 0.75)', showCloseButton = true}: ModalProps) {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <RNModal
                    animationType={animationType}
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        onClose();
                    }}>
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={[styles.modalOverlay, {backgroundColor: overlayStyle}]} />
                    </TouchableWithoutFeedback>

                    <View style={styles.modalContent}>
                        {showCloseButton && (
                            <Pressable
                                onPress={() => onClose()}
                                style={[styles.button, styles.buttonClose]}
                            >
                                <MaterialCommunityIcons
                                    name="close-circle-outline"
                                    size={28}
                                    color="white"
                                />
                            </Pressable>
                        )}
                        {children}
                    </View>
                </RNModal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
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
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
});