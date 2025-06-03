import {View} from "react-native";
import {Colors} from "@/utils/Colors";

export default function ProgressBar({ progress }: { progress: number }) {
    return (
        <View style={{
            width: '100%',
            backgroundColor: '#e0e0df',
            borderRadius: 50,
            overflow: 'hidden',
            position: 'relative',
        }}>
            <View style={{
                height: 10,
                width: `${progress}%`,
                backgroundColor: Colors.lightGreen,
                borderRadius: 50,

            }} ></View>
        </View>
    );
}