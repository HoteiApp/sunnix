import { useEffect, useState } from 'react';

import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { AutoComplete, AutoCompleteChangeEvent } from "primereact/autocomplete";
import { ScrollTop } from 'primereact/scrolltop';
import { useCoreRequestNewClient } from "../profile/hooks";
import { CalculateAge } from '../commons';
// -- New Struct
import { FormRequestNewClient, DiagnosticTable } from "../../models";

const RequetsNewClient = ({ show, relad, closed }: Props) => {

    const { addRequestNewClient, isUpdatingRequestNewClient } = useCoreRequestNewClient(relad);
    const [visible, setVisible] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);

    const checkFields = () => {
        setIsValid(false);
        const { last_name, first_name, medicalid, gold_card_number, mental_primary, mental_primary_date } = requestNewClient;
        const { case_management, individual_therapy, family_therapy, adult_psr, psychiatrist, other } = requestNewClient;
        if (last_name !== "" && first_name !== "" && mental_primary !== "" && mental_primary_date !== "") {
            if ((medicalid !== "" || gold_card_number !== "") && (case_management || individual_therapy || family_therapy || adult_psr || psychiatrist || other)) {
                // Los campos requeridos tienen valores y al menos uno de los campos adicionales está en true
                setIsValid(true);
            }
        }
    };

    // -----------------------
    const [requestNewClient, setRequestNewClient] = useState<FormRequestNewClient>({
        client_id: 0,
        referring_agency: "",
        referring_person: "",
        cell_phone: "",
        fax: "",
        email: "",
        date: "",

        last_name: "",
        first_name: "",
        ss: "",
        dob: "",
        sexo: "Female",
        race: "white",

        address: "",
        state: "",
        zip_code: "",

        phone: "",
        school: "",
        lenguage: "",

        legal_guardian: "",
        relationship: "",
        cell_phone_guardian: "",


        medicalid: "",
        gold_card_number: "",
        medicare: "",
        plan_name: "Sunshine Health",
        plan_id: "",
        reason: "",
        evaluation: false,

        mental_primary: "",
        mental_primary_date: "",
        mental_secondary: "NaN",
        mental_secondary_date: "",

        case_management: false,
        individual_therapy: false,
        family_therapy: false,
        adult_psr: false,
        psychiatrist: false,
        other: false,
    });

    const handleChangeFormRequestnewClient = <T extends string | boolean>(name: keyof FormRequestNewClient, value: T) => {
        setRequestNewClient(prevState => ({
            ...prevState,
            [name]: value
        }));
        return requestNewClient
    };


    useEffect(() => {
        checkFields();
    }, [requestNewClient]);


    useEffect(() => {
        { show ? setVisible(true) : setVisible(false) }
    }, [show]);

    const age = CalculateAge({ dob: requestNewClient.dob });

    const footerContent = (
        <div className='pt-2'>
            {/* <Button label="Download" icon="pi pi-file-pdf" onClick={handleDownloadPDF} className="p-button-text" /> */}
            {/* <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" /> */}
            {isValid === true &&
                <Button
                    label="Submit"
                    icon="pi pi-check"
                    className='p-button-warning'
                    onClick={() => {
                        addRequestNewClient({ requestNewClient })
                        setVisible(false);
                    }}
                    autoFocus
                />
            }
        </div>
    );


    //  Diagnostic Table
    const [itemss, setItems] = useState<string[]>([]);

    const search = (event) => {
        const searchTerm = event.query.toLowerCase();
        const filteredItems = Object.entries(DiagnosticTable)
            .filter(([code, description]) => code.toLowerCase().includes(searchTerm) || description.toLowerCase().includes(searchTerm))
            .map(([code, description]) => `${code} - ${description}`);
        setItems(filteredItems);
    };

    const onSelect = <T extends string | string>(name: keyof FormRequestNewClient, value: T) => {
        // Dividir la cadena en dos partes utilizando el guion como separador
        const parts = value.split('-');
        // Obtener el código sin espacios en blanco
        const code = parts[0].trim();
        handleChangeFormRequestnewClient(name, code ?? "")
    };

    return (
        <Dialog
            header="New Client Request"
            visible={visible}
            maximizable
            style={{ width: '80vw' }}
            breakpoints={{ '960px': '70vw', '641px': '90vw' }}
            onHide={() => closed()}
            footer={footerContent}
        >
            <div className="m-0 border-2 border-primary">
                <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                    <div className='text-2xl tracking-tight place-items-center'>Referral Source</div>
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
                                            value={requestNewClient.referring_agency}
                                            onChange={(e) => handleChangeFormRequestnewClient("referring_agency", e.target.value)}
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
                                            value={requestNewClient.referring_person}
                                            onChange={(e) => handleChangeFormRequestnewClient("referring_person", e.target.value)}
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
                                                        value={requestNewClient.cell_phone}
                                                        onChange={(e: InputMaskChangeEvent) => handleChangeFormRequestnewClient("cell_phone", e.target.value ?? "")}
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
                                                            value={requestNewClient.fax}
                                                            onChange={(e: InputMaskChangeEvent) => handleChangeFormRequestnewClient("fax", e.target.value ?? "")}
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
                                                        value={requestNewClient.email}
                                                        onChange={(e) => handleChangeFormRequestnewClient("email", e.target.value ?? "")}
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
                                                            value={requestNewClient.date}
                                                            onChange={(e: InputMaskChangeEvent) => handleChangeFormRequestnewClient("date", e.target.value ?? "")}
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
                                        value={requestNewClient.last_name}
                                        onChange={(e) => handleChangeFormRequestnewClient("last_name", e.target.value)}
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
                                                    value={requestNewClient.first_name}
                                                    onChange={(e) => handleChangeFormRequestnewClient("first_name", e.target.value)}
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
                                                        value={requestNewClient.dob}
                                                        onChange={(e: InputMaskChangeEvent) => handleChangeFormRequestnewClient("dob", e.target.value ?? "")}
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
                                                        id="Dob"
                                                        mask="999-99-9999"
                                                        placeholder="Type Number"
                                                        value={requestNewClient.ss}
                                                        onChange={(e: InputMaskChangeEvent) => handleChangeFormRequestnewClient("ss", e.target.value ?? "")}
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
                                                        value={requestNewClient.sexo ?? "Female"}
                                                        onChange={(e) => handleChangeFormRequestnewClient("sexo", e.target.value ?? "Female")}
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
                                                            value={requestNewClient.race ?? "white"}
                                                            onChange={(e) => handleChangeFormRequestnewClient("race", e.target.value ?? "white")}
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
                                        // value={requestNewClient.}
                                        onChange={(e) => handleChangeFormRequestnewClient("address", e.target.value)}
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
                                                    value={requestNewClient.state}
                                                    onChange={(e) => handleChangeFormRequestnewClient("state", e.target.value)}
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
                                                        value={requestNewClient.zip_code}
                                                        onChange={(e: InputMaskChangeEvent) => handleChangeFormRequestnewClient("zip_code", e.target.value ?? "")}
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
                                                    value={requestNewClient.phone}
                                                    onChange={(e) => handleChangeFormRequestnewClient("phone", e.target.value ?? "")}
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
                                                    value={requestNewClient.school}
                                                    onChange={(e) => handleChangeFormRequestnewClient("school", e.target.value ?? "")}
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
                                                Language:
                                            </div>

                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    <InputText
                                                        type="text"
                                                        name='lenguage'
                                                        placeholder="Type Language"
                                                        value={requestNewClient.lenguage}
                                                        onChange={(e) => handleChangeFormRequestnewClient("lenguage", e.target.value)}
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
                                                value={requestNewClient.legal_guardian}
                                                onChange={(e) => handleChangeFormRequestnewClient("legal_guardian", e.target.value)}
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
                                                    value={requestNewClient.relationship}
                                                    onChange={(e) => handleChangeFormRequestnewClient("relationship", e.target.value)}
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
                                                        value={requestNewClient.cell_phone_guardian}
                                                        onChange={(e) => handleChangeFormRequestnewClient("cell_phone_guardian", e.target.value ?? "")}
                                                        className="input input-ghost border-0 w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }} /
                                                    >
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
                    <div className='text-2xl tracking-tight place-items-center'>Insurance Information</div>
                </div>
                <div className="m-0 p-0">
                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">

                                <div className="flex grid border-r-2 border-primary w-1/5 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">
                                        <div className="grid w-2/4 pl-4">
                                            *Medicaid:
                                        </div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="medicaid"
                                                    value={requestNewClient.medicalid}
                                                    onChange={(e: InputMaskChangeEvent) => handleChangeFormRequestnewClient("medicalid", e.target.value ?? "")}
                                                    mask="9999999999"
                                                    placeholder="Type number"
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex grid  md:border-r-2 lg:border-r-2 border-primary w-1/5 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-2/5">
                                                *Gold Card Number:
                                            </div>
                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    <InputMask
                                                        id="gold"
                                                        value={requestNewClient.gold_card_number}
                                                        onChange={(e: InputMaskChangeEvent) => handleChangeFormRequestnewClient("gold_card_number", e.target.value ?? "")}
                                                        mask="99999999"
                                                        placeholder="Type number"
                                                        className="input input-ghost border-0 w-full text-center"
                                                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex grid border-r-2 border-primary w-1/5 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">

                                        <div className="grid w-2/4 pl-4">
                                            Medicare:
                                        </div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                <InputMask
                                                    id="medicare"
                                                    value={requestNewClient.medicare}
                                                    onChange={(e: InputMaskChangeEvent) => handleChangeFormRequestnewClient("medicare", e.target.value ?? "")}
                                                    mask="***********"
                                                    placeholder="Type alphanumeric value"
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex grid w-1/5 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">

                                            <div className="grid w-2/5">
                                                Plan Name:
                                            </div>
                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    <select
                                                        value={requestNewClient.plan_name ?? "Sunshine Health"}
                                                        onChange={(e) => handleChangeFormRequestnewClient("plan_name", e.target.value ?? "Sunshine Health")}
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
                                                        <option value="HealthSun">HealthSun Health Plan</option>
                                                        <option value="CarePlus">CarePlus Health Plan</option>
                                                        <option value="DrHealth Health Plan">DrHealth Health Plan</option>
                                                        <option value="Devoted Health Plan">Devoted Health Plan</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex grid w-1/5 p-1">
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
                                                        value={requestNewClient.plan_id}
                                                        onChange={(e) => handleChangeFormRequestnewClient("plan_id", e.target.value)}
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
                                                        value={requestNewClient.mental_primary}
                                                        suggestions={itemss}
                                                        completeMethod={search}
                                                        onChange={(e: AutoCompleteChangeEvent) => handleChangeFormRequestnewClient("mental_primary", e.value ?? "")}
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
                                                {DiagnosticTable[requestNewClient.mental_primary]}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex grid w-1/4 p-1">
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
                                                            value={requestNewClient.mental_primary_date}
                                                            onChange={(e) => handleChangeFormRequestnewClient("mental_primary_date", e.target.value ?? "")}
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
                                                        value={requestNewClient.mental_secondary}
                                                        suggestions={itemss}
                                                        completeMethod={search}
                                                        onChange={(e: AutoCompleteChangeEvent) => handleChangeFormRequestnewClient("mental_secondary", e.value ?? "")}
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
                                                {DiagnosticTable[requestNewClient.mental_secondary]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex grid w-1/4 p-1">
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
                                                            value={requestNewClient.mental_secondary_date}
                                                            onChange={(e) => handleChangeFormRequestnewClient("mental_secondary_date", e.target.value ?? "")}
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
                    <div className='text-2xl tracking-tight place-items-center'>Recommended Services</div>
                </div>
                <div className='p-3'>
                    <div className="md:flex lg:flex w-full">
                        <div className="flex border-r-2 w-full md:w-2/6 lg:w-2/6 p-1">
                            <div className="flex w-full place-items-center p-0 m-0">
                                <div className="grid w-1/4">
                                    <InputSwitch
                                        checked={requestNewClient.case_management}
                                        onChange={(e: InputSwitchChangeEvent) => handleChangeFormRequestnewClient("case_management", e.target.value ?? false)}
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
                                            checked={requestNewClient.individual_therapy}
                                            onChange={(e: InputSwitchChangeEvent) => handleChangeFormRequestnewClient("individual_therapy", e.target.value ?? false)}
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
                                        checked={requestNewClient.family_therapy}
                                        onChange={(e: InputSwitchChangeEvent) => handleChangeFormRequestnewClient("family_therapy", e.target.value ?? false)}
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
                                        checked={requestNewClient.adult_psr}
                                        onChange={(e: InputSwitchChangeEvent) => handleChangeFormRequestnewClient("adult_psr", e.target.value ?? false)}
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
                                            checked={requestNewClient.psychiatrist}
                                            onChange={(e: InputSwitchChangeEvent) => handleChangeFormRequestnewClient("psychiatrist", e.target.value ?? false)}
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
                                            checked={requestNewClient.other}
                                            onChange={(e: InputSwitchChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
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
                <ScrollTop target="parent" />
            </div>
        </Dialog>
    );
};
type Props = {
    show?: boolean,
    relad(): void;
    closed(): void;
}
export { RequetsNewClient };