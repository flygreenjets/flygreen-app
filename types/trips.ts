export interface Trip {
    id: number;
    name: string;
    description: string;
    departureDate: string;
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