import { Tabs } from 'expo-router';
import { HomeIcon, UserIcon } from "react-native-heroicons/micro";
import {Colors} from "@/utils/Colors";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
    return (
        <Tabs
            initialRouteName="index"
            screenOptions={{
                tabBarActiveTintColor: Colors.gold,
                tabBarInactiveTintColor: Colors.white,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    borderStyle: 'dashed',
                    backgroundColor: Colors.flygreenGreen,
                    paddingTop: 18,
                    height: 80,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <HomeIcon size={32} color={color} />,
                }}
            />
            <Tabs.Screen
                name="trips"
                options={{
                    title: "Trips",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="airplane" size={32} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <UserIcon size={32} color={color} />,
                }}
            />
        </Tabs>
    );
}