import {
    View,
    Text,
    StyleSheet,
    Pressable,
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
import ListItem from "@/components/ui/parts/ListItem";
import {useNotifications} from "@/providers/NotificationsProvider";

interface HomepageProps {
    recentDocs: RecentDocument[];
    nextTrip?: Trip | null;
    nextRequestedTrip?: Trip | null;
}

export default function Homepage({recentDocs, nextTrip = null, nextRequestedTrip = null}: HomepageProps) {
    const {activeAccount} = useAuth();
    const {badgeCount: notificationCount} = useNotifications();

    return (
        <>
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
                    <AccountPicker/>
                    <Pressable onPress={() => router.push('/notifications')}>
                        <View>
                            <Ionicons name="notifications-outline" size={30} color="black" />
                            {notificationCount > 0 && (
                                <Text style={styles.notificationBadge}>{notificationCount}</Text>
                            )}
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
                    <View style={{gap: 10, marginTop: 15}}>
                        <Text style={[styles.title, {fontSize: 16}]}>We're working on this trip</Text>
                        <Pressable key={nextRequestedTrip.id} onPress={() => router.push(`/trip/${nextRequestedTrip.id}`)}>
                            <TripCard trip={nextRequestedTrip} />
                        </Pressable>
                    </View>
                )}
            </View>
            {recentDocs && recentDocs.length > 0 && (
                <View style={{marginTop: 15}}>
                    <Text style={[styles.title, {fontSize: 16, marginBottom: 10}]}>Recently shared with you</Text>
                    {recentDocs.length && recentDocs.map((document, idx) => (
                        <ListItem
                            borderBottom={idx < recentDocs.length-1 && recentDocs.length > 1}
                            icon={<Ionicons name="document-text-outline" size={30} color={Colors.flygreenGreen}/>}
                            onPress={()  => router.push(`/trip/${document.tripId}`)}
                            key={document.id}
                            title={document.type}
                            description={document.description}
                            date={document.orderDate}
                        />
                    ))}
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
        top: -3,
        right: -3,
        elevation: 1,
        borderRadius: 50,
        paddingHorizontal: 5,
        paddingVertical: 2,
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});