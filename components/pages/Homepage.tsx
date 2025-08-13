import {View, Text, StyleSheet, Button, Pressable, FlatList, Dimensions, ImageBackground} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {useAuth} from "@/providers/AuthProvider";
import TripCard from "@/components/trips/TripCard";
import {router} from "expo-router";

const {width} = Dimensions.get("window");

export default function Homepage() {
    const trips = [
        {
            id: 2,
            name: "Trip to New York",
            description: "Description 1",
            departureDate: "Tue, June 10, 2025",
            departureAirport: {
                code: "CYUL",
                name: "Montreal Airport, QC",
            },
            destinationAirport: {
                code: "KTEB",
                name: "Newark Liberty Intl. Airport, NJ",
            },
            aircraft: {
                category: 'Super Midsize Jet',
                model: 'Citation X',
                registration: 'C-GREEN',
            },
            stage: "Closed Won",
            pax: 2,
            duration: "1h 39m",
            fuelStops: 0,
        },
    ];

    const recentDocs = [
        {id: '1', name: 'Quote 1'},
        {id: '2', name: 'Quote 2'},
    ]

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
                <Text style={styles.title}>Welcome back Alex!</Text>
                <MaterialIcons name="notifications" size={24} color="black" />
            </View>
            <ImageBackground
                source={{uri: 'https://flygreen.s3.us-east-2.amazonaws.com/pdf-assets/rewards/gold.jpg'}}
                style={styles.rewardsContainer}
                imageStyle={{borderRadius: 10}}
                resizeMode={'cover'}
            >
                <Text style={{color: 'white', fontWeight: "bold", fontSize: 18}}>{(122354).toLocaleString()} Points</Text>
                {/*<View>*/}
                {/*    <Text style={{color: 'white'}}>1325 redeemable points</Text>*/}
                {/*    <Text style={{color: 'white'}}>Status: Gold</Text>*/}
                {/*</View>*/}
            </ImageBackground>
            <View style={{marginTop: 15, gap: 10}}>
                <Text style={[styles.title, {fontSize: 16}]}>Your Next Trip</Text>
                {trips.map((trip) => (
                    <Pressable key={trip.id} onPress={() => router.push(`/trip/${trip.id}`)}>
                        <TripCard trip={trip} />
                    </Pressable>
                ))}
            </View>
            <View>
                <Text style={[styles.title, {fontSize: 16}]}>Recent Documents</Text>
                <FlatList
                    style={{marginTop: 5}}
                    data={[
                        ...recentDocs
                    ]}
                    renderItem={({item}) => (
                        <Pressable onPress={() => console.log('Open document')}>
                            <View style={[styles.recentDocItem, {backgroundColor: 'lightgray', borderRadius: 5}]}>
                                <Text>{item.name}</Text>
                                <Text>CYUL to KTEB</Text>
                                <Text>${(35949).toLocaleString()}</Text>
                            </View>
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text>No recent documents found.</Text>}
                    contentContainerStyle={{justifyContent: 'space-between', alignItems: 'center'}}
                    horizontal={true}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    rewardsContainer: {
        flexDirection: 'row',
        backgroundColor: 'indigo',
        padding: 15,
        paddingBottom: 20,
        borderRadius: 10,
        height: 210,
        alignItems: 'flex-end',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    recentDocItem: {
        alignItems: "center",
        marginRight: 15,
        paddingHorizontal: 10
    }
});