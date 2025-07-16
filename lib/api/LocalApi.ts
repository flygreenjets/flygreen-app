import BaseApi from "@/lib/api/BaseApi";

export default class LocalApi extends BaseApi {
    async fetchData(endpoint: string) {
        // const json =  AsyncStorage.getItem(endpoint);
        // return json ? JSON.parse(json) : null;
    }

    async saveData(endpoint: string, data: any) {
        // await AsyncStorage.setItem(endpoint, JSON.stringify(data));
    }
}