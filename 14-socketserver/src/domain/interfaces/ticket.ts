

export interface Ticket {
    id: string;
    number: number;
    createdAt: Date;
    handleAtDesk?: string;
    handlAt?: Date;
    done: boolean;
}

