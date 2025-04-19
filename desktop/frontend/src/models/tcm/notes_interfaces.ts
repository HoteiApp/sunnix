export interface FormValueNotes {
    tcm: Number;
    scm: Number;
    weeks: Number;
    insurance: Number;
    date: string;
    billable: string;
    minutes: number;
    units: number;

    timeIn: string;
    timeOut: string;
    minutes_1: number;
    location: string;
    opening: string[];
    sp: string[];
    addendums: string[];
    sprfollowup: string[];
    spr: string[];
    closing: string[];
    description: string;
    charged: boolean;
    
    timeIn_2: string;
    timeOut_2: string;
    minutes_2: number;
    location_2: string;
    opening_2: string[];
    sp_2: string[];
    addendums_2: string[];
    sprfollowup_2: string[];
    spr_2: string[];
    closing_2: string[];
    description_2: string;
    charged_2: boolean;
    
    timeIn_3: string;
    timeOut_3: string;
    minutes_3: number;
    location_3: string;
    opening_3: string[];
    sp_3: string[];
    addendums_3: string[];
    sprfollowup_3: string[];
    spr_3: string[];
    closing_3: string[];
    description_3: string;
    charged_3: boolean;
    
    valueProgress1: string;
    valueProgress2: string;
    valueProgress3: string;
    valueProgress4: string;
    valueProgress5: string;
    valueProgress6: string;
    valueProgress7: string;
    valueProgress8: string;
    valueFollowUp: string;

    // -- Approve
    signatureTCM: string;
    signatureTCMS: string;
    signatureBILLER: string;
    // -- Billing
    invoiced: boolean; // Facturado
    paid: string;
}
