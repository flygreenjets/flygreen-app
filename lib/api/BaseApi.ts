export default abstract class BaseApi {
    protected baseUrl: string;

    constructor() {
        this.baseUrl = process.env.EXPO_PUBLIC_BACKEND_URL || "http://flygreen.test";
    }

    abstract fetchData(endpoint: string): Promise<any>;
}