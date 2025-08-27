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
}

export interface Agent {
    id: number;
    name: string;
    shortName: string;
    phone: string;
    email: string;
}

export interface Loyalty {
    id: number;
    name: string;
    threshold: number;
}