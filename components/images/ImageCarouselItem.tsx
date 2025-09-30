import {Dimensions, StyleSheet, View} from "react-native";
import ZoomableImage from "@/components/images/ZoomableImage";

const {width} = Dimensions.get('screen');

interface ImageCarouselItemProps {
    item: any,
    index: number
}

export default function ImageCarouselItem({item, index}: ImageCarouselItemProps) {
    return (
        <View style={styles.itemContainer}>
            <ZoomableImage
                src={item.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        overflow: 'visible',
        justifyContent: "center",
        alignItems: "flex-start",
        width: width,
        paddingHorizontal: 10,
    }
});