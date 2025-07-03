import {StyleSheet, View} from "react-native";

interface DotPaginationProps {
    items: any[];
    paginationIndex: number;
    activeDotColor: string;
    inactiveDotColor: string;
}
export default function DotPagination({items, paginationIndex, activeDotColor, inactiveDotColor}: DotPaginationProps) {
    return (
        <View style={styles.container}>
            {items.map((_, index) =>
                <View
                    key={index}
                    style={paginationIndex === index ? [styles.activeDot, {backgroundColor: activeDotColor}] : [styles.dot, {backgroundColor: inactiveDotColor}]}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 50,
    },
    activeDot: {
        width: 10,
        height: 10,
        borderRadius: 50,
    }
});