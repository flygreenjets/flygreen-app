import axios from 'axios';
import BaseApi from "@/lib/api/BaseApi";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class RemoteApi extends BaseApi {
    private axiosInstance = axios.create({
        baseURL: this.baseUrl,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    constructor(token?: string) {
        super();
        if (token)
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    async fetchData(endpoint: string, method: 'GET' | "POST" | "PUT" | "PATCH" | "DELETE" = 'GET', data?: any) {
        try {
            const response = await this.axiosInstance.request({
                url: endpoint,
                method: method,
                ...(method === 'POST' && { data })
            });
            await AsyncStorage.setItem(endpoint, JSON.stringify(response.data));
            return response.data;
        } catch (error: any) {
            if (error.response) {
                // Server responded with a status other than 2xx
                throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                // Request was made but no response received
                throw new Error('API Error: No response from server.');
            } else {
                // Something else happened
                throw new Error(`API Error: ${error.message}`);
            }
        }
    }
}
