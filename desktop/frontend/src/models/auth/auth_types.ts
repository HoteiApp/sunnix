import { Record, Conversation, Weeks, Fortnight } from '../index';

export type User = {
    ID: string;
    uid?: string;
    email?: string;
    nick?: string;
    referrer_id?: string;
    status?: string;
    roll?: string;
    global?: boolean;
    approved?: boolean;
    active?: boolean;
    credentials?: string;
    security_code?: boolean;
    change_password?: boolean;
    hr_can_sign?: boolean;
    qa_can_sign?: boolean;
    supervisor_can_sign?: boolean;
    payment_by_units?: number;
    supervisor?:number;
    fixed_pay?: boolean;
    payment_by_hours?: number;
    rent?: number;
    business?: string;
};

export type ActiveUser = {
    User?: User;
    Record?: Record;
    Avatar?: string;
    Signature?: string;
    WeekActive?: Weeks;
    FortnightActive?: Fortnight;
    Conversation?: Conversation[];
};

export type Users = {
    users?: User[];
};

export type ProposeMr = {
    proposed_mr: number;
};

export type AvailanbleMr = {
    available: boolean;
};


export type Active = {
    activeUser?: ActiveUser;
};

export type UserInfo = {
    userInfo?: ActiveUser;
};

export type ActiveUserFA = {
    status?: string;
    pluginActive?: boolean;
    qr?: string;
};

export type UserLogin = {
    username: string;
    password: string;
};

export type UserLoginFA = {
    username: string;
    password: string;
    code: string;
};