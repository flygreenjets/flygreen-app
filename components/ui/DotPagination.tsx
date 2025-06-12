import {StyleSheet, View} from "react-native";

interface DotPaginationProps {
    items: any[];
    paginationIndex: number;
}
export default function DotPagination({items, paginationIndex}: DotPaginationProps) {
    return (
        <View style={styles.container}>
            {items.map((_, index) =>
                <View key={index} style={paginationIndex === index ? styles.activeDot : styles.dot}/>
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
        backgroundColor: "gray",
        width: 8,
        height: 8,
        borderRadius: 50,
    },
    activeDot: {
        backgroundColor: "white",
        width: 10,
        height: 10,
        borderRadius: 50,
    }
});