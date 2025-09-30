import { Tabs } from 'expo-router';
import {Colors} from "@/utils/Colors";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {StatusBar} from "expo-status-bar";

export default function TabLayout() {
    return (
        <>
            <StatusBar style="dark" />
            <Tabs
                initialRouteName="index"
                screenOptions={{
                    tabBarActiveTintColor: Colors.gold,
                    tabBarInactiveTintColor: Colors.white,
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
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
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={32} color={color} />,
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
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={32} color={color} />,
                    }}
                />
            </Tabs>
        </>
    );
}