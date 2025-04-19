import { useState, useEffect, useRef } from "react";

import { classNames } from "primereact/utils";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';


import { Dialog } from "primereact/dialog";

import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";

import { Block } from '../../commons/component/block';
import { VoiceRecorder } from "../../commons"

import { Edit } from "./view"

// -- New Struct
import { useCoreRequestEditSCMSure, useCoreRequestAddSCMSure } from "../../profile/hooks";
import { Active, ServiceCM, FromEditScmSure, Client, Sure } from "../../../models";

// TODO: Este fichero ahi que separarlo en componentes

export const Authorizations = ({ active, scm, relad, client }: Props) => {

  const { addRequestEditSure } = useCoreRequestEditSCMSure(relad);
  const { addRequestAddSure } = useCoreRequestAddSCMSure(relad);

  const apiUrlStatic = process.env.REACT_APP_STATIC ?? "no API url";
  const [visibleBtnSave, setVisibleBtnSave] = useState<boolean>(false);
  const stepperRef = useRef<null | any>(null);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [insuance, setInsuance] = useState<string>("Sunshine Health");
  // const [sureActive, setSureActive] = useState<Sure|undefined>(undefined);
  const [sure, setSure] = useState<Sure | undefined>(undefined);

  const [activeIndex, setActiveIndex] = useState(0);
  const itemsTab: MenuItem[] = [
    { label: 'Authorizations List', icon: 'pi pi-list' },
    { label: 'Add Insurance', icon: 'pi pi-folder-open' },
  ];

  const selectInsurance = (sure: string) => {
    setInsuance(sure);
    stepperRef.current?.nextCallback();
  }

  // -----------------
  const [requestEditSure, setRequestEditSure] = useState<FromEditScmSure>({
    id: 0,
    plan_name: "",
    plan_id: "",
    auth: false,
    deny: false,
    auth_date_start: "",
    auth_date_end: "",
    unit: 0,
    time_range: 0,
    active: true,
  });

  const handleChangeFormrequestEditSure = <T extends string | number | boolean>(
    name: keyof FromEditScmSure,
    value: T
  ) => {
    setRequestEditSure((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setVisibleBtnSave(true);
    // setSaveInformationClient(true);
    return requestEditSure;
  };// -----------------
  const [requestAddSure, setRequestAddSure] = useState<FromEditScmSure>({
    id: scm?.id || 0,
    plan_name: "",
    plan_id: "",
    auth: false,
    deny: false,
    auth_date_start: "",
    auth_date_end: "",
    unit: 0,
    time_range: 0,
    active: true,
  });

  const handleAddFormRequestSure = <T extends string | number | boolean>(
    name: keyof FromEditScmSure,
    value: T
  ) => {
    setRequestAddSure((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // setVisibleBtnSave(true);
    // setSaveInformationClient(true);
    return requestAddSure;
  };
  // -----------------
  const handleButtonClick = () => {
    addRequestEditSure({
      requestEditScmSure: requestEditSure
    });
    setVisibleBtnSave(false);
    relad();
  };

  const handleButtonSave = () => {
    addRequestAddSure({
      requestAddScmSure: requestAddSure
    });
    setActiveIndex(0);
    relad();
  };
  // -----------------
  const headerAuth = (title) => {
    return (
      <div className="flex w-full place-items-center">
        <div className="flex w-1/3">
          <div className="pl-2 pr-2">
            <b>{title}</b>
          </div>
        </div>
        <div className="w-2/3 text-right">
          {/* <i
            className="pi pi-save hover:text-red-500  cursor-pointer mr-2"
            onClick={() => {
              // delEvent({ id: eventActive?.ID ?? 0 })
              // reloadMyEvents();
              // setVisibleEventShow(false);
            }}
          /> */}
          {/* <i
            className="pi pi-file-edit hover:text-blue-500  cursor-pointer"
            onClick={() => {
              // setNoteHelp(true);
            }}
          /> */}
        </div>
      </div>
    )
  };
  // -----------------
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    (scm?.sure.length || 0) === 0 && setActiveIndex(1);
    scm?.sure.map((insurance) => {
      if (insurance.active) {
        handleChangeFormrequestEditSure("id", insurance.ID);
        handleChangeFormrequestEditSure("plan_name", insurance.plan_name);
        handleChangeFormrequestEditSure("plan_id", insurance.plan_id);
        handleChangeFormrequestEditSure("auth", insurance.auth);
        handleChangeFormrequestEditSure("deny", insurance.deny);
        handleChangeFormrequestEditSure("auth_date_start", insurance.auth_date_start);
        handleChangeFormrequestEditSure("auth_date_end", insurance.auth_date_end);
        handleChangeFormrequestEditSure("unit", insurance.unit);
        handleChangeFormrequestEditSure("active", insurance.active);



        if (insurance.plan_name === "Sunshine Health") { setInsuance("sunshine") }
        if (insurance.plan_name === "Cigna") { setInsuance("cigna") }
        if (insurance.plan_name === "Molina Healthcare") { setInsuance("molina") }
        if (insurance.plan_name === "Aetna Better Health") { setInsuance("aetna") }
        if (insurance.plan_name === "Aetna Health Plan") { setInsuance("aetnada") }
        if (insurance.plan_name === "Wellcare Health Plan") { setInsuance("wellcare") }
        if (insurance.plan_name === "Humana") { setInsuance("humana") }
        if (insurance.plan_name === "HealhtSun Health Plan") { setInsuance("healthsun") }
        if (insurance.plan_name === "CarePlus Health Plan") { setInsuance("careplus") }
        if (insurance.plan_name === "Devoted Health Plan") { setInsuance("fcc") }
        if (insurance.plan_name === "Simply Healthcare") { setInsuance("fcc") }



        setVisibleBtnSave(false);
      }
    });
  }, [scm]);


  return (

    <div className="card flex justify-content-center">
      <div className="w-full p-2 bg-gray-50">
        <TabMenu model={itemsTab} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
      </div>
      {activeIndex === 0 && <div className="w-full border-black border">
        {(scm?.sure.length || 0) > 0 ? (
          <div className="w-full">
            <div className="w-full flex border-t border-black" style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
              <div className="w-1/6 border-black border-r text-center">Insurance Plan Name</div>
              <div className="w-1/6 border-black border-r text-center">Insurance Plan ID</div>
              <div className="w-1/6 border-black border-r text-center">Start Date</div>
              <div className="w-1/6 border-black border-r text-center">End Date</div>
              <div className="w-1/6 border-black border-r text-center">Units</div>
              <div className="w-1/6 text-center">Options</div>
            </div>
            {scm?.sure.map((insurance) => {
              return (
                <div>
                  {insurance.active ? (
                    <div className="w-full flex border-t border-black items-center">

                      <div className="w-1/6 border-black border-r text-center">
                        <Block
                          active={insurance.active}
                        >
                          <input
                            type="text"
                            value={insurance.plan_name}
                            className="input input-ghost border-0 w-full text-center"
                          />
                        </Block>
                      </div>
                      <div className="w-1/6 border-black border-r text-center">
                        <InputMask
                          id="plan_id"
                          // BUG: Arreglar aqui llega un array
                          value={requestEditSure.plan_id === "" ? insurance.plan_id : requestEditSure.plan_id}
                          onChange={(e: InputMaskChangeEvent) => handleChangeFormrequestEditSure("plan_id", e.target.value ?? "")}
                          mask="99999"
                          placeholder="Type number"
                          className="input input-ghost w-full text-center"
                          style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                        />
                      </div>
                      <div className="w-1/6 border-black border-r text-center">
                        <InputMask
                          id="start_date"
                          value={requestEditSure.auth_date_start === "" ? insurance.auth_date_start : requestEditSure.auth_date_start}
                          mask="99/99/9999"
                          placeholder="Start Date"
                          onChange={(e: InputMaskChangeEvent) => handleChangeFormrequestEditSure("auth_date_start", e.target.value ?? "")}
                          className="input input-ghost border-0 w-full text-center"
                          style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                        />
                      </div>
                      <div className="w-1/6 border-black border-r text-center">
                        <InputMask
                          id="end_date"
                          mask="99/99/9999"
                          placeholder="End Date"
                          value={requestEditSure.auth_date_end === "" ? insurance.auth_date_end : requestEditSure.auth_date_end}
                          onChange={(e: InputMaskChangeEvent) => handleChangeFormrequestEditSure("auth_date_end", e.target.value ?? "")}
                          className="input input-ghost border-0 w-full text-center"
                          style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                        />
                      </div>
                      <div className="w-1/6 border-black border-r text-center">
                        <InputText
                          id="units"
                          value={requestEditSure.unit.toString()}
                          onChange={(e) => handleChangeFormrequestEditSure("unit", Number(e.target.value) ?? 0)}
                          placeholder="Type number"
                          className="input input-ghost w-full text-center"
                          style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                        />
                      </div>
                      <div className="w-1/6 text-center flex">
                        <div className="w-full">
                          {visibleBtnSave && (active?.activeUser?.User?.roll === "TCMS" || active?.activeUser?.User?.roll === "QA") && <i className="pi pi-save hover:text-secondary animate-pulse mr-2" onClick={() => { handleButtonClick(); }} />}

                          <i className={classNames(
                            "pi mr-2 hover:text-secondary",
                            insurance.active ? "pi-check-circle text-green-400" : "pi-times-circle text-red-500"
                          )}></i>
                          <i className="pi pi-folder hover:text-secondary" onClick={() => {
                            setVisibleEdit(true);
                            setSure(insurance);
                            if (insurance.plan_name === "Sunshine Health") { setInsuance("Sunshine Health") }
                            if (insurance.plan_name === "Cigna") { setInsuance("Cigna") }
                            if (insurance.plan_name === "Molina Healthcare") { setInsuance("Molina Healthcare") }
                            if (insurance.plan_name === "Aetna Better Health") { setInsuance("Aetna Better Health") }
                            if (insurance.plan_name === "Aetna Health Plan") { setInsuance("Aetna Health Plan") }
                            if (insurance.plan_name === "Wellcare Health Plan") { setInsuance("Wellcare Health Plan") }
                            if (insurance.plan_name === "Simply Healthcare") { setInsuance("Simply Healthcare") }
                            if (insurance.plan_name === "Humana") { setInsuance("Humana") }
                            if (insurance.plan_name === "HealthSun Health Plan") { setInsuance("HealthSun Health Plan") }
                            if (insurance.plan_name === "CarePlus Health Plan") { setInsuance("CarePlus Health Plan") }
                            if (insurance.plan_name === "Free Medicaid") { setInsuance("Free Medicaid") }
                          }} />
                          {active?.activeUser?.User?.roll !== "TCM" &&
                            <i className={classNames(
                              "pi ml-2 hover:text-secondary",
                              "pi-trash text-red-500"
                            )}></i>
                          }
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex border-t border-black items-center">
                      <div className="w-1/6 border-black border-r text-center">
                        <Block
                          active={!insurance.active}
                          copy
                        >
                          <input
                            type="text"
                            value={insurance.plan_name}
                            className="input input-ghost border-0 w-full text-center"
                          />
                        </Block>
                      </div>
                      <div className="w-1/6 border-black border-r text-center">
                        <Block
                          active={!insurance.active}
                          copy
                        >
                          <InputMask
                            id="plan_id"
                            value={insurance.plan_id}
                            mask="99999"
                            placeholder="Type number"
                            className="input input-ghost w-full text-center border-0"
                          />
                        </Block>
                      </div>
                      <div className="w-1/6 border-black border-r text-center">
                        <Block
                          active={!insurance.active}
                          copy
                        >
                          <InputMask
                            id="start_date"
                            mask="99/99/9999"
                            placeholder="Start Date"
                            value={insurance.auth_date_start}
                            className="input input-ghost border-0 w-full text-center"
                          />
                        </Block>
                      </div>
                      <div className="w-1/6 border-black border-r text-center">
                        <Block
                          active={!insurance.active}
                          copy
                        >
                          <InputMask
                            id="end_date"
                            mask="99/99/9999"
                            placeholder="End Date"
                            value={insurance.auth_date_end}
                            className="input input-ghost border-0 w-full text-center"
                          />
                        </Block>
                      </div>
                      <div className="w-1/6 border-black border-r text-center">
                        <Block
                          active={!insurance.active}
                          copy
                        >
                          <InputText
                            id="units"
                            value={insurance.unit.toString()}
                            placeholder="units"
                            className="input input-ghost w-full text-center border-0"
                          />
                        </Block>
                      </div>
                      <div className="w-1/6 text-center flex">
                        <div className="w-full">
                          <i className={classNames(
                            "pi mr-2",
                            insurance.active ? "pi-check-circle text-green-400" : "pi-times-circle text-red-500"
                          )}></i>
                          <i className="pi pi-folder hover:text-secondary"
                            onClick={() => {
                              setVisibleEdit(true);
                              setSure(insurance);
                              if (insurance.plan_name === "Sunshine Health") { setInsuance("Sunshine Health") }
                              if (insurance.plan_name === "Cigna") { setInsuance("Cigna") }
                              if (insurance.plan_name === "Molina Healthcare") { setInsuance("Molina Healthcare") }
                              if (insurance.plan_name === "Aetna Better Health") { setInsuance("Aetna Better Health") }
                              if (insurance.plan_name === "Aetna Health Plan") { setInsuance("Aetna Health Plan") }
                              if (insurance.plan_name === "Wellcare Health Plan") { setInsuance("Wellcare Health Plan") }
                              if (insurance.plan_name === "Simply Healthcare") { setInsuance("Simply Healthcare") }
                              if (insurance.plan_name === "Humana") { setInsuance("Humana") }
                              if (insurance.plan_name === "HealthSun Health Plan") { setInsuance("HealthSun Health Plan") }
                              if (insurance.plan_name === "CarePlus Health Plan") { setInsuance("CarePlus Health Plan") }
                              if (insurance.plan_name === "Free Medicaid") { setInsuance("Free Medicaid") }
                            }}
                          />
                          {active?.activeUser?.User?.roll !== "TCM" &&
                            <i className={classNames(
                              "pi ml-2 hover:text-secondary",
                              "pi-trash text-red-500"
                            )}></i>
                          }
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full">
            Not insurance
          </div>
        )}
      </div>}

      {activeIndex === 1 &&
        <Stepper ref={stepperRef}>
          <StepperPanel header="Select insurance">
            <div className="flex-column h-12rem">
              <div className=" border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">

                <div className="w-full items-center text-center align-items-center">
                  <div className="w-full flex items-center justify-center">
                    {/* sunshine */}
                    <div className="card bg-base-100 w-1/5 sm:w-full h-60 shadow-xl hover:shadow-orange-200 m-3" onClick={() => { selectInsurance("Sunshine Health"); handleAddFormRequestSure("plan_name", "Sunshine Health"); }}>
                      <figure className="px-10 pt-10">
                        <img
                          src={`${apiUrlStatic}/static/media/sunshine-logo.png`}
                          alt="sunshine"
                          className="rounded-xl w-2/3" />
                      </figure>
                      <div className="card-body items-center text-center">
                        {/* <h2 className="card-title">sunshine</h2> */}
                        <p>AUTHORIZATION FORM</p>
                        <div className="card-actions">

                        </div>
                      </div>
                    </div>
                    {/* cigna */}
                    <div className="card bg-base-100 w-1/5 sm:w-full h-60 shadow-xl hover:shadow-orange-200 m-3" onClick={() => { selectInsurance("Cigna"); handleAddFormRequestSure("plan_name", "Cigna"); }}>
                      <figure className="px-10 pt-10">
                        <img
                          src={`${apiUrlStatic}/static/media/cigna.png`}
                          alt="cigna"
                          className="rounded-xl w-2/3" />
                      </figure>
                      <div className="card-body items-center text-center">
                        {/* <h2 className="card-title">Shoes!</h2> */}
                        <p>AUTHORIZATION FORM</p>
                        <div className="card-actions">

                        </div>
                      </div>
                    </div>
                    {/* Molina */}
                    <div className="card bg-base-100 w-1/5 sm:w-full h-60 shadow-xl hover:shadow-orange-200 m-3" onClick={() => { selectInsurance("Molina Healthcare"); handleAddFormRequestSure("plan_name", "Molina Healthcare"); }}>
                      <figure className="px-10 pt-10">
                        <img
                          src={`${apiUrlStatic}/static/media/molinaLogo-notag.png`}
                          alt="Molina"
                          className="rounded-xl w-2/3" />
                      </figure>
                      <div className="card-body items-center text-center">

                        <p>AUTHORIZATION FORM</p>
                        <div className="card-actions">

                        </div>
                      </div>
                    </div>
                    {/* aetna */}
                    <div className="card bg-base-100 w-1/5 sm:w-full h-60 shadow-xl hover:shadow-orange-200 m-3" onClick={() => { selectInsurance("Aetna Better Health"); handleAddFormRequestSure("plan_name", "Aetna Better Health"); }}>
                      <figure className="px-10 pt-10">
                        <img
                          src={`${apiUrlStatic}/static/media/aetna.png`}
                          alt="aetna"
                          className="rounded-xl w-2/3" />
                      </figure>
                      <div className="card-body items-center text-center">
                        {/* <h2 className="card-title">Aetna</h2> */}
                        <div className="card-actions">
                          <p>AETNA MEDICAID <br /> AUTH FORM</p>

                        </div>
                      </div>
                    </div>
                    {/* aetna */}
                    <div className="card bg-base-100 w-1/5 sm:w-full h-60 shadow-xl hover:shadow-orange-200 m-3" onClick={() => { selectInsurance("Aetna Health Plan"); handleAddFormRequestSure("plan_name", "Aetna Health Plan"); }}>
                      <figure className="px-10 pt-10">
                        <img
                          src={`${apiUrlStatic}/static/media/aetnada.png`}
                          alt="aetna"
                          className="rounded-xl w-2/3" />
                      </figure>
                      <div className="card-body items-center text-center">
                        <p>AETNA MEDICARE <br />AUTH FORM</p>
                        <div className="card-actions">

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-center">
                    {/* WellCare */}
                    <div className="card bg-base-100 w-1/5 sm:w-full h-60 shadow-xl hover:shadow-orange-200 m-3" onClick={() => { selectInsurance("Wellcare Health Plan"); handleAddFormRequestSure("plan_name", "Wellcare Health Plan"); }}>
                      <figure className="px-10 pt-10">
                        {/* change this img */}
                        <img
                          src={`${apiUrlStatic}/static/media/wellcare.png`}
                          alt="wellcare"
                          className="rounded-xl w-16" />
                      </figure>
                      <div className="card-body items-center text-center">
                        {/* <h2 className="card-title">Wellcare</h2> */}
                        <p>AUTHORIZATION FORM</p>
                        <div className="card-actions">

                        </div>
                      </div>
                    </div>
                    {/* Simply */}
                    <div className="card bg-base-100 w-1/5 sm:w-full h-60 shadow-xl hover:shadow-orange-200 m-3" onClick={() => { selectInsurance("Simply Healthcare"); handleAddFormRequestSure("plan_name", "Simply Healthcare"); }}>
                      <figure className="px-10 pt-10">
                        <img
                          src={`${apiUrlStatic}/static/media/simply.png`}
                          alt="Simply"
                          className="rounded-xl w-2/3" />
                      </figure>
                      <div className="card-body items-center text-center">
                        {/* <h2 className="card-title">Shoes!</h2> */}
                        <p>AUTHORIZATION FORM</p>
                        <div className="card-actions">

                        </div>
                      </div>
                    </div>
                    {/* Humana */}
                    <div className="card bg-base-100 w-1/5 sm:w-full h-60 shadow-xl hover:shadow-orange-200 m-3" onClick={() => { selectInsurance("Humana"); handleAddFormRequestSure("plan_name", "Humana"); }}>
                      <figure className="px-10 pt-10">
                        <img
                          src={`${apiUrlStatic}/static/media/humana.png`}
                          alt="Humana"
                          className="rounded-xl w-16" />
                      </figure>
                      <div className="card-body items-center text-center">

                        <p>AUTHORIZATION FORM</p>
                        <div className="card-actions">

                        </div>
                      </div>
                    </div>
                    {/* Healthsun */}
                    <div className="card bg-base-100 w-1/5 sm:w-full h-60 shadow-xl hover:shadow-orange-200 m-3" onClick={() => { selectInsurance("HealthSun Health Plan"); handleAddFormRequestSure("plan_name", "HealthSun Health Plan"); }}>
                      <figure className="px-10 pt-10">
                        <img
                          src={`${apiUrlStatic}/static/media/healthsun.png`}
                          alt="Healthsun"
                          className="rounded-xl w-2/3" />
                      </figure>
                      <div className="card-body items-center text-center">
                        {/* <h2 className="card-title">Aetna</h2> */}
                        <p>AUTHORIZATION FORM</p>
                        <div className="card-actions">

                        </div>
                      </div>
                    </div>
                    {/* careplus */}
                    <div className="card bg-base-100 w-1/5 sm:w-full h-60 shadow-xl hover:shadow-orange-200 m-3" onClick={() => { selectInsurance("CarePlus Health Plan"); handleAddFormRequestSure("plan_name", "CarePlus Health Plan"); }}>
                      <figure className="px-10 pt-10">
                        <img
                          src={`${apiUrlStatic}/static/media/careplus.png`}
                          alt="careplus"
                          className="rounded-xl w-2/3" />
                      </figure>
                      <div className="card-body items-center text-center">
                        <p>AUTHORIZATION <br />AUTH FORM</p>
                        <div className="card-actions">

                        </div>
                      </div>
                    </div>
                    {/* fcc */}
                    <div className="card bg-base-100 w-1/5 sm:w-full h-60 shadow-xl hover:shadow-orange-200 m-3" onClick={() => { selectInsurance("Free Medicaid"); handleAddFormRequestSure("plan_name", "Free Medicaid"); }}>
                      <figure className="px-10 pt-10">
                        <img
                          src={`${apiUrlStatic}/static/media/fcc.png`}
                          alt="fcc"
                          className="rounded-xl w-2/3" />
                      </figure>
                      <div className="card-body items-center text-center">
                        <p>AUTHORIZATION <br />AUTH FORM</p>
                        <div className="card-actions">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex pt-4 justify-content-end">
              <Button label="Next" icon="pi pi-arrow-right " iconPos="right"
                onClick={() => { stepperRef.current?.nextCallback() }}
              />
            </div>
          </StepperPanel>
          <StepperPanel header="Necessary data">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                <div className="w-full ">
                  <div className="w-full flex" style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                    <div className="w-1/5 border-black border-r text-center">Insurance Plan Name</div>
                    <div className="w-1/5 border-black border-r text-center">Insurance Plan ID</div>
                    <div className="w-1/5 border-black border-r text-center">Start Date</div>
                    <div className="w-1/5 border-black border-r text-center">End Date</div>
                    <div className="w-1/5 text-center">Units</div>

                  </div>

                  <div>
                    <div className="w-full flex border-t border-black items-center">
                      <div className="w-1/5 border-black border-r text-center">
                        <select
                          value={insuance ?? "Sunshine Health"}
                          onChange={(e) => {
                            handleAddFormRequestSure("plan_name", e.target.value ?? "Sunshine Health");
                            setInsuance(e.target.value)
                          }}
                          className="input input-ghost border-0 w-full text-center"
                          style={{ backgroundColor: "#e5ecfc", border: 0 }}
                        >
                          <option value="Free Medicaid" selected>Free Medicaid</option>
                          <option value="Sunshine Health">Sunshine Health</option>
                          <option value="Cigna">Cigna</option>
                          <option value="Molina Healthcare">Molina Healthcare</option>
                          <option value="Aetna Better Health">Aetna Better Health</option>
                          <option value="Aetna Health Plan">Aetna Health Plan</option>
                          <option value="Wellcare Health Plan">Wellcare Health Plan</option>
                          <option value="Simply Healthcare">Simply Healthcare</option>
                          <option value="Humana">Humana</option>
                          <option value="HealthSun Health Plan">HealthSun Health Plan</option>
                          <option value="CarePlus Health Plan">CarePlus Health Plan</option>
                        </select>
                      </div>
                      <div className="w-1/5 border-black border-r text-center">
                        <InputMask
                          id="plan_id"
                          // BUG: Arreglar aqui llega un array
                          value={requestAddSure.plan_id}
                          onChange={(e: InputMaskChangeEvent) => handleAddFormRequestSure("plan_id", e.target.value ?? "")}
                          mask="99999"
                          placeholder="Type number"
                          className="input input-ghost w-full text-center"
                          style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                        />
                      </div>
                      <div className="w-1/5 border-black border-r text-center">
                        <InputMask
                          id="start_date"
                          value={requestAddSure.auth_date_start}
                          mask="99/99/9999"
                          placeholder="Start Date"
                          onChange={(e: InputMaskChangeEvent) => handleAddFormRequestSure("auth_date_start", e.target.value ?? "")}
                          className="input input-ghost border-0 w-full text-center"
                          style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                        />
                      </div>
                      <div className="w-1/5 border-black border-r text-center">
                        <InputMask
                          id="end_date"
                          mask="99/99/9999"
                          placeholder="End Date"
                          value={requestAddSure.auth_date_end}
                          onChange={(e: InputMaskChangeEvent) => handleAddFormRequestSure("auth_date_end", e.target.value ?? "")}
                          className="input input-ghost border-0 w-full text-center"
                          style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                        />
                      </div>
                      <div className="w-1/5 text-center">
                        <InputText
                          id="units"
                          value={requestAddSure.unit.toString()}
                          onChange={(e) => handleAddFormRequestSure("unit", Number(e.target.value) ?? 0)}
                          placeholder="Type number"
                          className="input input-ghost w-full text-center"
                          style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                        />
                      </div>

                    </div>

                  </div>


                </div>
              </div>
            </div>
            <div className="flex pt-4 justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                disabled={!requestAddSure.plan_id || !requestAddSure.auth_date_start || !requestAddSure.auth_date_end}
                iconPos="right"
                className="ml-5"
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>
          <StepperPanel header="Archive Authorization">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                <div className="w-full flex">

                  <div className="hero bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse flex">
                      <div>
                        <h1 className="text-5xl font-bold">Authorization information!</h1>
                        <p className="py-2">
                          <div className="stats shadow">
                            <div className="stat">
                              <div className="stat-figure text-secondary">

                              </div>
                              <div className="stat-title">Plan Name</div>
                              <div className="stat-value">
                                {requestAddSure.plan_name === "Sunshine Health" && <img src={`${apiUrlStatic}/static/media/sunshine-logo.png`} alt="Sunshine Health" className="rounded-xl" />}
                                {requestAddSure.plan_name === "Cigna" && <img src={`${apiUrlStatic}/static/media/cigna.png`} alt="Cigna" className="rounded-xl" />}
                                {requestAddSure.plan_name === "Molina Healthcare" && <img src={`${apiUrlStatic}/static/media/molinaLogo-notag.png`} alt="Molina Healthcare" className="rounded-xl" />}
                                {requestAddSure.plan_name === "Aetna Better Health" && <img src={`${apiUrlStatic}/static/media/aetna.png`} alt="Aetna Better Health" className="rounded-xl" />}
                                {requestAddSure.plan_name === "Aetna Health Plan" && <img src={`${apiUrlStatic}/static/media/aetnada.png`} alt="Aetna Health Plan" className="rounded-xl" />}
                                {requestAddSure.plan_name === "Wellcare Health Plan" && <img src={`${apiUrlStatic}/static/media/wellcare.png`} alt="Wellcare Health Plan" className="rounded-xl" />}
                                {requestAddSure.plan_name === "Simply Healthcare" && <img src={`${apiUrlStatic}/static/media/simply.png`} alt="Simply Healthcare" className="rounded-xl" />}
                                {requestAddSure.plan_name === "Humana" && <img src={`${apiUrlStatic}/static/media/humana.png`} alt="Humana" className="rounded-xl" />}
                                {requestAddSure.plan_name === "HealthSun Health Plan" && <img src={`${apiUrlStatic}/static/media/healthsun.png`} alt="HealthSun Health Plan" className="rounded-xl" />}
                                {requestAddSure.plan_name === "CarePlus Health Plan" && <img src={`${apiUrlStatic}/static/media/careplus.png`} alt="CarePlus Health Plan" className="rounded-xl" />}
                                {requestAddSure.plan_name === "Free Medicaid" && <img src={`${apiUrlStatic}/static/media/fcc.png`} alt="Free Medicaid" className="rounded-xl" />}
                              </div>
                            </div>

                            <div className="stat">
                              <div className="stat-title">Plan ID</div>
                              <div className="stat-value">{requestAddSure.plan_id}</div>
                            </div>

                            <div className="stat">
                              <div className="stat-title">Start Date</div>
                              <div className="font-bold" style={{ fontSize: "24px" }}>{requestAddSure.auth_date_start}</div>
                              <div className="stat-desc">End Date</div>
                              <div className="font-bold" style={{ fontSize: "24px" }}>{requestAddSure.auth_date_end}</div>
                            </div>

                            <div className="stat">
                              <div className="stat-figure text-secondary">
                              </div>
                              <div className="stat-title">Units</div>
                              <div className="stat-value">{requestAddSure.unit}</div>
                            </div>
                          </div>
                        </p>
                        <p className="py-2">
                          By saving the insurance information, the system will automatically activate this insurance and the previous authorization documents will be archived.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex pt-4 justify-content-start">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
              <Button
                icon="pi pi-save"
                label="Save"
                severity="secondary"
                className="ml-5"
                disabled={!requestAddSure.plan_id || !requestAddSure.auth_date_start || !requestAddSure.auth_date_end}
                onClick={() => handleButtonSave()}
              />
            </div>
          </StepperPanel>
        </Stepper>
      }

      <Dialog
        header={headerAuth("EDIT AUTHORIZATION")}
        visible={visibleEdit}
        maximizable
        draggable={false}
        modal={true}
        style={{ width: "95vw" }}
        breakpoints={{ "960px": "70vw", "641px": "90vw" }}
        onHide={() => setVisibleEdit(false)}
        footer={
          <VoiceRecorder
            relad={relad}
            active={active}
            to={active?.activeUser?.User?.ID.toString() || "0"}
            module="tcm"
            component="Sure"
            id_component={sure?.ID.toString() || "0"}
            mode='private'
          />
        }
      >
        <Edit sure={sure} relad={relad} scm={scm} active={active} client={client} />
      </Dialog>
    </div>
  );
};
type Props = {
  active?: Active;
  scm: ServiceCM | undefined;
  relad(): void;
  client?: Client;
};
