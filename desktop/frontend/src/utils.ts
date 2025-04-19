import { createElement } from "react";
import { toast } from "react-toastify";

import {
  NotificationError,
  NotificationSuccess,
  NotificationQuestion,
  NotificationWarning,
} from "./modules/commons";
const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";
const displayNotificationQuestion = (message: string) => {
  toast.success(createElement(NotificationQuestion, { message }), {
    autoClose: 2500,
  });
};
const displayNotificationSuccess = (message: string) => {
  toast.success(createElement(NotificationSuccess, { message }), {
    autoClose: 2500,
  });
};

const displayNotificationWarning = (message: string) => {
  toast.warning(createElement(NotificationWarning, { message }), {
    autoClose: 2500,
  });
};

const displayNotificationError = (error: Error) => {
  toast.error(createElement(NotificationError, { error }));
};

const panelColors = ["#EEEEEE", "#9bf4ab", "#70db93", "#28c177", "#027623"];
const weekNames = ["D", "L", "M", "M", "J", "V", "S"];
const monthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "Ma",
  "Jun",
  "Jul",
  "Ag",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
let today = new Date();
let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

const until = date;
const strCapitalize = (str: string) =>
  str ? `${str[0].toUpperCase()}${str.substring(1)}` : "";



// ----------------
// const AWS_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID ?? "";
// const AWS_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY ?? "";
// const AWS_REGION = process.env.REACT_APP_AWS_REGION ?? "";

// const AWS = require('aws-sdk');
// AWS.config.update({
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   region: AWS_REGION
// });
// const s3 = new AWS.S3();

// const getPresignedUrl = (bucket, key) => {
//   const params = {
//     Bucket: bucket,
//     Key: key,
//     Expires: 60 // Tiempo en segundos que la URL será válida
//   };
//   return s3.getSignedUrl('getObject', params);
// };
// ----------------
const getPlanImageUrl = (planName) => {
  // const apiUrlStatic = "https://example.com"; // Cambia esto por tu URL base correcta

  switch (planName) {
    case "Sunshine Health":
      return `${apiUrlStatic}/static/media/sunshine-logo.png`;
    case "Cigna":
      return `${apiUrlStatic}/static/media/cigna.png`;
    case "Molina Healthcare":
      return `${apiUrlStatic}/static/media/molinaLogo-notag.png`;
    case "Aetna Better Health":
      return `${apiUrlStatic}/static/media/aetna.png`;
    case "Aetna Health Plan":
      return `${apiUrlStatic}/static/media/aetnada.png`;
    case "Wellcare Health Plan":
      return `${apiUrlStatic}/static/media/wellcare.png`;
    case "Simply Healthcare":
      return `${apiUrlStatic}/static/media/simply.png`;
    case "Humana":
      return `${apiUrlStatic}/static/media/humana.png`;
    case "HealthSun Health Plan":
      return `${apiUrlStatic}/static/media/healthsun.png`;
    case "CarePlus Health Plan":
      return `${apiUrlStatic}/static/media/careplus.png`;
    case "Free Medicaid":
      return `${apiUrlStatic}/static/media/fcc.png`;
    default:
      return ""; // Retorna una cadena vacía o una imagen por defecto si el plan no coincide
  }
}
export {
  panelColors,
  weekNames,
  monthNames,
  until,
  getPlanImageUrl,
  // getPresignedUrl,
  displayNotificationSuccess,
  displayNotificationWarning,
  displayNotificationError,
  displayNotificationQuestion,
  strCapitalize,
};
