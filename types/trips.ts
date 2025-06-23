import {Colors} from "@/utils/Colors";

export interface Trip {
    id: number;
    name: string;
    description: string;
    departureDate: string;
    stage: string;
    departureAirport: {
        code: string;
        name: string;
    };
    destinationAirport: {
        code: string;
        name: string;
    };
    aircraft: {
        category: string;
        model: string;
        registration: string;
    };
    pax: number;
    duration: string;
    fuelStops?: number; // optional property
}

export interface Segment {
    departureAirport: {
        code: string;
        name: string;
    };
    destinationAirport: {
        code: string;
        name: string;
    };
    departureAirportCode: string;
    destinationAirportCode: string;
    departureDate: string;
    departureTime: string | null;
    arrivalDate: string | null;
    arrivalTime: string | null;
    blockMinutes: number;
    numPaxTbd: boolean;
    numPaxTBD: number | null;
    numStops: number;
    numPax: number;
    sort: number;
    duration: string | null;
    departureTimeTBD: string | null;
}

export interface Quote {
    id: string,
    notes?: string,
    imageUrl: string,
    departureDate: string,
    aircraft: {
        category: string,
        model: string,
        seats: number,
        cabinHeight: string,
        yom: string,
        yor: string
    }
    departureAirport: {
        code: string,
        name: string,
    },
    destinationAirport: {
        code: string,
        name: string,
    },
    pax: number,
    duration: string,
    fuelStops: number,
    quoteFlag?: {
        label: string,
        color: string,
    },
    price: number,
    segments: {
        departure: {
            airport: {
                code: string,
                name: string,
            },
            date: string,
            time:string,
        },
        arrival: {
            airport: {
                code: string,
                name: string,
            },
            date: string,
            time: string,
        },
        flightTime: string,
        fuelStops: number,
    }
}