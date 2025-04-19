// ===== SUPERVISIONS =====
import { useTcmSupervisionsDomain } from "./supervisions/domain"
import { useTcmSupervisios } from "./supervisions/supervisions"
import { useTcmSupervisionsComplete } from "./supervisions/complete"
import { useTcmSupervisionsAdd } from "./supervisions/add"
import { useTcmSupervisionsChangeDate } from "./supervisions/changedDate"

// ===== CLIENTS =====
import { useTCMClients } from "./clients/myClients"
import { useTCMClientsActive } from "./clients/myClientsActive"

// ===== DIARY =====
import { useDateDiary } from "./diary/diary"

// ===== TCM =====
import { useTcmMyTcm } from "./tcms/myTcm"
import { useModuleTcmAllTcms } from "./tcms/allTcms"
import { useCoreListTCMS } from "./tcms/listTCMS"

// ===== NOTES =====
import { useTcmNotes } from "./notes/tcmNotes"
import { useNotesAdd } from "./notes/add"
import { useNotesDate } from "./notes/date"
import { useNotesEdit } from "./notes/edit"
import { useNoteDel } from "./notes/del"
import { useClientNotes } from "./notes/clientNotes"

// ===== Payments =====
import { useTcmAddPayments } from "./payments/add"
import { useTcmAllPayments } from "./payments/all"
import { useTcmAllPaymentsBusiness } from "./payments/business"
import { useTcmAllPaymentsTCM } from "./payments/tcm"
import { useTcmAllPaymentsTCMNotes } from "./payments/notes"
import { useTcmMyPayments } from "./payments/my"

// ===== BILLING =====
import { useTcmBillActive } from "./billing/billActive"
import { useTcmBillActivesBiller } from "./billing/billActivesBiller"
import { useTcmBillActivesTcm } from "./billing/billActivesTcms"
import { useBillBusinessConfig } from "./billing/billBusinessConfig"
import { useBillUserConfig } from "./billing/billUserConfig"
import { useTcmNotesBill } from "./billing/mynotesbill"
import { useBillAdd } from "./billing/billCreate"
import { useTcmmyBills } from "./billing/mybills"
import { useBillDel } from "./billing/billDelete"
import { useBillApprove } from "./billing/billApprove"
import { useNoteInvoiced } from "./billing/noteInvoiced"
import { useNotePaid } from "./billing/notePaid"
import { useNotePaidUnits } from "./billing/notePaidUnits"
import { useNotePeriod } from "./billing/notePeriod"
import { useNotePeriodBusiness } from "./billing/notePeriodBusiness"
import { useNotePeriodTcm } from "./billing/notePeriodTcm"
import { useBillTcmView } from "./billing/billTcmView"



export {
    // Supervisions
    useTcmSupervisionsDomain,
    useTcmSupervisios,
    useTcmSupervisionsComplete,
    useTcmSupervisionsAdd,
    useTcmSupervisionsChangeDate,

    // Clients
    useTCMClients,
    useTCMClientsActive,

    // Diary
    useDateDiary,

    // TCM
    useTcmMyTcm,
    useModuleTcmAllTcms,
    useCoreListTCMS,

    // Notes
    useTcmNotes,
    useNotesAdd,
    useNotesDate,
    useNotesEdit,
    useNoteDel,
    useClientNotes,

    // Payments
    useTcmAddPayments,
    useTcmAllPayments,
    useTcmAllPaymentsTCM,
    useTcmAllPaymentsTCMNotes,
    useTcmAllPaymentsBusiness,
    useTcmMyPayments,
    
    // Billing
    useTcmBillActivesBiller,
    useNotePeriodBusiness,
    useBillBusinessConfig,
    useBillUserConfig,
    useTcmBillActivesTcm,
    useNotePeriodTcm,
    useTcmBillActive,
    useNotePaidUnits,
    useTcmNotesBill,
    useNoteInvoiced,
    useBillApprove,
    useTcmmyBills,
    useNotePeriod,
    useBillTcmView,
    useNotePaid,
    useBillAdd,
    useBillDel
}