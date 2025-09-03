import {Colors} from "@/utils/Colors";

export interface Trip {
    id: number;
    name: string;
    description: string;
    departureDate: string;
    stage: string;
    status: string;
    rfqCount: number;
    rfqResolved: Number;
    departureAirport: Airport;
    destinationAirport: Airport;
    aircraft?: Aircraft;
    pax: number;
    duration: string;
    fuelStops?: number; // optional property
    quotes: Quote[];
    tripSheets: TripSheet[];
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