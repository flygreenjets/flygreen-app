import {useAuth} from "@/providers/AuthProvider";
import {SplashScreen} from "expo-router";

export default function Splash() {
    const {loading} = useAuth();

    if (!loading) {
        SplashScreen.hideAsync();
    }
    return null;
}