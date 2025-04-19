export type Supervisons = {
    id: number;
    user: number;
    domain_id: number;
    domain: string;
    topic_id: number;
    title: string;
    hour: number;
    order: number;
    date: string;
    date_tcm: string;
    signature_tcm: string
    date_tcms: string;
    signature_tcms: string
    completed: boolean;
};

export type TcmSupervisons = {
    supervisions: Supervisons[];
};

export type TcmSupervisionsTopicDomain = {
    ID: number,
    domain: number,
    title: string,
    hour: number,
    order: number
};

export type TcmSupervisionsDomain = {
    id: number,
    order: number,
    domain: string,
    active: boolean,
    topics: TcmSupervisionsTopicDomain[]
};

export type TcmSupervisionsAll = {
    supervisions: TcmSupervisionsDomain[],
};

