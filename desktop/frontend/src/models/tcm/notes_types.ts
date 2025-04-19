export type Notes = {
  ID: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;

  tcm: number;
  scm: number;
  weeks: number;

  insurance: number;
  insurance_id: string;
  insurance_plan: string;

  date: string;

  billable: string;
  minutes: number;
  units: number;

  timeIn: string;
  timeOut: string;
  location: string;
  opening: string;
  sp: string;
  addendums: string;
  sprfollowup: string;
  spr: string;
  closing: string;
  description: string;
  charged: boolean;
  // -----------
  timeIn_2: string;
  timeOut_2: string;
  location_2: string;
  opening_2: string;
  sp_2: string;
  addendums_2: string;
  sprfollowup_2: string;
  spr_2: string;
  closing_2: string;
  description_2: string;
  charged_2: boolean;
  // ---------------
  timeIn_3: string;
  timeOut_3: string;
  location_3: string;
  opening_3: string;
  sp_3: string;
  addendums_3: string;
  sprfollowup_3: string;
  spr_3: string;
  closing_3: string;
  description_3: string;
  charged_3: boolean;
  // ------------------
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
  // signatureTcm: string;
  // signatureTCMS: string;
  // signatureBILLER: string;
  // -- Billing
  invoiced: boolean; // Facturado
  invoiced_date: string;
  biller: number,
  biller_full_name: string,
  biller_signature: string,

  invoiced2: boolean; // Facturado
  invoiced_date2: string;
  biller2: number,
  biller2_full_name: string,
  biller2_signature: string,

  invoiced3: boolean; // Facturado
  invoiced_date3: string;
  biller3: number,
  biller3_full_name: string,
  biller3_signature: string,
  // ------------------------
  paid: string;   // Tipo de pago
  paid_date: string;
  finance: number,
  finance_full_name: string,
  signature_finance: string,
  paidUnits: number;

  paid2: string;   // Tipo de pago
  paid_date2: string;
  finance2: number,
  finance2_full_name: string,
  signature_finance2: string,
  paidUnits2: number;

  paid3: string;   // Tipo de pago
  paid_date3: string;
  finance3: number,
  finance3_full_name: string,
  signature_finance3: string,
  paidUnits3: number;

}