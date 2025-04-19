import React, { useState } from 'react';
import { ScrollTop } from 'primereact/scrolltop';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from "primereact/inputswitch";
// import { ClientInfo } from '../../../../data-types';
import { CalculateAge } from '../../../../commons';


const Demographic = ({ clientInfo, relad }: Props) => {

    const [radio1, setRadio1] = useState('');
    const [radio2, setRadio2] = useState('');

    // const Age = (dob: string) => {
    //     const date = new Date();
    //     // Separa la cadena de fecha en día, mes y año
    //     const partesFecha = dob.split('/');
    //     const day = parseInt(partesFecha[0], 10);
    //     const mes = parseInt(partesFecha[1], 10) - 1; // Resta 1 al mes ya que los meses en JavaScript comienzan en 0
    //     const year = parseInt(partesFecha[2], 10);

    //     // Crea un objeto de fecha válido utilizando los valores separados
    //     const birthDate = new Date(year, mes, day);

    //     // Calcula la diferencia de tiempo en milisegundos
    //     const differenceTime = date.getTime() - birthDate.getTime();

    //     // Calcula la edad en años
    //     const age = Math.floor(differenceTime / (365.25 * 24 * 60 * 60 * 1000));
    //     return age;
    // }

    return (
        <div className="w-full p-0" style={{ height: '80vh', 'overflow': 'auto' }}>

            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                INITIAL CLIENT INFORMATION
            </div>
            <div className="m-0 p-0">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-primary">
                        <div className="flex w-full md:w-3/5 lg:w-3/5 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Client’s Name:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    {clientInfo?.first_name} {clientInfo?.last_name}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/5 lg:w-1/5 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                            <div className="flex w-full place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    MR #:
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        {clientInfo?.ID}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/5 lg:w-1/5 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Date:
                            </div>
                            <div className="grid w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* row 2 */}
                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>DEMOGRAPHIC INFORMATION</b>
                </div>
                <div className="mt-5 mb-5 p-0 border-2 border-primary">
                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full md:w-1/5 lg:w-1/5 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    DOB:
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 pl-0">
                                    <div className="p-inputgroup flex">
                                        {clientInfo?.dob}
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/5 lg:w-1/5 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    Age:
                                </div>
                                <div className="grid md:border-r-2 lg:border-r-2 border-primary w-3/4 pl-0">
                                    <div className="p-inputgroup flex">
                                        {CalculateAge({ dob: clientInfo.dob })}
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/5 lg:w-1/5 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    SS #:
                                </div>
                                <div className="grid w-3/4 pl-0">
                                    <div className="p-inputgroup flex">
                                        {clientInfo.social_security}
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/5 lg:w-1/5 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5 md:border-l-2 lg:border-l-2 border-primary">
                                    Gender:
                                </div>
                                <div className="grid w-3/4  pl-0">
                                    <div className="p-inputgroup flex ml-4">
                                        {clientInfo.sexo}
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/5 lg:w-1/5 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5 md:border-l-2 lg:border-l-2 border-primary">
                                    Race:
                                </div>
                                <div className="grid w-3/4  pl-0">
                                    <div className="p-inputgroup flex">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full md:w-2/5 lg:w-2/5 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-2/6 pl-5">
                                    Address:
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-4/6 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        address
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/5 lg:w-1/5 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                                <div className="flex w-full place-items-center">
                                    <div className="grid flex-grow w-1/4 pl-5">
                                        City:
                                    </div>
                                    <div className="grid w-3/4 pl-0">
                                        <div className="p-inputgroup flex-1">
                                            {clientInfo.city}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/5 lg:w-1/5 place-items-center">
                                <div className="grid flex-grow md:border-l-2 lg:border-l-2 border-primary w-1/4 pl-5">
                                    State:
                                </div>
                                <div className="grid w-3/4 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        {clientInfo.state}
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/5 lg:w-1/5 place-items-center">
                                <div className="grid flex-grow md:border-l-2 lg:border-l-2 border-primary w-2/4 pl-5">
                                    Zip Code:
                                </div>
                                <div className="grid w-2/4 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        {clientInfo.state}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full md:w-1/3 lg:w-1/3 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-2/6 pl-5">
                                    Phone Number:
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-4/6 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='fullname'
                                            placeholder="Type Number"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            onFocus={(e) => e.currentTarget.select()}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 lg:w-1/3 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                                <div className="flex w-full place-items-center">
                                    <div className="grid flex-grow w-1/4 pl-5">
                                        School/Work:
                                    </div>
                                    <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                        <div className="p-inputgroup flex-1">
                                            <InputText
                                                type="text"
                                                name='fullname'
                                                placeholder="Type School/Work"
                                                value=""
                                                // onChange={(e) => handleChangeFormValues("email", e.target.value)}
                                                className="input input-ghost w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    Language:
                                </div>
                                <div className="grid w-3/4 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='address'
                                            placeholder="Type Applicant’s Full Name"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("address", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-2/6 pl-5">
                                    Legal Guardian:
                                </div>
                                <div className="grid  w-4/6 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        {clientInfo.legal_guardian}
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
                                <div className="grid flex-grow w-2/6 md:border-l-2 lg:border-l-2 border-primary pl-5">
                                    Relationship with Client:
                                </div>
                                <div className="grid w-4/6 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        {clientInfo.relationship}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full md:w-1/3 lg:w-1/3 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-2/4 pl-5">
                                    Medicaid #:
                                </div>
                                <div className="grid  w-2/4 pl-0">
                                    <div className="p-inputgroup flex">
                                        {clientInfo.medicaid}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 lg:w-1/3 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                                <div className="flex w-full place-items-center">
                                    <div className="grid flex-grow w-2/4 md:border-l-2 lg:border-l-2 border-primary pl-5">
                                        Medicaid Gold Card #:
                                    </div>
                                    <div className="grid w-2/4  pl-0">
                                        <div className="p-inputgroup flex">
                                            {clientInfo.gold_card_number}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                                <div className="grid flex-grow  md:border-l-2 lg:border-l-2 border-primary w-1/4 pl-5">
                                    Fax:
                                </div>
                                <div className="grid w-3/4 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        {clientInfo.fax}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-2/6 pl-5">
                                    Emergency Contact:
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-4/6 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='fullname'
                                            placeholder="Type Emergency Contact"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            onFocus={(e) => e.currentTarget.select()}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/4 lg:w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                                <div className="flex w-full place-items-center">
                                    <div className="grid flex-grow w-2/4 pl-5">
                                        Relationship:
                                    </div>
                                    <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1 pl-0">
                                        <div className="p-inputgroup flex-1">
                                            <InputText
                                                type="text"
                                                name='fullname'
                                                placeholder="Type Relationship"
                                                value=""
                                                // onChange={(e) => handleChangeFormValues("email", e.target.value)}
                                                className="input input-ghost w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/4 lg:w-1/4 place-items-center">
                                <div className="grid flex-grow w-2/4 pl-5">
                                    Phone Number:
                                </div>
                                <div className="grid w-2/4 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='address'
                                            placeholder="Type Number"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("address", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-2/6 pl-5">
                                    Legal Status:
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-4/6 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='fullname'
                                            placeholder="Type Other"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            onFocus={(e) => e.currentTarget.select()}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/4 lg:w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                                <div className="flex w-full place-items-center">
                                    <div className="grid flex-grow w-2/4 pl-5">
                                        Marital Status:
                                    </div>
                                    <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1 pl-0">
                                        <div className="p-inputgroup flex-1">
                                            <InputText
                                                type="text"
                                                name='fullname'
                                                placeholder="Type Applicant’s Full Name"
                                                value=""
                                                // onChange={(e) => handleChangeFormValues("email", e.target.value)}
                                                className="input input-ghost w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-2/4 lg:w-1/4 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    Income Source:
                                </div>
                                <div className="grid w-2/4 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='address'
                                            placeholder="Type Applicant’s Full Name"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("address", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='place-items-center text-center m-5'>
                        <b className='border-b-2 border-primary'>MEDICAL INFORMATION</b>
                    </div>

                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-t-2 border-b-2 border-primary">
                            <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-2/6 pl-5">
                                    PCP/Pediatrician:
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-4/6 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='fullname'
                                            placeholder="Type PCP/Pediatrician"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            onFocus={(e) => e.currentTarget.select()}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/4 lg:w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                                <div className="flex w-full place-items-center">
                                    <div className="grid flex-grow w-2/4 pl-5">
                                        Address:
                                    </div>
                                    <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1 pl-0">
                                        <div className="p-inputgroup flex-1">
                                            <InputText
                                                type="text"
                                                name='fullname'
                                                placeholder="Type Address"
                                                value=""
                                                // onChange={(e) => handleChangeFormValues("email", e.target.value)}
                                                className="input input-ghost w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-2/4 lg:w-1/4 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    Phone:
                                </div>
                                <div className="grid w-2/4 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='address'
                                            placeholder="Type Phone"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("address", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-2/6 pl-5">
                                    Psychiatrist:
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-4/6 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='fullname'
                                            placeholder="Type Psychiatrist"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            onFocus={(e) => e.currentTarget.select()}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/4 lg:w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                                <div className="flex w-full place-items-center">
                                    <div className="grid flex-grow w-2/4 pl-5">
                                        Address:
                                    </div>
                                    <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1 pl-0">
                                        <div className="p-inputgroup flex-1">
                                            <InputText
                                                type="text"
                                                name='fullname'
                                                placeholder="Type Address"
                                                value=""
                                                // onChange={(e) => handleChangeFormValues("email", e.target.value)}
                                                className="input input-ghost w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-2/4 lg:w-1/4 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    Phone:
                                </div>
                                <div className="grid w-2/4 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='address'
                                            placeholder="Type Phone"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("address", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-2/6 pl-5">
                                    Pharmacy:
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-4/6 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='fullname'
                                            placeholder="Type Pharmacy"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            onFocus={(e) => e.currentTarget.select()}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/4 lg:w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                                <div className="flex w-full place-items-center">
                                    <div className="grid flex-grow w-2/4 pl-5">
                                        Address:
                                    </div>
                                    <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1 pl-0">
                                        <div className="p-inputgroup flex-1">
                                            <InputText
                                                type="text"
                                                name='fullname'
                                                placeholder="Type Address"
                                                value=""
                                                // onChange={(e) => handleChangeFormValues("email", e.target.value)}
                                                className="input input-ghost w-full text-center"
                                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-2/4 lg:w-1/4 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    Phone:
                                </div>
                                <div className="grid w-2/4 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='address'
                                            placeholder="Type Phone"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("address", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='place-items-center text-center m-5'>
                        <b className='border-b-2 border-primary'>MENTAL HEALTH DIAGNOSIS AXIS I</b>
                    </div>

                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-t-2 border-b-2 border-primary">
                            <div className="flex w-full border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-1/6 pl-5">
                                    Primary:
                                </div>
                                <div className="grid  border-primary w-5/6 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='fullname'
                                            placeholder="Type Primary"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            onFocus={(e) => e.currentTarget.select()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex lg:flex w-full">
                        <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                            <div className="flex w-full border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-1/6 pl-5">
                                    Secondary:
                                </div>
                                <div className="grid  border-primary w-5/6 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <InputText
                                            type="text"
                                            name='fullname'
                                            placeholder="Type Secondary"
                                            value=""
                                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                            onFocus={(e) => e.currentTarget.select()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='place-items-center text-center m-5'>
                        <b className='border-b-2 border-primary'>SERVICES RECOMMENDED</b>
                    </div>
                    <div className='p-3'>
                        <div className="md:flex lg:flex w-full">
                            <div className="flex border-r-2 w-full md:w-2/6 lg:w-2/6 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-1/4">
                                        <InputSwitch
                                            checked
                                        // onChange={(e: InputSwitchChangeEvent) => handleChangeFormRequestnewClient("case_management", e.target.value ?? false)}
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
                                                checked={true}
                                            // onChange={(e: InputSwitchChangeEvent) => handleChangeFormRequestnewClient("individual_therapy", e.target.value ?? false)}
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
                                            checked={false}
                                        // onChange={(e: InputSwitchChangeEvent) => handleChangeFormRequestnewClient("family_therapy", e.target.value ?? false)}
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
                                            checked={false}
                                        // onChange={(e: InputSwitchChangeEvent) => handleChangeFormRequestnewClient("adult_psr", e.target.value ?? false)}
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
                                                checked={false}
                                            // onChange={(e: InputSwitchChangeEvent) => handleChangeFormRequestnewClient("psychiatrist", e.target.value ?? false)}
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
                                                checked={false}
                                            // onChange={(e: InputSwitchChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
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
                </div>
            </div>
            <ScrollTop target="parent" />
        </div>
    );

}
type Props = {
    relad(): void;
    clientInfo;
}
export { Demographic };