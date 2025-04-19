// -- TCMS
import {Record, User} from "../index"

export type SupTCMStruct = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    email: string;
    nick: string;
    password_hash: string;
    change_password: boolean;
    status: string;
    security_code: boolean;
    global: boolean;
    approved: boolean;
    active: boolean;
    referrer_id: number;
    roll: string;
    credentials: string;
    temporary_supervisor: boolean;
    hr_can_sign: boolean;
    qa_can_sign: boolean;
    supervisor_can_sign: boolean;
    record: number;
    supervisor: number;

}

export type SupTCMS = {
    tcms?: SupTCMStruct[];
};

export type ListTcms = {
    info?: Record,
    photo?: string,
    user?: User,
    total_tcm?: number;
}

export type TcmsList = {
    tcms?: ListTcms[];
}