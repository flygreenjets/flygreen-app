import axios from 'axios';
import BaseApi from "@/lib/api/BaseApi";
import LocalApi from "@/lib/api/LocalApi";

export default class RemoteApi extends BaseApi {
    private axiosInstance = axios.create({
        baseURL: this.baseUrl,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    constructor(xsrfToken: string) {
        super();
        this.axiosInstance.defaults.headers.common['X-XSRF-TOKEN'] = xsrfToken;
    }

    async fetchData(endpoint: string, method: 'GET' | 'POST' = 'GET', data?: any) {
        const response = await this.axiosInstance.request({
            url: endpoint,
            method: method,
            data: data,
            ...(method === 'POST' && { data })
        });
        return response.data;
    }

    async saveData(endpoint: string, data: any) {
        await this.axiosInstance.post(endpoint, data);
    }
}
