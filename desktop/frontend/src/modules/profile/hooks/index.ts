import { useChangePassword } from "../../../hooks/auth/useChangePassword";
import { useChangeUserPassword } from "../../../hooks/auth/useChangeUserPassword";

import { useUserActivity } from "./useUserActivity";
import { useUserLogs } from "./useUserLogs";
import { useChangePersonalInformation } from "./useCahngeDatePersonalInfo";
import { useChangeEducation } from "./useChangeDateEducation";
import { useChangeEmploymentHistory } from "./useChangeDateEmploymentHistory";
import { useChangePersonalReferences } from "./useChangeDatePersonalReferences";
import { useChangeEmergencyMedical } from "./useCahngeDateEmergencyMedical";
import { useChangeDirectDeposit } from "./useChangeDateDirectDeposit";
import { useSignature } from "./useSignature";
import { useCheckEmail } from "./useCheckEmail";

import { useUploadFiles } from "./useUploadFiles";
import { useCoreUsersHiring } from "./core/coreUsersHiring";
import { useCoreUsersApplications } from "./core/coreUsersApplications";
import { useCoreUserInfo } from "./core/coreUserInfo";
import { useCoreUsers } from "./core/coreUsers";
import { useCoreModifyDateService } from "./core/coreModifyDateService";


import { useCoreRegister } from "./core/coreRegister";
import { useMySignature } from "./core/coreMySignature";

import { useCoreChatConversation } from "./core/coreChatConversation";

// Gobal
import { useUploadAudio } from "./core/coreUploadAudio";
import { useLoadVoicesNote } from "./core/coreLoadVoicesNote";
import { useDeleteS3Voices } from "./core/coreDeleteS3Voices";

import { useCreatePdf } from "./core/coreCreatePDF";
import { useDeleteS3Object } from "./core/coreDeleteS3Object";
import { useUploadS3Pdf } from "./core/coreUploadS3PDF";
import { useDownloadS3Zip } from "./core/coreDownloadS3Zip";
import { useDownloadS3PDF } from "./core/coreDownloadS3df";
import { useUploadFilesS3 } from "./useUploadFilesS3";
import { useGetUrls3 } from "./useGetUrlS3";
import { useGetHiringUrls3 } from "./useGetHiringUrlS3 ";
import { useUploadAvatarS3 } from "./useUploadAvatarS3";

// Module TCM
// TODO: Hay que cambiar el nombre de las funciones para acomodar
import { useLoadDocsS3 } from "./core/coreLoadDocsS3";
import { useCoreTCMS } from "./core/moduleTCMAllTCMS";
import { useCoreSUPClients } from "./core/moduleTCMpendingSUPClients";
import { useCoreProposeMr } from "./core/coreProposeMr";
import { useCoreAvailableMr } from "./core/coreAvailableMr";


import { useCoreRequestEditSCMCertification } from "./core/moduleTCMRequestEditSCMCertification";
import { useCoreRequestEditSCMAssessment } from "./core/moduleTCMRequestEditSCMAssessment";
import { useCoreRequestEditSCMSpInitial } from "./core/moduleTCMRequestEditSCMSpInitial";
import { useCoreRequestEditSCMClient } from "./core/moduleTCMRequestEditSCMClient";
import { useCoreRequestsNewClients } from "./core/moduleTCMRequestsNewClients";
import { useCoreRequestSubmitSCMSure } from "./core/moduleTCMRequestSubmitSCMSure";
import { useCoreRequestEditSCMSure } from "./core/moduleTCMRequestEditSCMSure";
import { useCoreRequestAddSCMSure } from "./core/moduleTCMRequestAddSCMSure";
import { useCoreRequestEditClient } from "./core/moduleTCMRequestEditClient";
import { useCoreRequestNewClient } from "./core/moduleTCMRequestNewClient";
import { useServiceSCMactive } from "./core/moduleTCMServiceSCMactive";
import { useDelReqClient } from "./core/moduleTCMDeleRequestClient";
import { useCoreClientInfo } from "./core/moduleTCMClientInfo";
import { useCoreQAClients } from "./core/moduleTCMClientsQA";
import { useCoreQAClientsDatabase } from "./core/moduleTCMClientsDatabese";
import { useCoreClientSCM } from "./core/moduleTCMClientSCM";
import { useNewClient } from "./core/moduleTCMNewClient";

export { 
    useChangePassword, 
    useChangeUserPassword,
    useUserActivity, 
    useUserLogs, 
    useChangePersonalInformation, 
    useChangeEducation, 
    useChangeEmploymentHistory,
    useChangePersonalReferences,
    useChangeEmergencyMedical,
    useChangeDirectDeposit,
    useUploadFiles,
    useUploadFilesS3,
    useSignature,
    useCheckEmail,
    useCoreUsersHiring,
    useCoreUsersApplications,
    useCoreUserInfo,
    useCoreUsers,
    useCoreProposeMr,
    useCoreAvailableMr,
    useCoreModifyDateService,
    useCoreRequestNewClient,
    useCoreRequestEditClient,
    useCoreRequestEditSCMClient,
    useCoreRequestSubmitSCMSure,
    useCoreRequestEditSCMSure,
    useCoreRequestAddSCMSure,
    useCoreRequestEditSCMCertification,
    useCoreRequestEditSCMAssessment,
    useCoreRequestEditSCMSpInitial,
    useCoreRequestsNewClients,
    useCoreChatConversation,
    useCreatePdf,
    useUploadS3Pdf,
    useUploadAvatarS3,
    useDeleteS3Object,
    useGetUrls3,
    useLoadDocsS3,
    useGetHiringUrls3,
    useDownloadS3Zip,
    useDownloadS3PDF,
    useNewClient,
    useCoreTCMS,
    useCoreQAClients,
    useServiceSCMactive,
    useDelReqClient,
    useCoreClientInfo,
    useCoreRegister,
    useMySignature,
    useCoreClientSCM,    
    useCoreSUPClients,
    useCoreQAClientsDatabase,
    useUploadAudio,
    useLoadVoicesNote,
    useDeleteS3Voices,
  
};
