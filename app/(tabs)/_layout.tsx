import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { HomeIcon, UserIcon } from "react-native-heroicons/micro";
import {Colors} from "@/utils/Colors";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.gold,
            tabBarInactiveTintColor: Colors.white,
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: Colors.flygreenGreen,
                paddingTop: 18,
                height: 80,
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Trips",
                    tabBarIcon: ({ color }) => <HomeIcon size={32} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <UserIcon size={32} color={color} />,
                }}
            />
            <Tabs.Screen
                name="[tripId]"
                options={{
                    headerShown: false,
                    title: "Trip",
                    href: "/[tripId]",
                }}
            />
        </Tabs>
    );
}