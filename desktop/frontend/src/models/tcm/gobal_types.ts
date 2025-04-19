import {Record, Client, Event, Notes, Supervisons, Fortnight, TcmsNotesBill, User} from "../index"
// -----------------------------------
export type TcmLits = {
    info?: Record;
    user?: User;
    clients?: Client[];
    bill?: TcmsNotesBill;
}

export type TcmsLits = {
    info?: Record,
    user?: User,
    list_tcm?: TcmLits[];
}

export type Tcms = {
    tcms?: TcmsLits[];
}
export type Tcm = {
    tcms?: TcmLits[];
}


export type DataDiary = {
    notes: Notes[];
    events: Event[];
    payments: Fortnight[];
    supervisions: Supervisons[];
};