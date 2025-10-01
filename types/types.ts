export interface User {
    id: number;
    name: string;
    email: string;
    accounts: Account[];
}

export interface Account {
    id: number;
    name: string;
    loyaltyPoints: number;
    cashbackBalance: number;
    agent: Agent;
    loyalty: Loyalty;
    isMainAccount: boolean;
    nextLoyaltyTier: Loyalty;
}

export interface Agent {
    id: number;
    name: string;
    shortName: string;
    phone: string;
    whatsapp: string;
    email: string;
}

export interface Loyalty {
    id: number;
    name: string;
    threshold: number;
    imageUrl: string;
}

export interface RecentDocument {
    id: string;
    type: "Quote" | "Trip Sheet";
    orderDate: string;
    tripId: number;
    itinerary: string;
    description: string;
}

export interface Notification {
    id: string;
    data: {
        title: string;
        body: string;
        data: {
            id: string;
            type: string;
            accountId: number;
        }
    }
    createdAt: string;
    readAt: string;
}