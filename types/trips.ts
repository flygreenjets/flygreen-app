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