import {Pressable, TouchableWithoutFeedback, View, StyleSheet, Text, Modal as RNModal} from "react-native";
import Modal from "@/components/ui/Modal";
import useToggle from "@/hooks/toggle";

interface ConfirmButtonProps {
    buttonStyle?: any,
    confirmTitle?: string,
    buttonText?: string,
    confirmText?: string,
    cancelText?: string,
    confirmAction?: () => void
    danger?: boolean,
}

export default function ConfirmButton({
    confirmTitle = "Confirm",
    confirmAction = () => {},
    buttonText = "Confirm",
    buttonStyle = {},
    confirmText = "Are you sure you want to proceed?",
    cancelText = "Cancel",
}) {
    const {
        value: isOpen,
        setTrue: open,
        setFalse: close
    } = useToggle(false);
    return (
        <>
            <Pressable onPress={() => {open()}}>
                <Text style={buttonStyle}>{buttonText}</Text>
            </Pressable>
            <Modal
                modalVisible={isOpen}
                onClose={close}
                animationType="fade"
                transparent={true}
                overlayStyle={'rgba(0, 0, 0, 0.5)'}
                showCloseButton={false}
            >
                <View style={styles.body}>
                    <Text style={styles.title}>{confirmTitle}</Text>
                    <Text style={styles.confirmText}>{confirmText}</Text>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={() => {
                                close();
                                confirmAction();
                            }}
                            style={[styles.button, {backgroundColor: "blue"}]}
                        >
                            <Text style={{color: "white", textAlign: "center"}}>{buttonText}</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => close()}
                            style={[styles.button, {backgroundColor: "gray"}]}
                        >
                            <Text style={{color: "white", textAlign: "center"}}>{cancelText}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        alignSelf: "center",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 20,
        width: "80%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center"
    },
    buttonContainer: {
        gap: 10
    },
    button: {
        padding: 12,
        borderRadius: 5,
    },
    confirmText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20
    }
});