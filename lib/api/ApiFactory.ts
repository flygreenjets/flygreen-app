import * as Network from 'expo-network';
import RemoteApi from "@/lib/api/RemoteApi";
import LocalApi from "@/lib/api/LocalApi";


async function isConnected(): Promise<boolean> {
    const status = await Network.getNetworkStateAsync();
    return status.isConnected ? status.isInternetReachable === true : false;
}

export async function getApi(xsrfToken?: string) {
    return (await isConnected()) ? new RemoteApi(xsrfToken) : new LocalApi();
}
