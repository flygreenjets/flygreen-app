import {View, StyleSheet, Text, Pressable} from "react-native";
import {Image} from "expo-image";
import Card from "@/components/ui/Card";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {Colors} from "@/utils/Colors";
import * as Linking from "expo-linking";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Quote} from "@/types/trips";
import Separator from "@/components/ui/Separator";
import Modal from "@/components/ui/Modal";
import React, {useState} from "react";
import ImageCarousel from "@/components/images/ImageCarousel";
import * as Sharing from "expo-sharing";

interface QuoteCardProps {
    quote: Quote,
    flag?: {
        label: string;
        color: string;
    };
}

export default function QuoteCard({quote, flag}: QuoteCardProps) {
    const [imageCarouselVisible, setImageCarouselVisible] = useState(false);
    const [floatingInfoVisible, setFloatingInfoVisible] = useState(false);
    const [yomInfoIsVisible, setYomInfoIsVisible] = useState(false);
    return (
        <Pressable key={quote.id}>
            <Card style={{padding: 0}}>
                <View style={styles.topRadius}>
                    {flag && (
                        <View style={[styles.flag, {backgroundColor: flag.color}]}>
                            <Text style={{color: Colors.white, fontWeight: "bold"}}>{flag.label}</Text>
                        </View>
                    )}
                    <Image
                        style={[styles.image, styles.topRadius]}
                        source={quote.imageUrl}
                        contentFit="cover"
                        transition={1000}
                    />
                    <Pressable
                        onPress={() => {Linking.openURL('https://my.matterport.com/show/?m=S1B5pM6kxJk')}}
                        style={[styles.imageIcons, {left: 0, borderTopRightRadius: 5}]}
                    >
                        <MaterialCommunityIcons name="video-3d" size={24} color={Colors.white} />
                    </Pressable>
                    <Pressable
                        onPress={() => {setImageCarouselVisible(true)}}
                           style={[styles.imageIcons, {right: 0, borderTopLeftRadius: 3}]}
                    >
                        <MaterialIcons name="image" size={24} color={Colors.white} />
                    </Pressable>
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
                    <Separator/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <View style={styles.flightInfo}>
                            {quote.aircraft ? (
                                <Pressable onPress={() => setFloatingInfoVisible(true)}>
                                    <View style={styles.rating}>
                                        <Text>Floating</Text><MaterialIcons name={"info-outline"} size={18} color="black" />
                                    </View>
                                </Pressable>
                            ) : (
                                <>
                                    <Text>Homebase:</Text>
                                    <View style={styles.rating}>
                                        <Text>Floating</Text><MaterialIcons name={"info-outline"} size={18} color="black" />
                                    </View>
                                </>
                            )}
                        </View>
                        <View style={[styles.flightInfo, {justifyContent: 'flex-end'}]}>
                            <Text>YOM:</Text>
                            <Pressable
                                onPress={() => setYomInfoIsVisible(true)}
                            >
                                <View style={styles.rating}>
                                    <Text>2009 (2020)</Text><MaterialIcons name={"info-outline"} size={18} color="black" />
                                </View>
                            </Pressable>
                        </View>
                    </View>
                    <View>
                        <Separator/>
                        {quote.notes && (
                            <>
                                <Text>{quote.notes}</Text>
                                <Separator/>
                            </>
                        )}
                        <Image
                            style={[styles.image, styles.topRadius]}
                            source={"https://cdn.flygreen.co/aircraft-diagrams/citation-x.png"}
                            contentFit="cover"
                            transition={1000}
                        />
                    </View>
                    <Separator/>
                    <View>
                        <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
                            <Text style={styles.priceText}>$ {quote.price.toLocaleString()}</Text>
                            <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                                <Pressable
                                    onPress={() => {
                                        Sharing.shareAsync(quote.imageUrl, {
                                            dialogTitle: `Share Quote for ${quote.aircraft.model}`,
                                            mimeType: 'image/jpeg',
                                        }).catch((error) => {
                                            console.error("Error sharing quote:", error);
                                        });
                                    }}
                                >
                                    <Text style={styles.shareButton}>Share</Text>
                                </Pressable>
                                <Pressable>
                                    <Text style={styles.bookButton}>Book</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
                <Modal
                    modalVisible={imageCarouselVisible}
                    onClose={() => setImageCarouselVisible(false)}
                    animationType="fade"
                >
                   <ImageCarousel data={[
                        {image: quote.imageUrl},
                        {image: "https://cdn.flygreen.co/aircraft-diagrams/citation-x.png"},
                        {image: "https://cdn.flygreen.co/aircraft-category-pictures/turboprop-exterior.jpg"}
                   ]}/>
                </Modal>

                {/*Floating Aircraft Info*/}
                <Modal
                    modalVisible={floatingInfoVisible}
                    onClose={() => {setFloatingInfoVisible(false)}}
                    animationType="fade"
                >
                    <View style={{backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%"}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Floating Aircraft</Text>
                        <Text style={{marginTop: 10}}>
                            Floating aircraft are those that are not based at a specific airport but are available for charter from various locations. This allows for greater flexibility in scheduling and can often lead to cost savings for the client.
                            It can also lead to less
                        </Text>
                        <Pressable onPress={() => setFloatingInfoVisible(false)} style={{marginTop: 20}}>
                            <Text style={{color: Colors.flygreenGreen, fontWeight: 'bold', textAlign: "right"}}>Close</Text>
                        </Pressable>
                    </View>
                </Modal>

                {/*YOM YOR*/}
                <Modal
                    modalVisible={yomInfoIsVisible}
                    onClose={() => {setYomInfoIsVisible(false)}}
                    animationType="fade"
                >
                    <View style={{backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%"}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Aircraft Information</Text>
                        <Pressable onPress={() => setYomInfoIsVisible(false)} style={{marginTop: 20}}>
                            <Text style={{marginTop: 10}}>
                                Year of make: {quote.aircraft.yom}
                            </Text>
                            <Text>
                                Year of refurbishment: {quote.aircraft.yor}
                            </Text>
                            <Text style={{color: Colors.flygreenGreen, fontWeight: 'bold', textAlign: "right"}}>Close</Text>
                        </Pressable>
                    </View>
                </Modal>
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
        borderWidth: 1,
        borderColor: Colors.flygreenGreen,
        color: '#fff',
        fontWeight: "bold",
        fontSize: 16,
    },
    shareButton: {
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.flygreenGreen,
        color: Colors.flygreenGreen,
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
        alignItems: "center",
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
    },
    imageIcons: {
        zIndex: 3,
        position: 'absolute',
        bottom: 0,
        padding: 5,
        backgroundColor: Colors.black
    }
});