import { Dimensions, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');
const height = 400;

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function ZoomableImage({ src, style }: { src: string; style?: object }) {
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);

    const startFocalX = useSharedValue(0);
    const startFocalY = useSharedValue(0);

    const pinch = Gesture.Pinch()
        .onStart((e) => {
            savedScale.value = scale.value;
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;

            startFocalX.value = e.focalX;
            startFocalY.value = e.focalY;
        })
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
            const dxStart = startFocalX.value - width / 2;
            const dyStart = startFocalY.value - height / 2;

            const dxLive = e.focalX - startFocalX.value;
            const dyLive = e.focalY - startFocalY.value;

            translateX.value = savedTranslateX.value + dxLive - dxStart * (e.scale - 1);
            translateY.value = savedTranslateY.value + dyLive - dyStart * (e.scale - 1);
        })
        .onEnd(() => {
            scale.value = withTiming(1);
            translateX.value = withTiming(0);
            translateY.value = withTiming(0);
            savedScale.value = withTiming(1);
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value },
            ],
        };
    });


    return (
        <GestureDetector gesture={pinch}>
            <AnimatedImage
                source={{ uri: src }}
                style={[styles.image, style, animatedStyle]}
                contentFit="contain"
            />
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    image: {
        height: height,
        width: width - 20,
        borderRadius: 10,
    },
});
