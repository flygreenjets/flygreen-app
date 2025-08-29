import {Trip} from "@/types/trips";

export interface AccountTripsResponse {
    requested: Trip[];
    upcoming: Trip[];
    past: Trip[];
}