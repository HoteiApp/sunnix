// import React, { useState, useEffect, useRef } from 'react';
// import { RequestNewClient } from "../../../../data-types";

const DataRequestNewClients = ({ relad, data }: Props) => {

    return (
        <div className="m-0 border-2 border-primary">
            <div className='p-3 bg-gray-200 border-b-2 border-primary'>
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
                                    {data.referring_agency ? data.referring_agency : "N/A"}
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Referring Person:
                            </div>
                            <div className="grid border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    {data.referring_person ? data.referring_person : "N/A"}                                    
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
                                <div className="grid border-r-2 border-primary w-2/4 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">

                                        <div className="grid w-2/4 pl-4">
                                            Cell/Phone:
                                        </div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                {data.cell_phone  ? data.cell_phone : "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">

                                            <div className="grid w-2/5">
                                                Fax:
                                            </div>
                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    {data.fax  ? data.fax : "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
                            <div className="flex w-full place-items-center">
                                <div className="grid border-r-2 border-primary w-2/4 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">

                                        <div className="grid w-2/4 pl-4">
                                            Email:
                                        </div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                {data.email  ? data.email : "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid w-2/4 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">

                                            <div className="grid w-2/5">
                                                Date:
                                            </div>
                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    {data.date  ? data.date : "N/A"}
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
            <div className='p-3 bg-gray-200 border-b-2 border-primary'>
                <div className='text-2xl tracking-tight place-items-center'>Client Information</div>
            </div>
            <div className="m-0 p-0">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-b-2 border-primary">
                        <div className="flex w-full md:w-2/4 lg:w-2/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *Last Name:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    {data.last_name ? data.last_name : "N/A"}
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                *First Name:
                            </div>
                            <div className="grid w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    {data.first_name ? data.first_name : "N/A"}
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
                                <div className="grid border-r-2 border-primary w-2/4 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">
                                        <div className="grid w-2/4 pl-4">
                                            *Sexo:
                                        </div>
                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                {data.sexo}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-2/5">
                                                *DOB:
                                            </div>

                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    {data.dob}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
                            <div className="flex w-full place-items-center">
                                <div className="grid border-r-2 border-primary w-2/4 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">

                                        <div className="grid w-2/4 pl-4">
                                            *Medicalid:
                                        </div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                {data.medicalid}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid w-2/4 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">

                                            <div className="grid w-2/5">
                                                *Gold Card Number:
                                            </div>
                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    {data.gold_card_number}
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
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        Medicare:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            {data.medicare ? data.medicare : "N/A"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/5">
                                            City:
                                        </div>
                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                {data.city ? data.city : "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">

                                    <div className="grid w-2/4 pl-4">
                                        State:
                                    </div>

                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            {data.state ? data.state : "N/A"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">

                                        <div className="grid w-2/5">
                                            Zip Code:
                                        </div>
                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                {data.zip_code ? data.zip_code : "N/A"}
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
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        Home Phone:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            {data.home_phone_client ? data.home_phone_client : "N/A"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/5">
                                            Cell Phone:
                                        </div>

                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                {data.cell_phone_client ? data.cell_phone_client : "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        Social Security:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            {data.social_security ? data.social_security : "N/A"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/5">
                                            Lenguage:
                                        </div>

                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                {data.lenguage ? data.lenguage : "N/A"}
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
                            <div className="grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        Legal Guardian:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            {data.legal_guardian ? data.legal_guardian : "N/A"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/5">
                                            Relationship:
                                        </div>

                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                {data.relationship ? data.relationship : "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 lg:w-2/4 border-b-2 border-primary">
                        <div className="flex w-full place-items-center">
                            <div className="grid border-r-2 border-primary w-2/4 p-1">
                                <div className="flex w-full place-items-center p-0 m-0">
                                    <div className="grid w-2/4 pl-4">
                                        Contact Information:
                                    </div>
                                    <div className="grid w-2/4">
                                        <div className="p-inputgroup flex-1">
                                            {data.contact_information ? data.contact_information : "N/A"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid w-2/4 p-1">
                                <div className="flex w-full place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="grid w-2/5">
                                            Cell/Phone:
                                        </div>

                                        <div className="grid w-3/5">
                                            <div className="p-inputgroup flex-1">
                                                {data.cell_phone_guardian ? data.cel_phone_guardian : "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 6 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full border-b-2 border-primary">
                        <div className="flex w-full place-items-center p-0 m-0">
                            <div className="grid w-1/4 pl-4">
                                *Reason:
                            </div>
                            <div className="grid w-3/4">
                                <div className="p-inputgroup flex-1">
                                    {data.reason ? data.reason : "N/A"}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* row 7 */}
                <div className="md:flex lg:flex w-full">
                    <div className="w-full">
                        <div className="flex w-full place-items-center p-0 m-0">
                            <div className="grid flex-grow w-2/4 pl-4">
                                *Psych Evaluation, Bio-Psych Evaluation, PCP Evaluation:
                            </div>
                            <div className="grid w-2/4 p-1 pl-0 text-right">
                                <div>
                                    {/* {necesaryDocuments.resume ? (<div>
                                                <Button icon="pi pi-paperclip" label="Resume.pdf" severity="warning" rounded onClick={() => { handleOpenModal() }} />
                                                <Dialog
                                                    header="Resume"
                                                    visible={isOpen}
                                                    maximizable
                                                    style={{ width: '50vw' }}
                                                    breakpoints={{ '960px': '70vw', '641px': '90vw' }}
                                                    onHide={() => setIsOpen(false)}
                                                >
                                                    <p className="m-0">
                                                        <div className='w-full'>
                                                            <iframe src={pdfContent} title="PDF" className='w-full h-screen' />
                                                        </div>
                                                    </p>
                                                </Dialog>

                                            </div>
                                            ) : ( */}
                                    <label htmlFor="file-upload" className='btn btn-warning btn-wide rounded-full'>
                                        <i className="pi pi-upload"></i> &nbsp;&nbsp; Upload
                                        <input
                                            id="file-upload"
                                            type="file"
                                            className="hidden"
                                            accept="application/pdf"
                                        // onChange={handleFileChange}
                                        />
                                    </label>
                                    {/* )} */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
type Props = {
    data;
    relad(): void;
};
export { DataRequestNewClients }