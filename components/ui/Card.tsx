import {View, StyleSheet, Text, ImageBackground} from "react-native";
import {Colors} from "@/utils/Colors";

interface CardProps {
    children?: React.ReactNode;
    style?: object;
}

export default function Card({children, style = {}}: CardProps) {
    return (
        <View style={{...styles.card, ...style}}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});