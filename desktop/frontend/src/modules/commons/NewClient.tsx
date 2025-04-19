import React, { useEffect, useState } from 'react';

import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { ScrollTop } from 'primereact/scrolltop';
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import {
    displayNotificationWarning,
    displayNotificationSuccess,
} from "../../utils";
import { useCoreUsers, useNewClient, useDelReqClient, useCoreProposeMr, useCoreAvailableMr } from "../profile/hooks";
// New Struct
import { DiagnosticTable, User, FormNewClient, FormNewCaseManagement, FromNewScmSure } from "../../models";


import { CalculateAge } from '../commons';

import { Active } from "../../models";

const NewClient = ({ show, active, relad, closed, data }: Props) => {
    // TODO: Aqui no se deben de listar todos los usuarios, sino los TCM y los TCMS en caso de que la consulta la haga un QA o un Manager
    const { users } = useCoreUsers();
    const { checkMr } = useCoreAvailableMr();
    const { proposeMr } = useCoreProposeMr();

    const [workers, setWorkers] = useState<User[]>([]);
    const [selectedUser, setSelecteduser] = useState<string | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);

    const { addNewClient } = useNewClient(relad);
    const { delNewClientReq } = useDelReqClient(relad);
    const [visible, setVisible] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(false);
    const [secondConfirmationDialogVisible, setSecondConfirmationDialogVisible] = useState<boolean>(false);

    const [isOk, setIsOk] = useState<boolean>(true);



    useEffect(() => {
        if (users && users.users) {
            const filteredWorkers = users.users.filter(user => user.roll === "TCM" || user.roll === "TCMS");
            setWorkers(filteredWorkers);
        }
    }, [users]);


    const search = (event: AutoCompleteCompleteEvent) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filteredusers;

            if (!event.query.trim().length) {
                _filteredusers = [...workers];
            } else {
                _filteredusers = workers.filter((user) => {
                    return user?.nick?.includes(event.query);
                });
            }
            setFilteredUsers(_filteredusers);
        }, 250);
    }


    const checkFields = () => {
        setIsValid(false);
        const { last_name, first_name, sexo, dob, medicalid, gold_card_number } = newClient;
        const { case_management, individual_therapy, family_therapy, adult_psr, psychiatrist, other } = newClient;
        if (last_name !== "" && first_name !== "" && sexo !== "" && dob !== "") {
            if (
                (newCaseManagement.tcm !== "") &&
                (medicalid !== "" || gold_card_number !== "") &&
                (case_management || individual_therapy || family_therapy || adult_psr || psychiatrist || other)) {
                // Los campos requeridos tienen valores y al menos uno de los campos adicionales está en true
                setIsValid(true);
            }
        }
    };

    // -----------------------
    const [newClient, setNewClient] = useState<FormNewClient>({
        client_id: data.client_id,
        mr: proposeMr?.proposed_mr || 0,
        referring_agency: data.referring_agency,
        referring_person: data.referring_person,
        cell_phone: data.cell_phone,
        fax: data.fax,
        email: data.email,
        date: data.date,

        last_name: data.last_name,
        first_name: data.first_name,

        ss: data.ss,
        dob: data.dob,
        sexo: data.sexo,
        race: data.race,

        address: data.address,
        state: data.state,
        zip_code: data.zip_code,

        phone: data.phone,
        school: data.school,
        lenguage: data.lenguage,

        legal_guardian: data.legal_guardian,
        relationship: data.relationship,
        cell_phone_guardian: data.cell_phone_guardian,

        medicalid: data.medicalid,
        gold_card_number: data.gold_card_number,
        medicare: data.medicare,

        reason: data.reason,
        evaluation: data.evaluation,

        // TODO: add in back
        mental_primary: data.mental_primary,
        mental_primary_date: data.mental_primary_date,
        mental_secondary: data.mental_secondary,
        mental_secondary_date: data.mental_secondary_date,

        case_management: data.case_management,
        individual_therapy: data.individual_therapy,
        family_therapy: data.family_therapy,
        adult_psr: data.adult_psr,
        psychiatrist: data.psychiatrist,
        other: data.other,
    });

    const handleChangeFormnewClient = <T extends string | number | boolean>(name: keyof FormNewClient, value: T) => {

        setNewClient(prevState => ({
            ...prevState,
            [name]: value
        }));
        return NewClient
    };

    // --------------
    const [newCaseManagement, setNewCaseManagement] = useState<FormNewCaseManagement>({
        tcm: active?.activeUser?.User?.uid || "",
        status: "",
        doa: "",
    });

    const handleChangeNewClient = <T extends string>(name: keyof FormNewCaseManagement, value: T) => {
        setNewCaseManagement(prevState => ({
            ...prevState,
            [name]: value
        }));
        return newCaseManagement
    }
    // --------------
    const [newScmSure, setNewScmSure] = useState<FromNewScmSure>({
        plan_name: data.plan_name,
        plan_id: data.plan_id,
        auth: false,
        auth_date: "",
        auth_unit: 0,
        active: false,
    });

    const handleChangeNewScmSure = <T extends string>(name: keyof FromNewScmSure, value: T) => {
        setNewScmSure(prevState => ({
            ...prevState,
            [name]: value
        }));
        return newScmSure
    }
    // --------------

    const changeTcm = (e) => {
        setSelecteduser(e.value || null);
        handleChangeNewClient("tcm", e.value.uid);
    }

    const age = CalculateAge({ dob: newClient.dob });
    // --------------
    useEffect(() => {
        checkFields();
    }, [newClient, newCaseManagement]);

    useEffect(() => {
        { show ? setVisible(true) : setVisible(false) }
    }, [show]);


    const footerContent = (
        <div className='flex pt-2'>
            <Button
                label="Delete"
                icon="pi pi-trash"
                onClick={() => setDeleteDialogVisible(true)}
                className="p-button-warning bg-red-500 mr-2"
            />
            {isValid === true && isOk &&
                <Button
                    label="Submit"
                    icon="pi pi-check"
                    disabled={newCaseManagement.doa === ""}
                    className='p-button-warning'
                    onClick={() => setSecondConfirmationDialogVisible(true)}
                    autoFocus
                />
            }

            <Dialog
                header="Confirm Deletion"
                visible={deleteDialogVisible}
                style={{ width: '350px' }}
                footer={
                    <div className='flex justify-content-end'>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            onClick={() => setDeleteDialogVisible(false)}
                            className="p-button-text mr-2"
                        />
                        <Button
                            label="Yes"
                            icon="pi pi-check"
                            onClick={() => {
                                delNewClientReq({ id: data.ID });
                                setVisible(false);
                                setDeleteDialogVisible(false);
                            }}
                            className="p-button-danger"
                        />
                    </div>
                }
                onHide={() => setDeleteDialogVisible(false)}
            >
                <p>Are you sure you want to delete this client?</p>
            </Dialog>

            <Dialog
                header="Confirmation"
                visible={secondConfirmationDialogVisible}
                style={{ width: '350px' }}
                footer={
                    <div className='flex justify-content-end'>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            onClick={() => setSecondConfirmationDialogVisible(false)}
                            className="p-button-text mr-2"
                        />
                        <Button
                            label="Yes"
                            icon="pi pi-check"
                            onClick={() => {
                                addNewClient({ newClient, newCaseManagement, newScmSure, data });
                                setVisible(false);
                                setSecondConfirmationDialogVisible(false);
                            }}
                            className="p-button-success"
                        />
                    </div>
                }
                onHide={() => setSecondConfirmationDialogVisible(false)}
            >
                <p>Are you sure you want to create the client file? Verify the information before proceeding.</p>
                <br className='mb-5' />

                <h1>MR: {newClient.mr}</h1>
                <hr />
                <h1>Client: {newClient.first_name} {newClient.last_name}</h1>
                <hr />
                <h1>TCM: {newCaseManagement.tcm}</h1>
                <hr />
                <h1>DOA: {newCaseManagement.doa}</h1>

            </Dialog>
        </div>
    );
    //  Diagnostic Table
    const [itemss, setItems] = useState<string[]>([]);

    const searchDiagnostic = (event) => {
        const searchTerm = event.query.toLowerCase();
        const filteredItems = Object.entries(DiagnosticTable)
            .filter(([code, description]) => code.toLowerCase().includes(searchTerm) || description.toLowerCase().includes(searchTerm))
            .map(([code, description]) => `${code} - ${description}`);
        setItems(filteredItems);
    };

    const onSelect = <T extends string | string>(name: keyof FormNewClient, value: T) => {
        // Dividir la cadena en dos partes utilizando el guion como separador
        const parts = value.split('-');
        // Obtener el código sin espacios en blanco
        const code = parts[0].trim();
        handleChangeFormnewClient(name, code ?? "")
    };

    return (
        <Dialog
            header="Create a Client File"
            visible={visible}
            maximizable
            style={{ width: '80vw' }}
            breakpoints={{ '960px': '70vw', '641px': '90vw' }}
            onHide={() => closed()}
            footer={footerContent}
        >
            <div className="m-0 border-2 border-primary" style={{ 'overflow': 'auto' }}>
                <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                    <div className='text-2xl tracking-tight place-items-center'>Referral Source Information</div>
                </div>
                <div className="m-0 p-0">
                    {/* row 1 */}
                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    Referring Agency:
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='referringAgency'
                                            placeholder="Type Referring Agency"
                                            value={newClient.referring_agency}
                                            onChange={(e) => handleChangeFormnewClient("referring_agency", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            onFocus={(e) => e.currentTarget.select()}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    Referring Person:
                                </div>
                                <div className="grid border-primary w-3/4 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='referringPerson'
                                            placeholder="Type Referring Person"
                                            value={newClient.referring_person}
                                            onChange={(e) => handleChangeFormnewClient("referring_person", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            onFocus={(e) => e.currentTarget.select()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* row 2 */}
                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="flex w-full place-items-center">
                                    <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                        <div className="flex w-full place-items-center p-0 m-0">

                                            <div className="grid w-2/4 pl-4">
                                                Cell/Phone:
                                            </div>

                                            <div className="grid w-2/4">
                                                <div className="p-inputgroup flex-1">
                                                    <InputMask
                                                        id="phone"
                                                        value={newClient.cell_phone}
                                                        onChange={(e: InputMaskChangeEvent) => handleChangeFormnewClient("cell_phone", e.target.value ?? "")}
                                                        mask="(999) 999-9999"
                                                        placeholder="Type number"
                                                        className="input input-ghost border-0 w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex grid md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex w-full place-items-center">

                                                <div className="grid w-2/5">
                                                    Fax:
                                                </div>
                                                <div className="grid w-3/5">
                                                    <div className="p-inputgroup flex-1">
                                                        <InputMask
                                                            id="fax"
                                                            value={newClient.fax}
                                                            onChange={(e: InputMaskChangeEvent) => handleChangeFormnewClient("fax", e.target.value ?? "")}
                                                            mask="(999) 999-9999"
                                                            placeholder="Type number"
                                                            className="input input-ghost border-0 w-full text-center"
                                                            style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
                                <div className="flex w-full place-items-center">
                                    <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                        <div className="flex w-full place-items-center p-0 m-0">

                                            <div className="grid w-2/4 pl-4">
                                                Email:
                                            </div>

                                            <div className="grid w-2/4">
                                                <div className="p-inputgroup flex-1">
                                                    <InputText
                                                        type="text"
                                                        name='email'
                                                        placeholder="Type Email"
                                                        value={newClient.email}
                                                        onChange={(e) => handleChangeFormnewClient("email", e.target.value ?? "")}
                                                        className="input input-ghost w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                        onFocus={(e) => e.currentTarget.select()}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex grid w-2/4 p-1">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex w-full place-items-center">

                                                <div className="grid w-2/5">
                                                    Date:
                                                </div>
                                                <div className="grid w-3/5">
                                                    <div className="p-inputgroup flex-1">
                                                        <InputMask
                                                            id="date"
                                                            value={newClient.date}
                                                            onChange={(e: InputMaskChangeEvent) => handleChangeFormnewClient("date", e.target.value ?? "")}
                                                            mask="99/99/2099"
                                                            placeholder="Type number"
                                                            className="input input-ghost border-0 w-full text-center"
                                                            style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                    <div className='text-2xl tracking-tight place-items-center'>Demografic</div>
                </div>
                <div className="m-0 p-0">
                    {/* row 1 */}
                    <div className="md:flex lg:flex w-full">
                        <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary place-items-center">

                            <div className="grid flex-grow w-1/4 pl-5">
                                *Last Name:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputText
                                        type="text"
                                        name='lastname'
                                        placeholder="Type Last Name"
                                        value={newClient.last_name}
                                        onChange={(e) => handleChangeFormnewClient("last_name", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                            <div className="flex w-full place-items-center">
                                <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">

                                        <div className="grid w-2/4 pl-4">
                                            *First Name:
                                        </div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                <InputText
                                                    type="text"
                                                    name='firstname'
                                                    placeholder="Type First Name"
                                                    value={newClient.first_name}
                                                    onChange={(e) => handleChangeFormnewClient("first_name", e.target.value)}
                                                    className="input input-ghost w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                    onFocus={(e) => e.currentTarget.select()}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex grid w-2/4 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">

                                            <div className="grid w-2/5">
                                                *DOB:
                                            </div>
                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    <InputMask
                                                        id="Dob"
                                                        mask="99/99/9999"
                                                        placeholder="Type Number"
                                                        value={newClient.dob}
                                                        onChange={(e: InputMaskChangeEvent) => handleChangeFormnewClient("dob", e.target.value ?? "")}
                                                        className="input input-ghost border-0 w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                    />
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
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="flex w-full place-items-center">
                                    <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                        <div className="flex w-full place-items-center p-0 m-0">
                                            <div className="grid w-2/4 pl-4">
                                                *Age:
                                            </div>
                                            <div className="grid w-2/4">
                                                <div className="p-inputgroup flex-1">
                                                    <InputText
                                                        tooltip="Age is calculated by the system from the date of birth"
                                                        tooltipOptions={{ position: 'top' }}
                                                        type="text"
                                                        name='firstname'
                                                        placeholder="Type First Name"
                                                        value={age.toString()}
                                                        className="input input-ghost w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid w-2/4 pl-4">
                                                    SS #:
                                                </div>
                                                <div className="grid w-2/4">
                                                    <InputMask
                                                        id="ss"
                                                        mask="999-99-9999"
                                                        placeholder="Type Number"
                                                        value={newClient.ss}
                                                        onChange={(e: InputMaskChangeEvent) => handleChangeFormnewClient("ss", e.target.value ?? "")}
                                                        className="input input-ghost border-0 w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }} /
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
                                <div className="flex w-full place-items-center">
                                    <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                        <div className="flex w-full place-items-center p-0 m-0">
                                            <div className="grid w-2/4 pl-4">
                                                *Sexo:
                                            </div>
                                            <div className="grid w-2/4">
                                                <div className="p-inputgroup flex-1">
                                                    <select
                                                        value={newClient.sexo ?? "Female"}
                                                        onChange={(e) => handleChangeFormnewClient("sexo", e.target.value ?? "Female")}
                                                        className="input input-ghost border-0 w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                    >
                                                        <option value="Female" selected>Female</option>
                                                        <option value="Male">Male</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex grid w-2/4 p-1">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex w-full place-items-center">

                                                <div className="grid w-2/5">
                                                    Race:
                                                </div>
                                                <div className="grid w-3/5">
                                                    <div className="p-inputgroup flex-1">
                                                        <select
                                                            value={newClient.race ?? "white"}
                                                            onChange={(e) => handleChangeFormnewClient("race", e.target.value ?? "white")}
                                                            className="input input-ghost border-0 w-full text-center"
                                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                        >
                                                            <option value="White" selected>White</option>
                                                            <option value="Hispanic and Latino">Hispanic and Latino</option>
                                                            <option value="Black">Back</option>
                                                            <option value="Asian">Asian</option>
                                                            <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                                                            <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                                                        </select>
                                                    </div>
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
                        <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary place-items-center">

                            <div className="grid flex-grow w-1/4 pl-5">
                                *Address:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputText
                                        type="text"
                                        name='Address'
                                        placeholder="Type Address"
                                        value={newClient.address}
                                        onChange={(e) => handleChangeFormnewClient("address", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                            <div className="flex w-full place-items-center">
                                <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">

                                        <div className="grid w-2/4 pl-4">
                                            City/State:
                                        </div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                <InputText
                                                    type="text"
                                                    name='state'
                                                    placeholder="Type State"
                                                    value={newClient.state}
                                                    onChange={(e) => handleChangeFormnewClient("state", e.target.value)}
                                                    className="input input-ghost w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex grid w-2/4 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">

                                            <div className="grid w-2/5">
                                                Zip Code:
                                            </div>
                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    <InputMask
                                                        id="zip"
                                                        value={newClient.zip_code}
                                                        onChange={(e: InputMaskChangeEvent) => handleChangeFormnewClient("zip_code", e.target.value ?? "")}
                                                        mask="99999"
                                                        placeholder="Type code"
                                                        className="input input-ghost border-0 w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* row 4 */}
                    <div className="md:flex lg:flex w-full">
                        <div className="w-full border-b-2 border-primary">
                            <div className="flex w-full place-items-center">
                                <div className="flex grid border-r-2 border-primary w-1/4 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">
                                        <div className="grid w-2/4 pl-4">
                                            Phone:
                                        </div>
                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="HomePhone"
                                                    mask="(999) 999-9999"
                                                    placeholder="Type Number"
                                                    value={newClient.phone}
                                                    onChange={(e) => handleChangeFormnewClient("phone", e.target.value ?? "")}
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">
                                        <div className="grid w-1/4 pl-4">
                                            *School/Work:
                                        </div>
                                        <div className="grid w-3/4">
                                            <div className="p-inputgroup flex-1">
                                                <InputText
                                                    id="school"
                                                    // mask="999-99-9999"
                                                    placeholder="Type Number"
                                                    value={newClient.school}
                                                    onChange={(e) => handleChangeFormnewClient("school", e.target.value ?? "")}
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex grid w-1/4 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-2/5">
                                                Lenguage:
                                            </div>

                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    <InputText
                                                        type="text"
                                                        name='lenguage'
                                                        placeholder="Type Language"
                                                        value={newClient.lenguage}
                                                        onChange={(e) => handleChangeFormnewClient("lenguage", e.target.value)}
                                                        className="input input-ghost w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                        onFocus={(e) => e.currentTarget.select()}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* row 5 */}
                    <div className="md:flex lg:flex w-full">
                        <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                            <div className="flex w-full place-items-center">
                                {/* <div className="flex grid  w-2/4 p-1"> */}
                                <div className="flex w-full place-items-center p-1 m-0 border-r-2 border-primary">
                                    <div className="grid w-1/4 pl-4">
                                        Legal Guardian:
                                    </div>
                                    <div className="grid w-3/4">
                                        <div className="p-inputgroup flex-1">
                                            <InputText
                                                type="text"
                                                name='legal_guardian'
                                                placeholder="Type Name"
                                                value={newClient.legal_guardian}
                                                onChange={(e) => handleChangeFormnewClient("legal_guardian", e.target.value)}
                                                className="input input-ghost w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                onFocus={(e) => e.currentTarget.select()}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}

                            </div>
                        </div>
                        <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                            <div className="flex w-full place-items-center">
                                <div className="flex grid border-r-2 border-primary w-2/4 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">
                                        <div className="grid w-2/4 pl-4">
                                            Relationship:
                                        </div>
                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                <InputText
                                                    type="text"
                                                    name='fullname'
                                                    placeholder="Type Relation"
                                                    value={newClient.relationship}
                                                    onChange={(e) => handleChangeFormnewClient("relationship", e.target.value)}
                                                    className="input input-ghost w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                    onFocus={(e) => e.currentTarget.select()}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex grid w-2/4 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-2/5">
                                                Phone:
                                            </div>

                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    <InputMask
                                                        id="Dob"
                                                        mask="(999) 999-9999"
                                                        placeholder="Type Number"
                                                        value={newClient.cell_phone_guardian}
                                                        onChange={(e) => handleChangeFormnewClient("cell_phone_guardian", e.target.value ?? "")}
                                                        className="input input-ghost border-0 w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* row 6 */}
                    {/* <div className="md:flex lg:flex w-full">
                        <div className="w-full border-b-2 border-primary">
                            <div className="flex w-full place-items-center p-0 m-0">
                                <div className="grid w-1/4 pl-4">
                                    *Reason:
                                </div>
                                <div className="grid w-3/4">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='reason'
                                            placeholder="Type Reason"
                                            // value={newClient.reason}
                                            // onChange={(e) => handleChangeFormnewClient("reason", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            onFocus={(e) => e.currentTarget.select()}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div> */}
                    {/* row 7 */}

                </div>
                <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                    <div className='text-2xl tracking-tight place-items-center'>Insurance Information</div>
                </div>
                <div className="m-0 p-0">
                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">

                                <div className="flex border-r-2 border-primary w-1/5 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">
                                        <div className="grid w-2/4 pl-4">
                                            *Medicaid:
                                        </div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="medicaid"
                                                    value={newClient.medicalid}
                                                    onChange={(e: InputMaskChangeEvent) => handleChangeFormnewClient("medicalid", e.target.value ?? "")}
                                                    mask="9999999999"
                                                    placeholder="Type number"
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex md:border-r-2 lg:border-r-2 border-primary w-1/5 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-2/5">
                                                *Gold Card Number:
                                            </div>
                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    <InputMask
                                                        id="gold"
                                                        value={newClient.gold_card_number}
                                                        onChange={(e: InputMaskChangeEvent) => handleChangeFormnewClient("gold_card_number", e.target.value ?? "")}
                                                        mask="99999"
                                                        placeholder="Type number"
                                                        className="input input-ghost border-0 w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex border-r-2 border-primary w-1/5 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">

                                        <div className="grid w-2/4 pl-4">
                                            Medicare:
                                        </div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="medicaid"
                                                    value={newClient.medicare}
                                                    onChange={(e: InputMaskChangeEvent) => handleChangeFormnewClient("medicare", e.target.value ?? "")}
                                                    mask="***********"
                                                    placeholder="Type alphanumeric value"
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-1/5 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">

                                            <div className="grid w-2/5">
                                                Plan Name:
                                            </div>
                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    <InputText
                                                        type="text"
                                                        name='fullname'
                                                        placeholder="Type Plan Name"
                                                        value={newScmSure.plan_name}
                                                        onChange={(e) => handleChangeNewScmSure("plan_name", e.target.value)}
                                                        className="input input-ghost w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                        onFocus={(e) => e.currentTarget.select()}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-1/5 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">

                                            <div className="grid w-2/5">
                                                Plan ID:
                                            </div>
                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    <InputText
                                                        type="text"
                                                        name='plan_id'
                                                        placeholder="Type Plan Id"
                                                        value={newScmSure.plan_id}
                                                        onChange={(e) => handleChangeNewScmSure("plan_id", e.target.value)}
                                                        className="input input-ghost w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                        onFocus={(e) => e.currentTarget.select()}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                    <div className='text-2xl tracking-tight place-items-center'>Mental Health Diagnosis</div>
                </div>
                <div className="m-0 p-0">
                    <div className="md:flex lg:flex w-full">
                        <div className="w-full border-b-2 border-primary">
                            <div className="flex w-full place-items-center">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-1/4 pl-4">
                                        *Primary:
                                    </div>
                                    <div className="grid w-3/4">
                                        <div className='flex w-full place-items-center p-0 m-0'>
                                            <div className="grid w-1/4">
                                                <div className="p-inputgroup flex-1">
                                                    <AutoComplete
                                                        value={newClient.mental_primary}
                                                        suggestions={itemss}
                                                        completeMethod={searchDiagnostic}
                                                        onChange={(e: AutoCompleteChangeEvent) => handleChangeFormnewClient("mental_primary", e.value ?? "")}
                                                        onSelect={(e) => onSelect("mental_primary", e.value)}
                                                        pt={{
                                                            input: {
                                                                root: {
                                                                    className: 'input input-ghost border-0 w-full bg-blue-100 text-center',
                                                                }
                                                            },
                                                        }}
                                                        dropdown
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid w-3/4 pl-4">
                                                {DiagnosticTable[newClient.mental_primary]}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-1/4 p-1">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid w-2/5">
                                                    Date:
                                                </div>

                                                <div className="grid w-3/5">
                                                    <div className="p-inputgroup flex-1">
                                                        <InputMask
                                                            id="date"
                                                            mask="99/99/9999"
                                                            placeholder="Type Number"
                                                            value={newClient.mental_primary_date}
                                                            onChange={(e) => handleChangeFormnewClient("mental_primary_date", e.target.value ?? "")}
                                                            className="input input-ghost border-0 w-full text-center"
                                                            style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex lg:flex w-full">
                        <div className="w-full">
                            <div className="flex w-full place-items-center">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-1/4 pl-4">
                                        Secondary:
                                    </div>
                                    <div className="grid w-3/4">
                                        <div className='flex w-full place-items-center p-0 m-0'>
                                            <div className="grid w-1/4">
                                                <div className="p-inputgroup flex-1">
                                                    <AutoComplete
                                                        value={newClient.mental_secondary}
                                                        suggestions={itemss}
                                                        completeMethod={search}
                                                        onChange={(e: AutoCompleteChangeEvent) => handleChangeFormnewClient("mental_secondary", e.value ?? "")}
                                                        onSelect={(e) => onSelect("mental_secondary", e.value)}
                                                        pt={{
                                                            input: {
                                                                root: {
                                                                    className: 'input input-ghost border-0 w-full bg-blue-100 text-center',
                                                                }
                                                            },
                                                        }}
                                                        dropdown
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid w-3/4 pl-4">
                                                {DiagnosticTable[newClient.mental_secondary]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-1/4 p-1">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid w-2/5">
                                                    Date:
                                                </div>

                                                <div className="grid w-3/5">
                                                    <div className="p-inputgroup flex-1">
                                                        <InputMask
                                                            id="date"
                                                            mask="99/99/9999"
                                                            placeholder="Type Number"
                                                            value={newClient.mental_secondary_date}
                                                            onChange={(e) => handleChangeFormnewClient("mental_secondary_date", e.target.value ?? "")}
                                                            className="input input-ghost border-0 w-full text-center"
                                                            style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                    <div className='text-2xl tracking-tight place-items-center'>Services Needed</div>
                </div>
                <div className='p-3'>
                    <div className="md:flex lg:flex w-full">
                        <div className="flex border-r-2 w-full md:w-2/6 lg:w-2/6 p-1">
                            <div className="flex w-full place-items-center p-0 m-0">
                                <div className="grid w-1/4">
                                    <InputSwitch
                                        checked={newClient.case_management}
                                        onChange={(e: InputSwitchChangeEvent) => handleChangeFormnewClient("case_management", e.target.value ?? false)}
                                    />
                                </div>
                                <div className="grid w-1/4 pl-2">
                                    <div className="p-inputgroup flex-1">
                                        Case Management
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-r-2 w-full md:w-2/6 lg:w-2/6 p-1">
                            <div className="flex w-full place-items-center">
                                <div className="flex w-full place-items-center">
                                    <div className="grid w-1/4">
                                        <InputSwitch
                                            checked={newClient.individual_therapy}
                                            onChange={(e: InputSwitchChangeEvent) => handleChangeFormnewClient("individual_therapy", e.target.value ?? false)}
                                        />
                                    </div>
                                    <div className="grid w-3/4 pl-2">
                                        <div className="p-inputgroup flex-1">
                                            Individual Therapy
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-r-2 w-full md:w-2/6 lg:w-2/6 p-1">
                            <div className="flex w-full place-items-center p-0 m-0">
                                <div className="grid w-1/4">
                                    <InputSwitch
                                        checked={newClient.family_therapy}
                                        onChange={(e: InputSwitchChangeEvent) => handleChangeFormnewClient("family_therapy", e.target.value ?? false)}
                                    />
                                </div>

                                <div className="grid w-3/4 pl-2">
                                    <div className="p-inputgroup flex-1">
                                        Family Therapy
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-r-2 w-full md:w-2/6 lg:w-2/6 p-1">
                            <div className="flex w-full place-items-center p-0 m-0">
                                <div className="grid w-1/4">
                                    <InputSwitch
                                        checked={newClient.adult_psr}
                                        onChange={(e: InputSwitchChangeEvent) => handleChangeFormnewClient("adult_psr", e.target.value ?? false)}
                                    />
                                </div>
                                <div className="grid w-3/4 pl-2">
                                    <div className="p-inputgroup flex-1">
                                        Adult Psr
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-r-2 w-full md:w-2/6 lg:w-2/6 p-1">
                            <div className="flex w-full place-items-center">
                                <div className="flex w-full place-items-center">

                                    <div className="grid w-1/4">
                                        <InputSwitch
                                            checked={newClient.psychiatrist}
                                            onChange={(e: InputSwitchChangeEvent) => handleChangeFormnewClient("psychiatrist", e.target.value ?? false)}
                                        />
                                    </div>
                                    <div className="grid w-3/4 pl-2">
                                        <div className="p-inputgroup flex-1">
                                            Psychiatrist
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full md:w-2/6 lg:w-2/6 p-1">
                            <div className="flex w-full place-items-center">
                                <div className="flex w-full place-items-center">
                                    <div className="grid w-1/4">
                                        <InputSwitch
                                            checked={newClient.other}
                                            onChange={(e: InputSwitchChangeEvent) => handleChangeFormnewClient("other", e.target.value ?? false)}
                                        />
                                    </div>
                                    <div className="grid w-3/4 pl-2">
                                        <div className="p-inputgroup flex-1">
                                            Other
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* If case management */}
                {newClient.case_management && <>
                    <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                        <div className='text-2xl tracking-tight place-items-center'>Case Management {data.client_id === 0 ? "(New Client)" : "(New Admission)"}</div>
                    </div>
                    <div className="m-0 p-0">
                        {/* row 1 */}
                        <div className="md:flex lg:flex w-full">
                            <div className="md:flex lg:md:flex w-full border-primary">
                                <div className="flex w-full md:w-1/3 lg:w-1/3 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                    <div className="grid flex-grow w-1/4 pl-5">
                                        *TCM:
                                    </div>
                                    <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                        <div className='w-full'>
                                            <AutoComplete
                                                field="tcm"
                                                value={newCaseManagement.tcm}
                                                suggestions={filteredUsers ?? []}
                                                completeMethod={search}
                                                onChange={(e) => changeTcm(e)}
                                                itemTemplate={(user) => {
                                                    return (
                                                        <>
                                                            {user.uid} - {user.nick}
                                                        </>
                                                    )
                                                }}
                                                className='w-full'
                                                pt={{
                                                    input: {
                                                        root: {
                                                            className: 'input input-ghost border-0 w-full bg-blue-100',
                                                        }
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {data.client_id === 0 && <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                                    <div className="grid flex-grow w-1/4 pl-5">
                                        *MR:
                                    </div>
                                    <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                        <div className='w-full'>
                                            <div className='w-1/2'>
                                                {proposeMr && (
                                                    <InputNumber
                                                        // type="number"
                                                        name='mr'
                                                        placeholder={`MR available: ${proposeMr.proposed_mr}`}
                                                        value={newClient.mr}
                                                        min={proposeMr.proposed_mr}
                                                        onValueChange={
                                                            (e) => {
                                                                const result = checkMr({ mr: e.value || 0 });
                                                                if (result) {
                                                                    result.then((value) => {
                                                                        if (value.available === false) {
                                                                            setIsOk(false);
                                                                            handleChangeFormnewClient("mr", proposeMr.proposed_mr ?? 0)
                                                                            displayNotificationWarning(
                                                                                `There is a client with that MR, it is recommended that you use the proposed MR:${proposeMr.proposed_mr}`
                                                                            );
                                                                        } else {
                                                                            setIsOk(true);
                                                                            handleChangeFormnewClient("mr", e.value ?? 0)
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                        }
                                                        className="input input-ghost text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                        onFocus={(e) => e.currentTarget.select()}
                                                    />
                                                )}
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                }
                                <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                                    <div className="grid flex-grow w-1/4 pl-5">
                                        *DOA:
                                    </div>
                                    <div className="grid w-3/4 p-1 pl-0">
                                        <div className="p-inputgroup flex-1">
                                            <InputMask
                                                id="doa"
                                                value={newCaseManagement.doa}
                                                onChange={(e: InputMaskChangeEvent) => handleChangeNewClient("doa", e.target.value ?? "")}
                                                mask="99/99/9999"
                                                placeholder="Type number"
                                                className="input input-ghost border-0 w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

                }
                {/* If therapy */}
                {/* {newClient.individual_therapy &&
                    <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                        <div className='text-2xl tracking-tight place-items-center'>Therapy</div>
                    </div>

                } */}

                <ScrollTop target="parent" />
            </div>
        </Dialog>
    );
};
type Props = {
    show?: boolean,
    active?: Active;
    relad(): void;
    closed(): void;
    data;
}
export { NewClient };