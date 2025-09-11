import BaseApi from "@/lib/api/BaseApi";

export default class LocalApi extends BaseApi {
    async fetchData(endpoint: string) {
        console.log(`Fetching data from local storage for endpoint: ${endpoint}`);
        // const json =  AsyncStorage.getItem(endpoint);
        // return json ? JSON.parse(json) : null;
    }
}