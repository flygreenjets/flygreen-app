import {View, Text, FlatList} from "react-native";
import TripSheetCard from "@/components/tripSheets/TripSheetCard";

export default function TripSheetSection() {
    return (
        <View>
            <View style={{padding: 15}}>
                <Text style={{fontSize: 20}}>Trip Sheets</Text>
            </View>
            <FlatList
                data={['allo', 'bonjour', 'hola', 'hello', 'ciao', 'bonjour', 'hola', 'hello', 'ciao', 'bonjour', 'hola', 'hello', 'ciao', 'bonjour', 'hola', 'hello', 'ciao']}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <TripSheetCard/>
                )}
            />
        </View>
    );
}