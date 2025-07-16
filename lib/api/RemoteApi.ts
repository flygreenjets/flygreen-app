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

    async fetchData(endpoint: string) {
        const response = await this.axiosInstance.get(endpoint);
        return response.data;
    }

    async saveData(endpoint: string, data: any) {
        await this.axiosInstance.post(endpoint, data);
    }
}
