import { Fortnight } from "../index"
export type NotesPayments = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    payment_tcm: number;
    note: number;
    client: string;
    sure: string;
    sure_name: string;
    rate: number;
    retroactive: boolean;
    date: string;
    units: number;

    units_paid: number;
    units_pending: number;
    paid: string;
    paid_date: string;

    units_paid2: number;
    units_pending2: number;
    paid2: string;
    paid_date2: string;

    units_paid3: number;
    units_pending3: number;
    paid3: string;
    paid_date3: string;

};

export type PaymentsRateRange = {
    ID: number;
    payment: number;
    range: number;
    from: number;
    to: number;
    rate: number;
}

export type PaymentsTcm = {
    id: number;
    payment: number;
    tcm: number;
    tcm_name: string;

    fortnight: Fortnight;

    date: string;
    
    fixed_pay: boolean;

    rate: number;
    remaining_rate: number;

    units: number;
    units_retroactive: number;
    units_paid: number;
    hours_paid: number;
    units_pending: number;

    paid: number;
    profit: number;
    vacation: number;

    range: PaymentsRateRange[];

    visible: boolean;
    approved: boolean;
    collected: boolean;
    // NotesPayments: NotesPayments[];
};

export type Payment = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    fortnight: number;
    date: string;
    rate: number;
    rent: number;
    units_paid: number;
    hours_paid: number;
    units_paid_retroactive: number;
    hours_paid_retroactive: number;

    paid: number;
    profit: number;
    vacation: number;
    percentage_billings: number;
    paid_billings: number;
    visible: boolean;
    approved: boolean;
    // PaymentsTcm: PaymentsTcm[];
};

export type Payments = {
    payments: Payment[];
}
export type PaymentsAllTcm = {
    ranges: PaymentsRateRange[];
    paymentsTcm: PaymentsTcm[];
}
export type PaymentsAllTcmNotes = {
    notes: NotesPayments[];
    retroactives: NotesPayments[];
}
