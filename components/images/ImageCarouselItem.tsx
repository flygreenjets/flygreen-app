import {Dimensions, StyleSheet, View} from "react-native";
import {Image} from "expo-image";

const {width, height} = Dimensions.get('screen');

export default function ImageCarouselItem({item, index}: {item: any, index: number}) {
    return (
        <View style={styles.itemContainer}>
            <Image
                source={item.image}
                style={{height: 300, width: width-15, borderRadius: 5}}
                contentFit={"contain"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        width: width,
        paddingHorizontal: 10,
    }
});