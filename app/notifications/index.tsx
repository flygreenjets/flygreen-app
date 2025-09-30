import {View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Colors} from "@/utils/Colors";
import { formatDistanceStrict } from "date-fns";
import {router} from "expo-router";
import ListItem from "@/components/ui/parts/ListItem";
import {FontAwesome6} from "@expo/vector-icons";
import useQuery from "@/hooks/query";
import {useEffect, useState} from "react";
import {Notification} from "@/types/types";
import {useAuth} from "@/providers/AuthProvider";
import useMutation from "@/hooks/mutation";
import {getBadgeCountAsync, setBadgeCountAsync} from "expo-notifications";
import {useNotifications} from "@/providers/NotificationsProvider";

const {width} = Dimensions.get('window');

export default function NotificationsPage() {
    const {data, loading, error, refetch} = useQuery<{data: Notification[]}>('/notifications');
    const {markAsRead} = useNotifications();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const {user, activeAccount, setActiveAccount} = useAuth();

    useEffect(() => {
        if (!loading && data) {
            setNotifications(data.data);
        }
    }, [loading]);

    const notificationPress = async (notification: Notification) => {
        setNotifications(notifications.map((notif) => {
            if (notif.id === notification.id) {
                return {
                    ...notif,
                    readAt: new Date().toISOString(),
                }
            }
            return notif;
        }));
        const data = notification.data.data;
        if (data.accountId !== activeAccount.id) {
            const account = user.accounts.find((account) => account.id === data.accountId);
            if (account) {
                setActiveAccount(account);
                alert('Switched accounts to ' + account.name);
            }
        }
        if (data.type === "trip") {
            router.push(`/trip/${data.id}`)
        }
        markAsRead(notification.id);
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{backgroundColor: "white"}}>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
                    style={{height: "100%"}}>
                    {notifications.length === 0 && !loading && (
                        <View style={styles.emptyContainer}>
                            <Text
                                style={styles.emptyText}
                            >You have no notifications.</Text>
                        </View>
                    )}
                    {notifications && notifications.map((notification, key) => {
                        const thisAccount = user.accounts.length > 1 ? user.accounts.find(account => account.id === notification.data.data.accountId) : null;
                        return (
                            <ListItem
                                borderBottom={key < notifications.length-1 && notifications.length > 1}
                                key={key}
                                onPress={() => {notificationPress(notification)}}
                                icon={<FontAwesome6 style={styles.icon} name="bell" size={28} color="white" />}
                                style={{
                                    backgroundColor: notification.readAt ? "#eee" : "white",
                                }}
                            >
                                {thisAccount && (
                                    <Text style={{fontWeight: "bold"}}>{thisAccount.name}</Text>
                                )}
                                <View style={styles.notifTitleContainer}>
                                    <Text style={{fontWeight: 'bold'}}>{notification.data.title}</Text>
                                    <Text>•</Text>
                                    <Text style={{color: "#888"}}>
                                        {
                                            formatDistanceStrict(new Date(notification.createdAt), new Date(), {
                                                addSuffix: true,
                                            })
                                        }
                                    </Text>
                                </View>
                                <Text style={{width:width * 0.75}}>{notification.data.body}</Text>
                            </ListItem>
                        )
                    })}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    notifTitleContainer: {
        flexDirection: "row",
        gap: 5
    },
    icon: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: Colors.flygreenGreen,
        borderRadius: 50,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        color: "#888",
        textAlign: "center",
        maxWidth: width * 0.8,
    }
})