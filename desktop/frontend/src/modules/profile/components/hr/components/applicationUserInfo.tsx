import React, { useEffect, useState } from "react";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { ScrollTop } from "primereact/scrolltop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "primereact/dialog";
import { InputMask } from "primereact/inputmask";
import { Fieldset } from "primereact/fieldset";
import { SelectButton } from "primereact/selectbutton";
// import { format } from 'date-fns';
import { Countdown } from "../../../../commons";
import { get } from "../../../../../hooks/api";
import { useCoreUserInfo } from "../../../../profile/hooks";
import { useCoreModifyDateService } from "../../../hooks";
import { useGetHiringUrls3 } from "../../../../profile/hooks";
import { PdfViewer } from "../../../../commons";

const ApplicationUserinfo = ({ uid, relad }: Props) => {
  const { userInfo, reloadUserInfo } = useCoreUserInfo({ uid });
  const { urlDoc } = useGetHiringUrls3();
  const { changeDateService } = useCoreModifyDateService(relad);
  const [pdfContent, setPdfContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");

  // const [ingredient, setIngredient] = useState<string>('');
  const AvailableForOptions = [
    "Excellen",
    "Good",
    "Fair",
    "Poor",
    "N/A or Unable to Judge",
  ];

  const [question1, setQuestion1] = useState<string>("");
  const [question2, setQuestion2] = useState<string>("");
  const [question3, setQuestion3] = useState<string>("");
  const [question4, setQuestion4] = useState<string>("");
  const [question5, setQuestion5] = useState<string>("");
  const [question6, setQuestion6] = useState<string>("");
  const [question7, setQuestion7] = useState<string>("");
  const [question8, setQuestion8] = useState<string>("");
  const [question9, setQuestion9] = useState<string>("");
  const [question10, setQuestion10] = useState<string>("");
  const [question11, setQuestion11] = useState<string>("");
  const [question12, setQuestion12] = useState<string>("");
  const [question13, setQuestion13] = useState<string>("");

  const handleOpenModal = (file?: string) => {
    if (file !== "") {
      let url = `records/${uid}/${file}.pdf`;
      // Realizar una petición a la API de Go para descargar el PDF
      const fetchUrl = async () => {
        const result = await urlDoc({ key: url, duration: "1m" });
        if (result && result.url) {
          setPdfContent(result.url);
          setFileName(file ?? "");
          setIsOpen(true);
          // setDate("");
          if (file === "service_trainer_provider") {
            setDate(
              userInfo?.userInfo?.Record?.necessary_documents
                .service_trainer_provider_date ?? ""
            );
          }
          if (file === "service_cpr_aed") {
            setDate(
              userInfo?.userInfo?.Record?.necessary_documents
                .service_cpr_aed_date ?? ""
            );
          }
          if (file === "service_osha") {
            setDate(
              userInfo?.userInfo?.Record?.necessary_documents
                .service_osha_date ?? ""
            );
          }
          if (file === "service_infection_control") {
            setDate(
              userInfo?.userInfo?.Record?.necessary_documents
                .service_infection_control_date ?? ""
            );
          }
        }
      };
      fetchUrl();
    }

    // setIsOpen(true);

    // let url = file ? `hiring/download/${uid}/${file}` : `hiring/download/${uid}/resume`
    // Realizar una petición a la API de Go para descargar el PDF
    // get(`${url}`)
    //     .then(response => response.blob())
    //     .then(blob => {
    //         // Convertir el contenido del PDF a una URL
    //         const url = URL.createObjectURL(blob);

    //         // Almacenar la URL en el estado
    //         setPdfContent(url);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
  };

  const SaveDataService = () => {
    // TODO activar esta funcion
    changeDateService({ uid: uid, service: fileName, date: date });
  };

  const footerContent = (
    <div className="flex pt-4 w-full">
      {(fileName === "service_trainer_provider" ||
        fileName === "service_cpr_aed" ||
        fileName === "service_osha" ||
        fileName === "service_infection_control") && (
          <div className="flex w-full place-items-center">
            <div className="grid w-1/3">*Date obtained: &nbsp;</div>
            <div className="grid w-2/3">
              <div className="p-inputgroup flex-1">
                <InputMask
                  id="phone"
                  mask="99/99/9999"
                  placeholder="Type date"
                  value={date}
                  onChange={(e) => setDate(e.target.value ?? "")}
                  className="input input-ghost border-0 w-full text-center"
                  style={{
                    backgroundColor: "#e5ecfc",
                    border: 0,
                    borderRadius: 0,
                  }}
                />
              </div>
            </div>
          </div>
        )}

      {/* <Button label="Download" icon="pi pi-file-pdf" onClick={handleDownloadPDF} className="p-button-text" /> */}
      {/* <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" /> */}
      <Button
        label="Save"
        icon="pi pi-save"
        className="p-button-warning"
        onClick={SaveDataService}
        autoFocus
      />
    </div>
  );

  useEffect(() => {
    reloadUserInfo();
  }, [relad]);

  return (
    <div className="card">
      <Dialog
        header={fileName}
        visible={isOpen}
        maximizable
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "70vw", "641px": "90vw" }}
        onHide={() => setIsOpen(false)}
        footer={footerContent}
      >
        <p className="m-0">
          <div className="w-full">
            {pdfContent !== "" && isOpen && <PdfViewer fileUrl={pdfContent} />}
            {/* <iframe src={pdfContent} title="PDF" className='w-full h-screen' /> */}
          </div>
        </p>
      </Dialog>
      <TabView>
        <TabPanel
          header="Application"
          headerClassName="p-1 border-b-4 border-blue-300 rounded mr-1 ml-4 hover:border-orange-300"
        >
          <div
            className="w-full p-0 border-2 border-primary"
            style={{ height: "70vh", overflow: "auto" }}
          >
            <div className="p-3 bg-gray-200">
              <div className="text-2xl tracking-tight place-items-center">
                Personal Information
              </div>
            </div>
            <div className="m-0 p-0  border-t-2 border-primary">
              {/* row 1 */}
              <div className="flex w-full">
                <div className="flex w-full border-b-2 border-primary">
                  <div className="flex w-1/3 border-b-0  border-primary place-items-center">
                    <div className="grid flex-grow w-1/4 pl-5">Full Name:</div>
                    <div className="grid border-r-2 border-primary w-3/4 p-1 pl-0">
                      <div className="p-inputgroup flex-1">
                        {userInfo?.userInfo?.Record?.fullname}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 border-primary border-b-0">
                    <div className="flex w-full place-items-center">
                      <div className="grid flex-grow w-2/5 pl-5">
                        E-Mail Address:
                      </div>
                      <div className="grid border-r-2 border-primary w-3/5 p-1 pl-0">
                        <div className="p-inputgroup flex-1">
                          {userInfo?.userInfo?.Record?.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-1/3 place-items-center">
                    <div className="grid flex-grow w-2/5 pl-5">
                      Home Address:
                    </div>
                    <div className="grid w-3/5 p-1 pl-0">
                      <div className="p-inputgroup flex-1">
                        {userInfo?.userInfo?.Record?.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* row 2 */}
              <div className="md:flex lg:flex w-full">
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="flex border-r-2 border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center p-0 m-0">
                        <div className="grid w-2/4 pl-4">City:</div>
                        <div className="grid w-2/4">
                          <div className="p-inputgroup flex-1">
                            {userInfo?.userInfo?.Record?.city}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex border-r-2 border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center">
                        <div className="flex w-full place-items-center">
                          <div className="grid w-2/5 pl-4">State:</div>
                          <div className="grid w-3/5">
                            <div className="p-inputgroup flex-1">
                              {userInfo?.userInfo?.Record?.state}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="flex border-r-2 border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center p-0 m-0">
                        <div className="grid w-2/4 pl-4">Zip Code:</div>

                        <div className="grid w-2/4">
                          <div className="p-inputgroup flex-1">
                            {userInfo?.userInfo?.Record?.zip_code}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-2/4 p-1">
                      <div className="flex w-full place-items-center">
                        <div className="flex w-full place-items-center">
                          <div className="grid w-2/5 pl-4">County:</div>
                          <div className="grid w-3/5">
                            <div className="p-inputgroup flex-1">
                              {userInfo?.userInfo?.Record?.county}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* row 3 */}
              <div className="md:flex lg:flex w-full">
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="flex border-r-2 border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center p-0 m-0">
                        <div className="grid w-2/4 pl-4">Home Phone:</div>
                        <div className="grid w-2/4">
                          <div className="p-inputgroup flex-1">
                            {userInfo?.userInfo?.Record?.home_phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center">
                        <div className="flex w-full place-items-center">
                          <div className="grid w-2/5 pl-4">Cell Phone:</div>

                          <div className="grid w-3/5">
                            <div className="p-inputgroup flex-1">
                              {userInfo?.userInfo?.Record?.cell_phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="flex border-r-2 border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center p-0 m-0">
                        <div className="grid w-2/4 pl-4">Social Security:</div>
                        <div className="grid w-2/4">
                          <div className="p-inputgroup flex-1">
                            {userInfo?.userInfo?.Record?.social_security}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-2/4 p-1">
                      <div className="flex w-full place-items-center">
                        <div className="flex w-full place-items-center">
                          <div className="grid w-2/5 pl-4">DOB:</div>

                          <div className="grid w-3/5">
                            <div className="p-inputgroup flex-1">
                              {userInfo?.userInfo?.Record?.dob}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* POSITION / AVAILABILITY */}
            <div className="p-3 bg-gray-200">
              <div className="text-2xl tracking-tight place-items-center">
                Position / Availability
              </div>
            </div>
            <div className="m-0 p-0 w-full border-t-2 border-primary">
              {/* row 1 */}
              <div className="md:flex lg:flex w-full">
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="flex border-r-2 border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center p-0 m-0">
                        <div className="grid w-2/4 pl-3">Application Date:</div>
                        <div className="grid w-2/4">
                          <div className="p-inputgroup flex-1">
                            {userInfo?.userInfo?.Record?.application_date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center">
                        <div className="flex w-full place-items-center">
                          <div className="grid w-2/5 pl-3">Applying as:</div>

                          <div className="grid w-3/5">
                            <div className="p-inputgroup flex-1">
                              {userInfo?.userInfo?.Record?.applying_as}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="flex border-r-2 border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center p-0 m-0">
                        <div className="grid w-2/4 pl-3">Position applied:</div>
                        <div className="grid w-2/4">
                          <div className="p-inputgroup flex-1">
                            {userInfo?.userInfo?.Record?.position_applied}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-2/4 p-1">
                      <div className="flex w-full place-items-center">
                        <div className="flex w-full place-items-center">
                          <div className="w-3/5 pl-3">
                            Available Start Date:
                          </div>
                          <div className="w-2/5">
                            <div className="p-inputgroup flex-1">
                              {userInfo?.userInfo?.Record?.available_start_date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* row 2 */}
              <div className="md:flex lg:flex w-full">
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-1/4 pl-4">
                      Available For:
                    </div>
                    <div className="grid md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0 m-0 text-right">
                      {userInfo?.userInfo?.Record?.available_for}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-2/4 pl-4">Resume:</div>
                    <div className="grid w-2/4 p-1 pl-0 text-right">
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* row 3 */}
              <div className="md:flex lg:flex w-full">
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid w-3/4 pl-4">
                      Are you currently employed?
                    </div>
                    <div className="grid w-1/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                      {userInfo?.userInfo?.Record?.question1}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-3/4 pl-4">
                      Do you have a valid driver's license?
                    </div>
                    <div className="grid w-1/4 p-1 pl-0 pr-5 text-right">
                      {userInfo?.userInfo?.Record?.question2}
                    </div>
                  </div>
                </div>
              </div>
              {/* row 4 */}
              <div className="md:flex lg:flex w-full">
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid w-4/5 pl-4">
                      If you are currently employed can we contact
                      other employers?
                    </div>
                    <div className="grid w-1/5 border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                      {userInfo?.userInfo?.Record?.question3}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-3/4 pl-4">
                      Do you have a reliable, insured mean of transportation?
                    </div>
                    <div className="grid w-1/4 p-1 pl-0 pr-5 text-right">
                      {userInfo?.userInfo?.Record?.question4}
                    </div>
                  </div>
                </div>
              </div>
              {/* row 5 */}
              <div className="flex w-full">
                <div className="w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid w-5/6 pl-4">
                      Are you willing to travel (locally)in the performing of
                      your duties?
                    </div>
                    <div className="grid w-1/6 border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                      {userInfo?.userInfo?.Record?.question5}
                    </div>
                  </div>
                </div>
                <div className="w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-4/5 pl-4">
                      Have you pleaded guilty to a crime within the last 7
                      years?
                    </div>
                    <div className="grid w-1/5 p-1 pl-0 pr-5 text-right">
                      {userInfo?.userInfo?.Record?.question6}
                    </div>
                  </div>
                </div>
              </div>
              {/* row 6 */}
              <div className="md:flex lg:flex w-full">
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid w-3/4 pl-4">
                      Have you been convicted of a crime within the last 7
                      years?
                    </div>
                    <div className="grid w-1/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                      {userInfo?.userInfo?.Record?.question7}
                    </div>
                  </div>
                </div>
                <div className="w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-4/5 pl-4">
                      Have you been on probation within the last 7 years?
                    </div>
                    <div className="grid w-1/5 p-1 pl-0 pr-5 text-right">
                      {userInfo?.userInfo?.Record?.question8}
                    </div>
                  </div>
                </div>
              </div>
              {/* row 7 */}
              <div className="flex w-full">
                <div className="w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid w-3/4 pl-4">
                      Are you 18 years of age or older?
                    </div>
                    <div className="grid w-1/4 border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                      {userInfo?.userInfo?.Record?.question9}
                    </div>
                  </div>
                </div>
                <div className="w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-11/12 pl-4">
                      Have you ever been accused of or investigatedfor child
                      abuse/neglect?
                    </div>
                    <div className="grid w-1/12 p-1 pl-0 pr-5 text-right">
                      {userInfo?.userInfo?.Record?.question10}
                    </div>
                  </div>
                </div>
              </div>
              {/* row 8 */}
              {userInfo?.userInfo?.Record?.details_questions_in_yes !== "" && (
                <div className="flex w-full">
                  <div className="w-full border-b-2 border-primary">
                    <div className="w-full place-items-center">
                      <div className="w-full pl-4 pr-4">
                        <p className="m-0 text-justify">
                          A plea of guilty or a conviction will not necessarily
                          prevent you from being employed. Factors such as age
                          at time of the offense, seriousness and nature of the
                          offense, and rehabilitation efforts will be taken into
                          account.
                        </p>
                      </div>
                    </div>
                    <div className="w-full place-items-center">
                      <div className="grid w-full p-1 pl-4">
                        <div className="p-inputgroup flex-1">
                          {userInfo?.userInfo?.Record?.details_questions_in_yes}
                        </div>
                      </div>
                    </div>
                    <div className="w-full place-items-center">
                      <div className="w-full pl-4">
                        <p className="m-0 mb-4 text-justify">
                          If the answer to any of these questions is Yes, please
                          give as many details as you can
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* row 9 */}
              <div className="p-3 border-b-2 border-primary">
                <b>Please tell us about any skills that apply to you</b>
              </div>
              <div className="md:flex lg:flex w-full">
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid w-3/4 pl-4">
                      Do you speak any language other than English?
                    </div>
                    <div className="grid w-1/4 md:border-r-2 lg:border-r-2 border-primary p-1 pl-0 pr-5 text-right">
                      {userInfo?.userInfo?.Record?.question11}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid w-3/4 pl-4">
                      Do you know sign language?
                    </div>
                    <div className="grid w-1/4 border-primary p-1 pl-0 pr-5 text-right">
                      {userInfo?.userInfo?.Record?.question12}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b-2 border-primary">
                <div className="flex w-full place-items-center">
                  <div className="grid flex-grow w-1/4 pl-4">
                    List any languages that you speak:
                  </div>
                  <div className="grid w-3/4 p-1 pl-0">
                    <div className="card p-fluid">
                      <div className="p-inputgroup flex-1">
                        {userInfo?.userInfo?.Record?.language_list}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* row 10 */}
              <div className="p-3">
                <b>
                  Please list your areas of highest proficiency, special skills
                  or other items that may contribute to your abilities in
                  performing the above mentioned position:
                </b>
              </div>
              <div className="p-3">
                <div className="card p-fluid">
                  <div className="p-inputgroup flex-1">
                    {userInfo?.userInfo?.Record?.skills_list}
                  </div>
                </div>
              </div>
            </div>
            {/* EDUCATION */}
            <div className="p-3 bg-gray-200 border-t-2 border-primary">
              <div className="text-2xl tracking-tight place-items-center">
                Education
              </div>
            </div>
            <div className="m-0 p-0 w-full border-t-2 border-primary">
              {/* row 1 */}
              <div className="flex w-full">
                <div className="w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-1/4 pl-5">
                      Institution:
                    </div>
                    <div className="grid border-r-2 border-primary w-3/4 p-1 pl-0">
                      <div className="p-inputgroup flex-1">
                        {userInfo?.userInfo?.Record?.education.institution}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-1/2 pl-5">
                      Course of Study:
                    </div>
                    <div className="grid border-r-2 border-primary w-1/2 p-1 pl-0">
                      <div className="p-inputgroup flex-1">
                        {userInfo?.userInfo?.Record?.education.course}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="flex border-r-2 border-primary w-2/4 p-1">
                      <div className="flex w-full place-items-center p-0 m-0">
                        <div className="grid w-2/4 pl-4">Started:</div>
                        <div className="grid w-2/4">
                          <div className="p-inputgroup flex-1">
                            {userInfo?.userInfo?.Record?.education.started}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-2/4 p-1">
                      <div className="flex w-full place-items-center">
                        <div className="flex w-full place-items-center">
                          <div className="grid w-2/4 pl-3">Completed:</div>

                          <div className="grid w-2/4">
                            <div className="p-inputgroup flex-1 pl-2">
                              {userInfo?.userInfo?.Record?.education.completed}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* row 2 */}
              {userInfo?.userInfo?.Record?.education.second_institution !==
                "" && (
                  <div className="flex w-full">
                    <div className="w-2/4 border-b-2 border-primary">
                      <div className="flex w-full place-items-center">
                        <div className="grid flex-grow w-1/4 pl-5">
                          Institution:
                        </div>
                        <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                          <div className="p-inputgroup flex-1">
                            {
                              userInfo?.userInfo?.Record?.education
                                .second_institution
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/4 border-b-2 border-primary">
                      <div className="flex w-full place-items-center">
                        <div className="grid flex-grow w-1/2 pl-5">
                          Course of Study:
                        </div>
                        <div className="grid border-r-2 border-primary w-1/2 p-1 pl-0">
                          <div className="p-inputgroup flex-1">
                            {userInfo?.userInfo?.Record?.education.second_course}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/4 border-b-2 border-primary">
                      <div className="flex w-full place-items-center">
                        <div className="flex border-r-2 border-primary w-2/4 p-1">
                          <div className="flex w-full place-items-center p-0 m-0">
                            <div className="grid w-2/4 pl-4">Started:</div>
                            <div className="grid w-2/4">
                              <div className="p-inputgroup flex-1">
                                {
                                  userInfo?.userInfo?.Record?.education
                                    .second_started
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-2/4 p-1">
                          <div className="flex w-full place-items-center">
                            <div className="flex w-full place-items-center">
                              <div className="grid w-2/4 pl-3">Completed:</div>

                              <div className="grid w-2/4">
                                <div className="p-inputgroup flex-1 pl-2">
                                  {
                                    userInfo?.userInfo?.Record?.education
                                      .second_completed
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              {/* row 3 */}
              {userInfo?.userInfo?.Record?.education.third_institution !==
                "" && (
                  <div className="flex w-full">
                    <div className="w-2/4 border-b-2 border-primary">
                      <div className="flex w-full place-items-center">
                        <div className="grid flex-grow w-1/4 pl-5">
                          Institution:
                        </div>
                        <div className="grid border-r-2 border-primary w-3/4 p-1 pl-0">
                          <div className="p-inputgroup flex-1">
                            {
                              userInfo?.userInfo?.Record?.education
                                .third_institution
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/4 border-b-2 border-primary">
                      <div className="flex w-full place-items-center">
                        <div className="grid flex-grow w-1/2 pl-5">
                          Course of Study:
                        </div>
                        <div className="grid border-r-2 border-primary w-1/2 p-1 pl-0">
                          <div className="p-inputgroup flex-1">
                            {userInfo?.userInfo?.Record?.education.third_course}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/4 border-b-2 border-primary">
                      <div className="flex w-full place-items-center">
                        <div className="flex border-r-2 border-primary w-2/4 p-1">
                          <div className="flex w-full place-items-center p-0 m-0">
                            <div className="grid w-2/4 pl-4">Started:</div>
                            <div className="grid w-2/4">
                              <div className="p-inputgroup flex-1">
                                {
                                  userInfo?.userInfo?.Record?.education
                                    .third_started
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-2/4 p-1">
                          <div className="flex w-full place-items-center">
                            <div className="flex w-full place-items-center">
                              <div className="grid w-2/4 pl-3">Completed:</div>
                              <div className="grid w-2/4">
                                <div className="p-inputgroup flex-1 pl-2">
                                  {
                                    userInfo?.userInfo?.Record?.education
                                      .third_completed
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            {/* EMPLOYMENT HISTORY */}
            <div className="p-3 bg-gray-200">
              <div className="text-2xl tracking-tight place-items-center">
                Employment History
              </div>
            </div>
            <div className="m-0 p-0 w-full border-t-2 border-primary">
              {/* EMPLOYMENT HISTORY 1 */}

              {/* EMPLOYMENT HISTORY 2 */}
              <div className="flex w-full border-primary">
                <div className="w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-1/4 pl-5">Employer:</div>
                    <div className="grid border-r-2 border-primary w-3/4 p-1 pl-0">
                      <div className="p-inputgroup flex-1">
                        {
                          userInfo?.userInfo?.Record?.employment_history
                            .second_employer
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-1/4 pl-5">Address:</div>
                    <div className="grid  w-3/4 p-1 pl-0">
                      <div className="p-inputgroup flex-1">
                        {
                          userInfo?.userInfo?.Record?.employment_history
                            .second_address
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* row 2 */}
              <div className="flex w-full">
                <div className="w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="w-2/5 pl-5">
                      Supervisor or contact person:
                    </div>
                    <div className="grid border-r-2 border-primary w-3/5 p-1 pl-0">
                      <div className="p-inputgroup flex-1">
                        {
                          userInfo?.userInfo?.Record?.employment_history
                            .second_supervisor
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-1/4 pl-5">
                      Phone Number:
                    </div>
                    <div className="grid  w-3/4 p-1 pl-0">
                      <div className="p-inputgroup flex-1">
                        {
                          userInfo?.userInfo?.Record?.employment_history
                            .second_phone
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-2/5 pl-5">
                      Period you worked:
                    </div>
                    <div className="grid border-r-2 border-primary w-3/5 p-1 pl-0">
                      <div className="p-inputgroup flex-1">
                        {
                          userInfo?.userInfo?.Record?.employment_history
                            .second_period
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-2/4 border-b-2 border-primary">
                  <div className="flex w-full place-items-center">
                    <div className="grid flex-grow w-1/4 pl-5">
                      Position Held:
                    </div>
                    <div className="grid w-3/4 p-1 pl-0">
                      <div className="p-inputgroup flex-1">
                        {
                          userInfo?.userInfo?.Record?.employment_history
                            .second_position
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full place-items-center">
                <div className="grid w-full p-1 pl-0">
                  <div className="w-full">
                    <div className="w-full place-items-center">
                      <div className="w-full pl-5">
                        <p className="m-0 text-justify">Reason for leaving:</p>
                      </div>
                    </div>
                    <div className="w-full place-items-center">
                      <div className="grid w-full p-1 pl-5">
                        <div className="p-inputgroup flex-1">
                          {
                            userInfo?.userInfo?.Record?.employment_history
                              .second_reason
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <ScrollTop target="parent" className="bg-secondary" /> */}
          </div>
        </TabPanel>
        <TabPanel
          header="Services"
          headerClassName="border-b-4 border-blue-300 p-1 rounded mr-2 hover:border-orange-300"
        >
          <div
            className="w-full p-0"
            style={{ height: "70vh", overflow: "auto" }}
          >
            <div className="w-full">
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("service_trainer_provider");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .service_trainer_provider
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .service_trainer_provider
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>10 Hours from FCB</b>
                </div>
                <div className="stat-title">
                  <i>Accredited Trainer Provider </i>
                </div>
                <div className="stat-desc text-secondary flex">
                  Every Year
                  {userInfo?.userInfo?.Record?.necessary_documents
                    .service_trainer_provider_date !== "" && (
                      <div className="flex">
                        -{" "}
                        <i>
                          Date obtained:{" "}
                          {
                            userInfo?.userInfo?.Record?.necessary_documents.service_trainer_provider_date
                          }
                        </i>
                        &nbsp;expires in: &nbsp;{" "}
                        <Countdown
                          date={
                            userInfo?.userInfo?.Record?.necessary_documents.service_trainer_provider_date
                              .split("/")
                              .join("-") ?? "01-01-2024"
                          }
                          hour={0}
                          minutes={0}
                          seconds={0}
                          summ={1}
                          size="12px"
                        />
                      </div>
                    )}
                </div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("service_cpr_aed");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .service_cpr_aed
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .service_cpr_aed
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title ">
                  <b>CPR / AED &nbsp;</b>
                </div>
                <div className="stat-desc text-secondary flex">
                  Every 2 Years
                  {userInfo?.userInfo?.Record?.necessary_documents.service_cpr_aed_date !== ""
                    &&
                    <div className="flex">
                      -
                      <i>Date obtained:
                        {userInfo?.userInfo?.Record?.necessary_documents.service_cpr_aed_date}</i>
                      &nbsp;expires in: &nbsp;
                      <Countdown date={userInfo?.userInfo?.Record?.necessary_documents.service_cpr_aed_date.split("/").join("-")
                        ?? "01-01-2024"} hour={0} minutes={0} seconds={0} summ={2} size='12px' />
                    </div>
                  }
                </div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("service_osha");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .service_osha
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .service_osha
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>OSHA</b>
                </div>
                <div className="stat-title">
                  <i>
                    (Occupational Exposure to <br /> Blood Borne Pathogens)
                  </i>
                </div>
                <div className="stat-desc text-secondary flex">
                  Every 3 Years
                  {userInfo?.userInfo?.Record?.necessary_documents
                    .service_osha_date !== "" && (
                      <div className="flex">
                        -{" "}
                        <i>
                          Date obtained:{" "}
                          {
                            userInfo?.userInfo?.Record?.necessary_documents
                              .service_osha_date
                          }
                        </i>
                        &nbsp;expires in: &nbsp;{" "}
                        <Countdown
                          date={
                            userInfo?.userInfo?.Record?.necessary_documents.service_osha_date
                              .split("/")
                              .join("-") ?? "01-01-2024"
                          }
                          hour={0}
                          minutes={0}
                          seconds={0}
                          summ={3}
                          size="12px"
                        />
                      </div>
                    )}
                </div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("service_infection_control");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .service_infection_control
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .service_infection_control
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Infection Control</b>
                </div>
                <div className="stat-title">
                  <i>(Trainflorida)</i>
                </div>
                <div className="stat-desc text-secondary flex">
                  Every 3 Years
                  {userInfo?.userInfo?.Record?.necessary_documents
                    .service_infection_control_date !== "" && (
                      <div className="flex">
                        -{" "}
                        <i>
                          Date obtained:{" "}
                          {
                            userInfo?.userInfo?.Record?.necessary_documents
                              .service_infection_control_date
                          }
                        </i>
                        &nbsp;expires in: &nbsp;{" "}
                        <Countdown
                          date={
                            userInfo?.userInfo?.Record?.necessary_documents.service_infection_control_date
                              .split("/")
                              .join("-") ?? "01-01-2024"
                          }
                          hour={0}
                          minutes={0}
                          seconds={0}
                          summ={3}
                          size="12px"
                        />
                      </div>
                    )}
                </div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("service_hiv_aids");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .service_hiv_aids
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .service_hiv_aids
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>HIV / AIDS</b>
                </div>
                <div className="stat-title">
                  <i>Trainflorida</i>
                </div>
                <div className="stat-desc text-secondary">Only 1 Time</div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("service_domestic_violence");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .service_domestic_violence
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .service_domestic_violence
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title ">
                  <b>Domestic Violence, Substance Abuse</b>
                </div>
                <div className="stat-title ">
                  <i>Mental Health Disorder and Child Abuse</i>
                </div>
                <div className="stat-desc text-secondary">only 1 Time</div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("service_fars_cfars");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .service_fars_cfars
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .service_fars_cfars
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>FARS / CFARS</b>
                </div>
                <div className="stat-desc text-secondary">Only 1 Time</div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("service_hippa");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .service_hippa
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .service_hippa
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>HIPPA</b>
                </div>
                <div className="stat-desc text-secondary">Only 1 Time</div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("service_access_civil_rights");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .service_access_civil_rights
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .service_access_civil_rights
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Access Civil Rights</b>
                </div>
                <div className="stat-desc text-secondary">Only 1 Time</div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("service_deaf_hard");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .service_deaf_hard
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .service_deaf_hard
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title ">
                  <b>Service Delivery</b>
                </div>
                <div className="stat-title ">
                  <i>for the Deaf or Hard-of-Hearing</i>
                </div>
                <div className="stat-desc text-secondary">only 1 Time</div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("service_security_awareness");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .service_security_awareness
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .service_security_awareness
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Security Awarenes</b>
                </div>

                <div className="stat-desc text-secondary">Only 1 Time</div>
              </div>
            </div>

            <ScrollTop target="parent" className="bg-secondary" />
          </div>
        </TabPanel>
        <TabPanel
          header="Personal documents and other information"
          headerClassName="border-b-4 border-blue-300 p-1 rounded mr-2 hover:border-orange-300"
        >
          <div
            className="w-full p-0"
            style={{ height: "70vh", overflow: "auto" }}
          >
            <div className="w-full">
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("resume");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents.resume
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents.resume
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Resume</b>
                </div>
                <div className="stat-desc text-secondary">Only 1 Time</div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("diploma_transcripts");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .diploma_transcripts
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .diploma_transcripts
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title ">
                  <b>Diploma / Transcripts</b>
                </div>
                <div className="stat-desc text-secondary">Only 1 Time</div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("licenses_certifications");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .licenses_certifications
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .licenses_certifications
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Licenses / Certifications</b>
                </div>
                <div className="stat-desc text-secondary">Only 1 Time</div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("course_fcb");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents.course_fcb
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .course_fcb
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Course FCB</b>
                </div>
                <div className="stat-desc text-secondary">Only 1 Time</div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("other_medicaid_certification");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .other_medicaid_certification
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .other_medicaid_certification
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Medicaid Certification</b>
                </div>
                <div className="stat-desc text-secondary">If applicable</div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("other_medicaid_provider");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .other_medicaid_provider
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .other_medicaid_provider
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Medicaid Provider and NPI Number</b>
                </div>
                <div className="stat-desc text-secondary">If applicable</div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("other_drivers_license");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .other_drivers_license
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .other_drivers_license
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Driver’s License or Valid Picture ID</b>
                </div>
                <div className="stat-desc text-secondary"></div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("other_social_security_card");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .other_social_security_card
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .other_social_security_card
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Social Security Card</b>
                </div>
                <div className="stat-desc text-secondary"></div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("other_proof_legal_status");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .other_proof_legal_status
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .other_proof_legal_status
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Proof of Legal Status</b>
                </div>
                <div className="stat-title">
                  <i>
                    US Passport, Resident Card,Employment Authorization, etc.
                  </i>
                </div>
                <div className="stat-desc text-secondary"></div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("other_employee_id_badge");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .other_employee_id_badge
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .other_employee_id_badge
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Employee ID Badge</b>
                </div>
                <div className="stat-desc text-secondary"></div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("other_vehicle_registration");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .other_vehicle_registration
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .other_vehicle_registration
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Vehicle Registration</b>
                </div>
                <div className="stat-desc text-secondary">If applicable</div>
              </div>
              &nbsp;
              <div
                className="stat bg-gray-100 hover:bg-gray-200 rounded-md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("other_proof_insurance");
                }}
              >
                <div className="stat-figure text-secondary">
                  <div
                    className={classNames(
                      "avatar",
                      userInfo?.userInfo?.Record?.necessary_documents
                        .other_proof_insurance
                        ? "online"
                        : "offline"
                    )}
                  >
                    <div className="w-16">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classNames(
                          "w-16 h-16",
                          userInfo?.userInfo?.Record?.necessary_documents
                            .other_proof_insurance
                            ? "text-warning"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value"></div>
                <div className="stat-title">
                  <b>Proof of Insurance</b>
                </div>
                <div className="stat-desc text-secondary">If applicable</div>
              </div>
            </div>
            <ScrollTop target="parent" className="bg-secondary" />
          </div>
        </TabPanel>
        <TabPanel
          header="Employment Verifications"
          headerClassName="border-b-4 border-blue-300 p-1 rounded mr-2 hover:border-orange-300"
        >
          <div
            className="w-full p-0"
            style={{ height: "70vh", overflow: "auto" }}
          >
            <div className="w-full">
              <Fieldset legend="Employment 1" toggleable>
                <div className="border-2 border-primary">
                  <div className="md:flex lg:flex w-full">
                    <div className="w-full border-b-2 border-primary">
                      <div className="flex w-full place-items-center">
                        <div className="grid flex-grow w-1/4 pl-5">
                          Name of Company/Organization:
                        </div>
                        <div className="grid w-3/4 p-1 pl-0">
                          <div className="p-inputgroup flex-1">
                            {
                              userInfo?.userInfo?.Record?.employment_history
                                .employer
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* row 2 */}
                  <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                      <div className="flex w-full place-items-center">
                        <div className="grid flex-grow w-1/4 pl-5">
                          Contact person:
                        </div>
                        <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                          <div className="p-inputgroup flex-1">
                            {
                              userInfo?.userInfo?.Record?.employment_history
                                .supervisor
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                      <div className="flex w-full place-items-center">
                        <div className="grid flex-grow w-1/4 pl-5">Phone:</div>
                        <div className="grid  w-3/4 p-1 pl-0">
                          <div className="p-inputgroup flex-1">
                            {
                              userInfo?.userInfo?.Record?.employment_history
                                .phone
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:flex lg:flex w-full">
                    <div className="w-full md:w-2/4 lg:w-2/4 md:border-b-0 lg:border-b-0 border-b-2 border-primary">
                      <div className="flex w-full place-items-center">
                        <div className="grid flex-grow w-1/4 pl-5">
                          Period you worked:
                        </div>
                        <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                          <div className="p-inputgroup flex-1">
                            {
                              userInfo?.userInfo?.Record?.employment_history
                                .period
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4">
                      <div className="flex w-full place-items-center">
                        <div className="grid flex-grow w-1/4 pl-5">
                          Position Held:
                        </div>
                        <div className="grid  w-3/4 p-1 pl-0">
                          <div className="p-inputgroup flex-1">
                            {
                              userInfo?.userInfo?.Record?.employment_history
                                .position
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />

                <b className="border-b border-primary">FOR OFFICE USE ONLY</b>
                <br />
                <br />
                <b>Check a response to each question below</b>
                <hr />
                {/* QUESTION1 */}
                <div className="w-full flex place-items-center bg-gray-100 border-b pl-3">
                  <div className="w-1/4">Quality of work</div>
                  <div className="w-3/4">
                    <SelectButton
                      value={question1}
                      onChange={(e) => {
                        setQuestion1(e.target.value);
                        // handleChangeFormValues("available_for", e.target.value ?? "");
                        // handleButtonClick();
                      }}
                      options={AvailableForOptions}
                      className="input input-ghost w-full text-right"
                    />
                  </div>
                </div>
                {/* QUESTION2 */}
                <div className="w-full flex place-items-center border-b pt-1 pl-3">
                  <div className="w-1/4">Knowledge of work</div>
                  <div className="w-3/4">
                    <SelectButton
                      value={question2}
                      onChange={(e) => {
                        setQuestion2(e.target.value);
                        // handleChangeFormValues("available_for", e.target.value ?? "");
                        // handleButtonClick();
                      }}
                      options={AvailableForOptions}
                      className="input input-ghost w-full text-right"
                    />
                  </div>
                </div>
                {/* QUESTION3 */}
                <div className="w-full flex place-items-center bg-gray-100 border-b pt-1 pl-3">
                  <div className="w-1/4">
                    Ability to work with minimal supervision
                  </div>
                  <div className="w-3/4">
                    <SelectButton
                      value={question3}
                      onChange={(e) => {
                        setQuestion3(e.target.value);
                      }}
                      options={AvailableForOptions}
                      className="input input-ghost w-full text-right"
                    />
                  </div>
                </div>
                {/* QUESTION4 */}
                <div className="w-full flex place-items-center border-b pt-1 pl-3">
                  <div className="w-1/4">Initiative</div>
                  <div className="w-3/4">
                    <SelectButton
                      value={question4}
                      onChange={(e) => {
                        setQuestion4(e.target.value);
                      }}
                      options={AvailableForOptions}
                      className="input input-ghost w-full text-right"
                    />
                  </div>
                </div>
                {/* QUESTION5 */}
                <div className="w-full flex place-items-center bg-gray-100 border-b pt-1 pl-3">
                  <div className="w-1/4">Teamwork / Relationships</div>
                  <div className="w-3/4">
                    <SelectButton
                      value={question5}
                      onChange={(e) => {
                        setQuestion5(e.target.value);
                      }}
                      options={AvailableForOptions}
                      className="input input-ghost w-full text-right"
                    />
                  </div>
                </div>
                {/* QUESTION6 */}
                <div className="w-full flex place-items-center border-b pt-1 pl-3">
                  <div className="w-1/4">Leadership</div>
                  <div className="w-3/4">
                    <SelectButton
                      value={question6}
                      onChange={(e) => {
                        setQuestion6(e.target.value);
                      }}
                      options={AvailableForOptions}
                      className="input input-ghost w-full text-right"
                    />
                  </div>
                </div>
                {/* QUESTION7 */}
                <div className="w-full flex place-items-center bg-gray-100 border-b pt-1 pl-3">
                  <div className="w-1/4">Reliability / Dependability</div>
                  <div className="w-3/4">
                    <SelectButton
                      value={question7}
                      onChange={(e) => {
                        setQuestion7(e.target.value);
                      }}
                      options={AvailableForOptions}
                      className="input input-ghost w-full text-right"
                    />
                  </div>
                </div>
                {/* QUESTION8 */}
                <div className="w-full flex place-items-center border-b pt-1 pl-3">
                  <div className="w-1/4">Oral / Written Communication</div>
                  <div className="w-3/4">
                    <SelectButton
                      value={question8}
                      onChange={(e) => {
                        setQuestion8(e.target.value);
                      }}
                      options={AvailableForOptions}
                      className="input input-ghost w-full text-right"
                    />
                  </div>
                </div>
                {/* QUESTION9 */}
                <div className="w-full flex place-items-center bg-gray-100 border-b pt-1 pl-3">
                  <div className="w-1/4">Time Management</div>
                  <div className="w-3/4">
                    <SelectButton
                      value={question9}
                      onChange={(e) => {
                        setQuestion9(e.target.value);
                      }}
                      options={AvailableForOptions}
                      className="input input-ghost w-full text-right"
                    />
                  </div>
                </div>
                {/* QUESTION10 */}
                <div className="w-full flex place-items-center border-b pt-1 pl-3">
                  <div className="w-1/4">Judgment</div>
                  <div className="w-3/4">
                    <SelectButton
                      value={question10}
                      onChange={(e) => {
                        setQuestion10(e.target.value);
                      }}
                      options={AvailableForOptions}
                      className="input input-ghost w-full text-right"
                    />
                  </div>
                </div>
                {/* QUESTION11 */}
                <div className="w-full flex place-items-center bg-gray-100 border-b pt-1 pl-3">
                  <div className="w-1/4">Attendance / Punctuality</div>
                  <div className="w-3/4">
                    <SelectButton
                      value={question11}
                      onChange={(e) => {
                        setQuestion11(e.target.value);
                      }}
                      options={AvailableForOptions}
                      className="input input-ghost w-full text-right"
                    />
                  </div>
                </div>
                {/* QUESTION12 */}
                <div className="w-full flex place-items-center border-b pt-1 pl-3">
                  <div className="w-1/4">Workplace conduct / Ethic</div>
                  <div className="w-3/4">
                    <SelectButton
                      value={question12}
                      onChange={(e) => {
                        setQuestion12(e.target.value);
                      }}
                      options={AvailableForOptions}
                      className="input input-ghost w-full text-right"
                    />
                  </div>
                </div>
                {/* QUESTION13 */}
                <div className="w-full flex place-items-center bg-gray-100 border-b pt-1 pl-3">
                  <div className="w-1/4">Supervisory Skills</div>
                  <div className="w-3/4">
                    <SelectButton
                      value={question13}
                      onChange={(e) => {
                        setQuestion13(e.target.value);
                      }}
                      options={AvailableForOptions}
                      className="input input-ghost w-full text-right"
                    />
                  </div>
                </div>
              </Fieldset>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};
type Props = {
  relad(): void;
  uid: string;
};
export { ApplicationUserinfo };
