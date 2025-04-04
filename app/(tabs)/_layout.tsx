import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { HomeIcon, UserIcon } from "react-native-heroicons/micro";

export default function TabLayout() {
    const getIconColor = (focused: boolean) => {
        return focused ? '#ffbf00' : 'white';
    }

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: 'blue',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                paddingTop: 12,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                backgroundColor: '#205046',
                borderTopWidth: 0,
                height: 80,
            },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => <HomeIcon size={32} color={getIconColor(focused)} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ focused }) => <UserIcon size={32} color={getIconColor(focused)} />,
                }}
            />
        </Tabs>
    );
}