import {View, Text, FlatList, Pressable, StyleSheet} from "react-native";
import {Colors} from "@/utils/Colors";

const docs: Array<{key: string, name: string, type: string, link: string}> = [
    {
        key: "1",
        name: "Invoice",
        type: "invoice",
        link: "https://example.com/doc1.pdf"
    },
    {
        key: "2",
        name: "Contract Agreement",
        type: "Document",
        link: "https://example.com/doc2.pdf"
    },
    {
        key: "3",
        name: "Misc",
        type: "Document",
        link: "https://example.com/doc3.pdf"
    }
];

export default function TripDocumentSection() {


    return (
        <View style={{padding: 16}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>Trip Documents</Text>
            <FlatList
                style={{marginTop: 5}}
                data={[
                    ...docs
                ]}
                renderItem={({item}) => (
                    <Pressable onPress={() => console.log('Open document')}>
                        <View style={styles.recentDocItem}>
                            <Text>{item.name}</Text>
                        </View>
                    </Pressable>
                )}
                keyExtractor={(item) => item.key}
                ListEmptyComponent={<Text style={{color: '#666'}}>No documents available for this trip.</Text>}
                contentContainerStyle={{justifyContent: 'space-between', alignItems: 'center'}}
                horizontal={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    recentDocItem: {
        alignItems: "center",
        marginRight: 15,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        borderRadius: 5,
        borderWidth: 0.5,
        padding: 10,
    }
});