import BaseApi from "@/lib/api/BaseApi";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocalApi extends BaseApi {
    async fetchData(endpoint: string) {
        try {
            const value = await AsyncStorage.getItem(endpoint);
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (e) {
            // error reading value
            console.error(`Error reading ${endpoint} from AsyncStorage:`, e);
            throw new Error(`Error reading ${endpoint} from local storage.`);
        }
    }
}