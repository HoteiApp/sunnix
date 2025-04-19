export type Weeks = {
    ID: number;
    start: string;
    end: string;
    active: boolean;
};

export type Fortnight = {
    ID: number;
    start: string;
    end: string;
    start_second: string;
    end_second: string;
    pay_date: string;
    active: boolean;
    paid: boolean;
};