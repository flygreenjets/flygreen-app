import {Account} from "@/types/types";

export enum TripStatus {
    Open = "open",
    Confirmed = "confirmed",
    Planning = "planning",
    ReadyToFly = "ready",
    Flying = "flying",
    Cancelled = "cancelled",
    Flown = "flown",
    Completed = "completed",
    Closed = "closed",
}
export const StatusOrder: Record<TripStatus, number> = {
    [TripStatus.Open]: 0,
    [TripStatus.Confirmed]: 1,
    [TripStatus.Planning]: 2,
    [TripStatus.ReadyToFly]: 3,
    [TripStatus.Flying]: 4,
    [TripStatus.Cancelled]: 5,
    [TripStatus.Flown]: 6,
    [TripStatus.Completed]: 7,
    [TripStatus.Closed]: 8,
};

export enum TripStage {
    Sourcing = "Sourcing",
    Quoting = "Quoting",
    Diligence = "Diligence",
    ClosedWon = "Closed Won",
    ClosedLost = "Closed Lost",
    ClosedCancelled = "Closed Cancelled",
    Completed = "Completed",
}

export const StageOrder: Record<TripStage, number> = {
    [TripStage.Sourcing]: 0,
    [TripStage.Quoting]: 1,
    [TripStage.Diligence]: 2,
    [TripStage.ClosedWon]: 3,
    [TripStage.ClosedLost]: 4,
    [TripStage.ClosedCancelled]: 5,
    [TripStage.Completed]: 6,
};


export interface Trip {
    id: number;
    name: string;
    description: string;
    departureDate: string;
    stage: TripStage;
    status: TripStatus;
    rfqCount: number;
    rfqResolved: Number;
    departureAirport: Airport;
    destinationAirport: Airport;
    aircraft?: Aircraft;
    pax: number;
    duration: string;
    numStops?: number; // optional property
    pointValue: number;
    quotes: Quote[];
    tripSheets: TripSheet[];
    tripReports: TripReport[];
    account: Account;
    primaryImageUrl: string;
    documents: TripDocument[];
}

export interface Airport {
    id: number;
    code: string;
    name: string;
    location: string;
    phone: string;
}

export interface Fbo {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
}

export interface Segment {
    departureDate: string;
    departureAirport: Airport;
    departureFbo: Fbo;
    destinationAirport: Airport;
    destinationFbo: Fbo;
    pax: number;
    sort: number;
    duration: string | null;
}

export interface Quote {
    id: string,
    notes?: string,
    imageUrl: string,
    departureDate: string,
    aircraft: Aircraft,
    images: string[],
    departureAirport: Airport;
    destinationAirport: Airport
    pax: number,
    duration: string,
    fuelStops: number,
    quoteFlag?: {
        label: string,
        color: string,
    },
    price: number,
    clientHasRequestedBooking: boolean,
}

export interface TripSheet {
    id: number,
    tailNumber: string,
    departureDate: string,
    pilotInCommand: string,
    secondInCommand: string,
    cabinAttendant: string,
    passengers: Passenger[],
    notes: string,
    segments: Segment[],
    primaryImage: string
}

export interface TripReport {
    id: number,
    flightDistance: number,
    totalBlockMinutes: number,
    maxAltitude: number,
}

export interface Passenger {
    id: number,
    name: string,
}

export interface Aircraft {
    aircraftDiagram: string,
    cabinViewUrl: string,
    category: string,
    model: string,
    seats: number,
    cabinHeight: string,
    yom: string,
    yor: string,
    homebase: string,
    is_floating: boolean
}

export interface TripDocument {
    id: number,
    type: string,
    name: string,
    url: string,
    created_at: string,
    description?: string,
}