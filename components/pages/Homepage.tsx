import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
    ImageBackground,
    ScrollView
} from "react-native";
import TripCard from "@/components/trips/TripCard";
import {router} from "expo-router";
import {Colors} from "@/utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Homepage() {
    const nextTrip = {
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
    };

    const workingTrip =  {
        id: 1,
        name: "Trip to Miami",
        description: "Description 1",
        departureDate: "Fri, Apr 4, 2025",
        stage: "Requested",
        departureAirport: {
            code: "KTEB",
            name: "Newark Liberty Intl. Airport, NJ",
        },
        destinationAirport: {
            code: "KTMB",
            name: "Miami Executive Airport, FL",
        },
        aircraft: {
            category: 'Light Jet',
            model: 'Phenom 300',
            registration: 'N12345',
        },
        pax: 5,
        duration: "2h 30m",
        fuelStops: 2,
    }


    const recentDocs = [
        {id: '1', name: 'Quote 1'},
        {id: '2', name: 'Quote 2'},
    ]

    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 30}}>
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
                    <Text style={styles.title}>Ero Copper Corp.</Text>
                    <Pressable onPress={() => router.push('/notifications')}>
                        <View>
                            <Ionicons name="notifications-outline" size={30} color="black" />
                            <Text style={styles.notificationBadge}>1</Text>
                        </View>
                    </Pressable>
                </View>
                <ImageBackground
                    source={{uri: 'https://flygreen.s3.us-east-2.amazonaws.com/pdf-assets/rewards/gold.jpg'}}
                    style={styles.rewardsContainer}
                    imageStyle={{
                        borderRadius: 10,
                        height: 205
                    }}
                    resizeMode={'stretch'}
                >
                    <Text style={{color: 'white', fontWeight: "bold", fontSize: 18}}>{(122354).toLocaleString()} Points</Text>
                </ImageBackground>
                <View style={{marginTop: 15, gap: 10}}>
                    <Text style={[styles.title, {fontSize: 16}]}>Your next trip</Text>
                    <Pressable key={nextTrip.id} onPress={() => router.push(`/trip/${nextTrip.id}`)}>
                        <TripCard trip={nextTrip} />
                    </Pressable>
                </View>
                <View style={{gap: 10}}>
                    <Text style={[styles.title, {fontSize: 16}]}>We're working on this trip</Text>
                    <Pressable key={workingTrip.id} onPress={() => router.push(`/trip/${workingTrip.id}`)}>
                        <TripCard trip={workingTrip} />
                    </Pressable>
                </View>
            </View>
            <View>
                <Text style={[styles.title, {fontSize: 16}]}>Recently viewed</Text>
                <FlatList
                    style={{marginTop: 5}}
                    data={[
                        ...recentDocs
                    ]}
                    renderItem={({item}) => (
                        <Pressable onPress={() => console.log('Open document')}>
                            <View style={styles.recentDocItem}>
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
            <View style={{marginTop: 15}}>
                <Text style={[styles.title, {fontSize: 16}]}>Recently shared with you</Text>
                <FlatList
                    style={{marginTop: 5}}
                    data={[
                        ...recentDocs
                    ]}
                    renderItem={({item}) => (
                        <Pressable onPress={() => console.log('Open document')}>
                            <View style={styles.recentDocItem}>
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
        </ScrollView>
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
        padding: 22,
        paddingBottom: 20,
        borderRadius: 10,
        height: 105,
        alignItems: 'flex-end',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    },
    recentDocItem: {
        alignItems: "center",
        marginRight: 15,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: Colors.lightGray,
        padding: 10,
    },
    notificationBadge: {
        backgroundColor: Colors.red,
        position: 'absolute',
        top: -2,
        right: -2,
        elevation: 1,
        borderRadius: 50,
        paddingHorizontal: 5,
        paddingVertical: 1,
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});