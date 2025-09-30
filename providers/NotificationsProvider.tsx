import {createContext, useContext, useEffect, useMemo, useRef, useState} from "react";
import {ExpoPushToken} from "expo-notifications";
import {useRouter} from "expo-router";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import {Platform} from "react-native";
import useMutation from "@/hooks/mutation";
import useQuery from "@/hooks/query";
import {useAuth} from "@/providers/AuthProvider";
interface NotificationsContextProps {
    expoPushToken?: ExpoPushToken,
    badgeCount: number;
    notification: Notifications.Notification | undefined;
    setBadgeCount: (count: number) => void;
    refreshNotifications: () => Promise<void>;
    markAsRead: (notificationId: string) => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextProps>({
    expoPushToken: undefined,
    badgeCount: 0,
    notification: undefined,
    setBadgeCount: () => {},
    refreshNotifications: async () => {},
    markAsRead: async () => {},
});

export function NotificationsProvider({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const [badgeCount, setBadgeStateCount] = useState(0);
    const {refreshUser} = useAuth();

    const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>();
    const [notification, setNotification] = useState<Notifications.Notification | undefined>();

    const notificationListener = useRef<Notifications.EventSubscription>(undefined);
    const responseListener = useRef<Notifications.EventSubscription>(undefined);

    const [markAsReadMutation] = useMutation('/notification/mark-as-read', 'POST');

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldSetBadge: true,
            shouldShowList: true,
            shouldShowBanner: true
        }),
    });

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Please enable Notifications to be always up to date.");
                return;
            }
            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas.projectId,
            });
        } else {
            alert("Must be using a physical device for Push notifications");
        }

        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
            });
        }
        return token;
    }

    const refreshNotifications = async () => {
        // Placeholder for actual refresh logic
    }

    const setBadgeCount = async (count: number) => {
        setBadgeStateCount(count);
        await Notifications.setBadgeCountAsync(count);
    }

    const markAsRead = async (notificationId: string) => {
        try {
            await markAsReadMutation({notificationId});
            await setBadgeCount(badgeCount-1);
        } catch (error) {
            console.error("Failed to mark notification as read", error);
        }
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token);
        });

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
                setBadgeCount(notification.request.content.badge ?? badgeCount + 1);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                const data = response.notification.request.content.data;
                if (data.type === 'trip') {
                    markAsRead(response.notification.request.identifier);
                    router.replace(`/trip/${data.id}`);
                } else if (data.type === 'account') {
                    refreshUser(data.id as string).then(() => {
                        router.replace(`/(tabs)`);
                    });
                }
            });

        return () => {
            notificationListener.current!.remove();
            responseListener.current!.remove();
        };
    }, []);

    const contextValue = useMemo(() => ({
        badgeCount,
        expoPushToken,
        notification,
        setBadgeCount,
        refreshNotifications,
        markAsRead
    }), [badgeCount, setBadgeCount, refreshNotifications, expoPushToken, notification, markAsRead]);


    return (
        <NotificationsContext.Provider value={contextValue}>
            {children}
        </NotificationsContext.Provider>
    );
}

export function useNotifications() {
    return useContext(NotificationsContext);
}