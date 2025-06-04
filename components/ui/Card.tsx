import {View, StyleSheet, Text, ImageBackground} from "react-native";
import {Colors} from "@/utils/Colors";

interface CardProps {
    children?: React.ReactNode;
    style?: object;
    flag?: {
        label: string;
        color: string;
    }
}

export default function Card({children, style = {}, flag}: CardProps) {
    return (
        <View style={{...styles.card, ...style}}>
            {flag && (
                <View style={{...styles.flag, backgroundColor: flag.color}}>
                    <Text style={{color: Colors.white, fontWeight: "bold"}}>{flag.label}</Text>
                </View>
            )}
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
    },
    flag: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 5,
        backgroundColor: Colors.flygreenGreen,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 8,
    }
});