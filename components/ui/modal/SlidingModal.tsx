import {StyleSheet, TouchableWithoutFeedback, View, Modal as RNModal, Dimensions} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

interface SlidingModalProps {
    isOpen: boolean,
    onClose: () => void,
    children?: React.ReactNode
}

const {height} = Dimensions.get('window');

export default function SlidingModal({isOpen, onClose, children}: SlidingModalProps) {
    const {bottom} = useSafeAreaInsets()

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
            <View style={[styles.modalContent]}>
                <View style={[styles.container, {marginBottom: bottom}]}>
                    {children}
                </View>
            </View>
        </RNModal>
    );
};

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
    container: {
        width: '100%',
        backgroundColor: 'white',
        height: height/2,
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
});