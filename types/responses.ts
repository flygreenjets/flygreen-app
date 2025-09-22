import {Trip} from "@/types/trips";
import {RecentDocument, Notification, Account} from "@/types/types";

export interface AccountTripsResponse {
    requested: Trip[];
    upcoming: Trip[];
    past: Trip[];
}

export interface HomepageResponse {
    nextConfirmedTrip: Trip;
    nextRequestedTrip: Trip;
    recentlySharedDocs: RecentDocument[];
    notificationCount: number;
    activeAccount: Account;
}