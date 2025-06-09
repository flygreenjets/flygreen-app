import {View, StyleSheet, Text, Pressable, Button} from "react-native";
import {Image} from "expo-image";
import Card from "@/components/ui/Card";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {Colors} from "@/utils/Colors";
import {useState} from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Quote} from "@/types/trips";

interface QuoteCardProps {
    quote: Quote,
    flag?: {
        label: string;
        color: string;
    };
}

export default function QuoteCard({quote, flag}: QuoteCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Pressable key={quote.id}  onPress={() => setIsOpen(!isOpen)}>
            <Card style={{padding: 0}}>
                <View style={styles.topRadius}>
                    {flag && (
                        <View style={{...styles.flag, backgroundColor: flag.color}}>
                            <Text style={{color: Colors.white, fontWeight: "bold"}}>{flag.label}</Text>
                        </View>
                    )}
                    <Image
                        style={{...styles.image, ...styles.topRadius}}
                        source={quote.imageUrl}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <View style={{borderRadius: 10, padding: 20}}>
                    <View>
                        <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", marginBottom: 5}}>
                            <Text style={{fontSize: 16}}>{quote.aircraft.model}</Text>
                            <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                <MaterialCommunityIcons name="human-male-height-variant" size={16} color="black" />
                                <Text style={{fontSize: 14}}>{quote.aircraft.cabinHeight}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                            <Text style={{color: 'gray', fontSize: 12}}>{quote.aircraft.category}</Text>
                            <Text style={{color: 'gray', fontSize: 14}}>{quote.aircraft.seats} seats</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <View style={{...styles.flightInfo}}>
                            <Text>Takeoff reliability:</Text>
                            <View style={styles.rating}>
                                <Text>{quote.aircraft.ratings.takeoffReliability}</Text>
                                <MaterialIcons name="star" size={16} color={Colors.gold} />
                            </View>
                        </View>
                        <View style={{...styles.flightInfo, justifyContent: 'flex-end'}}>
                            <Text>Cabin:</Text>
                            <View style={styles.rating}>
                                <Text>{quote.aircraft.ratings.cabin}</Text>
                                <MaterialIcons name="star" size={16} color={Colors.gold} />
                            </View>
                        </View>
                    </View>
                    <View style={{height: isOpen ? 'auto' : 0, overflow: 'hidden'}}>
                        <View style={styles.separator}/>
                        {quote.notes && (
                            <>
                                <Text>{quote.notes}</Text>
                                <View style={styles.separator}/>
                            </>
                        )}
                        <Image
                            style={{...styles.image, ...styles.topRadius}}
                            source={"https://cdn.flygreen.co/aircraft-diagrams/citation-x.png"}
                            contentFit="cover"
                            transition={1000}
                        />
                    </View>
                    <View style={styles.separator}/>
                    <View>
                        <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
                            <Text style={styles.priceText}>$ {quote.price.toLocaleString()}</Text>
                            <Pressable>
                                <Text style={styles.bookButton}>Book</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Card>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    bookButton: {
        backgroundColor: Colors.flygreenGreen,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        color: '#fff',
        fontWeight: "bold",
        fontSize: 16,
    },
    image: {
        flex: 1,
        backgroundColor: '#0553',
        padding: 70,
        width: "100%",
        resizeMode: 'contain',
        zIndex: 1
    },
    topRadius: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    container: {
        flex: 1,
        paddingTop: 75,
        paddingHorizontal: 20,
    },
    rating: {
      flexDirection: 'row',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    airportInfo: {
        flex: 2
    },
    airportCode: {
        fontSize: 30,
        color: "#205046"
    },
    airportName: {
        fontSize: 12,
        color: 'gray'
    },
    flightInfo: {
        flexDirection: "row",
        gap: 5,
        flex: 1,
    },
    separator: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 10,
    },
    priceText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    flag: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 5,
        backgroundColor: Colors.flygreenGreen,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 8,
        zIndex: 2
    }
});