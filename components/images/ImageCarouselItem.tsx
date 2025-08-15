import {Dimensions, StyleSheet, View} from "react-native";
import {Image} from "expo-image";
import ZoomableImage from "@/components/images/ZoomableImage";

const {width} = Dimensions.get('screen');

export default function ImageCarouselItem({item, index}: {item: any, index: number}) {
    return (
        <View style={styles.itemContainer}>
            <ZoomableImage
                src={item.image}
                style={{width: width - 20, height: 300, borderRadius: 10}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        overflow: 'visible',
        justifyContent: "flex-end",
        alignItems: "center",
        width: width,
        paddingHorizontal: 10,
    }
});