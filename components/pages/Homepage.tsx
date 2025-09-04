import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
    ImageBackground,
} from "react-native";
import TripCard from "@/components/trips/TripCard";
import {router} from "expo-router";
import {Colors} from "@/utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import AccountPicker from "@/components/ui/AccountPicker";
import { useAuth } from "@/providers/AuthProvider";
import {Trip} from "@/types/trips";
import EmptyTripList from "@/components/ui/trips/EmptyTripList";
import {RecentDocument} from "@/types/types";
import RecentDocumentCard from "@/components/ui/RecentDocumentCard";


const recentDocs = [
    {id: '1', name: 'Quote 1'},
    {id: '2', name: 'Quote 2'},
]

interface HomepageProps {
    recentDocs: RecentDocument[];
    nextTrip?: Trip | null;
    nextRequestedTrip?: Trip | null;
}

export default function Homepage({recentDocs, nextTrip = null, nextRequestedTrip = null}: HomepageProps) {
    const {activeAccount} = useAuth();

    return (
        <>
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
                    <AccountPicker/>
                    <Pressable onPress={() => router.push('/notifications')}>
                        <View>
                            <Ionicons name="notifications-outline" size={30} color="black" />
                            <Text style={styles.notificationBadge}>1</Text>
                        </View>
                    </Pressable>
                </View>
                <ImageBackground
                    source={{uri: activeAccount.loyalty?.imageUrl ?? ""}}
                    style={styles.rewardsContainer}
                    imageStyle={{
                        borderRadius: 10,
                        height: 205
                    }}
                    resizeMode={'stretch'}
                >
                    <Text style={{color: 'white', fontWeight: "bold", fontSize: 18}}>{(activeAccount.loyaltyPoints ?? 0).toLocaleString()} Points</Text>
                </ImageBackground>
                {!nextTrip && !nextRequestedTrip && (
                    <View style={{marginBottom: 30}}>
                        <EmptyTripList/>
                    </View>
                )}
                {nextTrip && (
                    <View style={{marginTop: 15, gap: 10}}>
                        <Text style={[styles.title, {fontSize: 16}]}>Your next trip</Text>
                        <Pressable key={nextTrip.id} onPress={() => router.push(`/trip/${nextTrip.id}`)}>
                            <TripCard trip={nextTrip} />
                        </Pressable>
                    </View>
                )}
                {nextRequestedTrip && (
                    <View style={{gap: 10}}>
                        <Text style={[styles.title, {fontSize: 16}]}>We're working on this trip</Text>
                        <Pressable key={nextRequestedTrip.id} onPress={() => router.push(`/trip/${nextRequestedTrip.id}`)}>
                            <TripCard trip={nextRequestedTrip} />
                        </Pressable>
                    </View>
                )}
            </View>
            {recentDocs && recentDocs.length > 0 && (
                <View style={{marginTop: 15}}>
                    <Text style={[styles.title, {fontSize: 16}]}>Recently shared with you</Text>
                    <FlatList
                        style={{marginTop: 5}}
                        data={[
                            ...recentDocs
                        ]}
                        renderItem={({item}: {item: RecentDocument }) => (
                           <RecentDocumentCard document={item}/>
                        )}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={<Text>No recent documents found.</Text>}
                        contentContainerStyle={{justifyContent: 'space-between', alignItems: 'center'}}
                        horizontal={true}
                    />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
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