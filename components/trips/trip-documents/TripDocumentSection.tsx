import {View, Text, Pressable, StyleSheet, Linking} from "react-native";
import {Colors} from "@/utils/Colors";
import ListItem from "@/components/ui/parts/ListItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import {TripDocument} from "@/types/trips";

interface TripDocumentSectionProps {
    docs: TripDocument[];
}

export default function TripDocumentSection({docs}: TripDocumentSectionProps) {
    return (
        <View style={{padding: 16}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>Documents</Text>
            {docs.map((doc) => (
                <Pressable style={docs.length > 1 &&{
                    borderBottomColor: Colors.lightGray,
                    borderBottomWidth: 0.5,
                }} onPress={() => {
                    if (doc.url) {
                        Linking.openURL(doc.url);
                    }
                }}>
                    <ListItem key={doc.id} icon={
                        <Ionicons name="document-text-outline" size={32} color={Colors.flygreenGreen} />
                    }>
                        <View>
                            <View style={styles.docTitleContainer}>
                                <Text style={styles.titleText}>{doc.name}</Text>
                            </View>
                            {doc.description !== null && <Text style={{color: '#666'}}>{doc.description}</Text>}
                        </View>
                    </ListItem>
                </Pressable>
            ))}
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
    },
    icon: {
        padding: 10,
        backgroundColor: Colors.flygreenGreen,
        borderRadius: 50,
    },
    docTitleContainer: {
        flexDirection: "row",
        gap: 5
    },
    titleText: {
        fontSize: 16,
    },
    date: {
        color: "#888",
        fontSize: 12,
        padding: 2,
    }
});