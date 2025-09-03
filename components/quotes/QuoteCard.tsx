import {View, StyleSheet, Text, Pressable, Animated} from "react-native";
import {Image} from "expo-image";
import Card from "@/components/ui/Card";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {Colors} from "@/utils/Colors";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Quote} from "@/types/trips";
import Separator from "@/components/ui/Separator";
import Modal from "@/components/ui/modal/Modal";
import React, {useState} from "react";
import ImageCarousel from "@/components/images/ImageCarousel";
import ShareButton from "@/components/ui/buttons/ShareButton";
import {router} from "expo-router";

interface QuoteCardProps {
    quote: Quote,
    flag?: {
        label: string;
        color: string;
    };
}

export default function QuoteCard({quote, flag}: QuoteCardProps) {
    const [imageCarouselVisible, setImageCarouselVisible] = useState(false);
    const [floorPlanModalVisible, setFloorPlanModalVisible] = useState(false);
    const [floatingInfoVisible, setFloatingInfoVisible] = useState(false);
    const [homebaseInfoVisible, setHomebaseInfoVisibile] = useState(false);
    const [yomInfoIsVisible, setYomInfoIsVisible] = useState(false);
    return (
        <Pressable key={quote.id}>
            <Card style={{padding: 0}}>
                <View style={styles.topRadius}>
                    {flag && flag?.label !== "" && (
                        <View style={[styles.flag, {backgroundColor: flag.color}]}>
                            <Text style={{color: Colors.white, fontWeight: "bold"}}>{flag.label}</Text>
                        </View>
                    )}
                    <Pressable
                        onPress={() => setImageCarouselVisible(true)}
                    >
                        <Image
                            style={[styles.image, styles.topRadius]}
                            source={quote.images[0]}
                            contentFit="cover"
                        />
                    </Pressable>
                    {quote.aircraft.cabinViewUrl && (
                        <Pressable
                            onPress={() => {router.push(`/trip/1/cabin-view`)}}
                            style={[styles.imageIcons, {left: 0, borderTopRightRadius: 5}]}
                        >
                            <MaterialCommunityIcons name="video-3d" size={24} color={Colors.white} />
                        </Pressable>
                    )}
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
                            {quote.aircraft.cabinHeight && quote.aircraft.cabinHeight !== "" && (
                                <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                    <MaterialCommunityIcons name="human-male-height-variant" size={16} color="black" />
                                    <Text style={{fontSize: 14}}>{quote.aircraft.cabinHeight}</Text>
                                </View>
                            )}
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
                        alignItems: 'center',
                    }}>
                        <View style={styles.flightInfo}>
                            {quote.aircraft && (
                                quote.aircraft.is_floating ? (
                                    <Pressable onPress={() => setFloatingInfoVisible(true)}>
                                        <View style={styles.rating}>
                                            <Text>Floating</Text><MaterialIcons name={"info-outline"} size={18} color="black" />
                                        </View>
                                    </Pressable>
                                ) : quote.aircraft.homebase && quote.aircraft.homebase !== "" && (
                                    <Pressable onPress={() => setHomebaseInfoVisibile(true)}>
                                        <View style={styles.rating}>
                                            <Text>{quote.aircraft.homebase}</Text><MaterialIcons name={"info-outline"} size={18} color="black" />
                                        </View>
                                    </Pressable>
                                )
                            )}
                        </View>
                        <View style={[styles.flightInfo, {justifyContent: 'flex-end'}]}>
                            <Text>{quote.aircraft.yor !== "" ? "YOR" : "YOM"}:</Text>
                            <Pressable
                                onPress={() => setYomInfoIsVisible(true)}
                            >
                                <View style={styles.rating}>
                                    <Text>{quote.aircraft.yor !== "" ? quote.aircraft.yor : quote.aircraft.yom}</Text><MaterialIcons name={"info-outline"} size={18} color="black" />
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
                    </View>
                    {quote.aircraft.aircraftDiagram && quote.aircraft.aircraftDiagram !== "" && (
                        <>
                            <Animated.View>
                                <Pressable onPress={() => {
                                    setFloorPlanModalVisible(true)
                                }}>
                                    <Image
                                        style={[styles.image, {height: 100}]}
                                        source={quote.aircraft.aircraftDiagram}
                                        contentFit="cover"
                                        contentPosition={"center"}
                                    />
                                </Pressable>
                            </Animated.View>
                            <Separator/>
                        </>
                    )}
                    <View>
                        <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
                            <Text style={styles.priceText}>$ {quote.price.toLocaleString()}</Text>
                            <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                                <ShareButton shareUrl={process.env.EXPO_PUBLIC_API_URL + `/agent/pdfs/quote/${quote.id}`}/>
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
                   <ImageCarousel data={quote.images.map(image => { return {"image": image}})}/>
                </Modal>

                <Modal
                    modalVisible={floorPlanModalVisible}
                    onClose={() => setFloorPlanModalVisible(false)}
                    animationType="fade"
                >
                    <ImageCarousel data={[
                        {image: quote.aircraft.aircraftDiagram},
                    ]}/>
                </Modal>

                {/*Floating Aircraft Info*/}
                <Modal
                    modalVisible={floatingInfoVisible}
                    onClose={() => {setFloatingInfoVisible(false)}}
                    animationType="fade"
                >
                    <View style={{backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%", alignSelf: "center"}}>
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

                {/*Floating Aircraft Info*/}
                <Modal
                    modalVisible={homebaseInfoVisible}
                    onClose={() => {setHomebaseInfoVisibile(false)}}
                    animationType="fade"
                >
                    <View style={{backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%", alignSelf: "center", gap: 10}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Aircraft Home base and Positioning</Text>
                        <Text>Home base: {quote.aircraft.homebase}</Text>
                        <Text>Positioning describes the location of the aircraft prior to your flight.</Text>
                        <Text>If the aircraft needs to travel from another airport to reach your departure point, those repositioning costs are included in the overall quote.</Text>
                        <Text>When the aircraft is already nearby, pricing may be more cost-efficient.</Text>
                        <Pressable onPress={() => setHomebaseInfoVisibile(false)} style={{marginTop: 20}}>
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
                    <View style={{backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%", alignSelf: "center"}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Aircraft Information</Text>
                        <Pressable onPress={() => setYomInfoIsVisible(false)} style={{marginTop: 20, gap: 10}}>
                            <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10}}>
                                <Text>
                                    Year of make: {quote.aircraft.yom}
                                </Text>
                                {quote.aircraft.yor && quote.aircraft.yor !== "" && (
                                    <Text>
                                        Year of refurbishment: {quote.aircraft.yor}
                                    </Text>
                                )}
                            </View>
                            <Text>The Year of Make (YOM) is when the aircraft was originally manufactured, while the Year of Refurbishment (YOR) notes the most recent major interior or exterior updates.</Text>
                            <Text>Newer aircraft may highlight the latest design and technology, while older models with recent refurbishments often deliver a modern, high-quality experience at a competitive rate.</Text>
                            <Text>Both can influence pricing.</Text>
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
    image: {
        flex: 1,
        backgroundColor: 'white',
        height: 150,
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
        gap: 2
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
        backgroundColor: Colors.blackTransparent
    }
});