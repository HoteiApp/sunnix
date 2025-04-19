import { useState } from 'react';
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { InputTextarea } from "primereact/inputtextarea";
import { ScrollTop } from 'primereact/scrolltop';
import { InputText } from 'primereact/inputtext';
// import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { CalculateAge } from '../../../../commons';
import { Checkbox } from 'antd';

const Assessment = ({ clientInfo, relad }: Props) => {

    const [radio1, setRadio1] = useState('');
    const [radio2, setRadio2] = useState('');

    return (
        <div className="w-full p-0" style={{ height: '80vh', 'overflow': 'auto' }}>

            <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                TCM
            </div>
            <div className='place-items-center text-center mb-5' style={{ fontSize: "24px" }}>
                INITIAL ASSESSMENT
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
                            <div className="grid flex-grow w-full pl-5">
                                Date of Admission: date

                            </div>
                        </div>
                    </div>

                </div>
                {/* row 2 */}
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-3/5 lg:w-3/5 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                TCM:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    {clientInfo?.first_name} {clientInfo?.last_name}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/5 lg:w-2/5 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                            <div className="flex w-full place-items-center">
                                <div className="grid flex-grow w-full pl-5">
                                    Initial Assessment Development Date: 12/12/2023
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* row 2 */}
                <div className="mt-5 mb-5 p-0 border-2 border-b-0 border-primary">
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
                                <div className="grid flex-grow w-full pl-5">
                                    Medicaid #: {clientInfo.medicaid}
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
                            <div className="flex w-full md:w-1/4 lg:w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="grid flex-grow w-2/6 pl-5">
                                    Client’s Phone Number: {clientInfo.cell_phone_client}
                                </div>
                            </div>
                            <div className="w-full md:w-1/4 lg:w-1/4 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                                <div className="flex w-full place-items-center">
                                    <div className="grid flex-grow w-1/4 pl-5 md:border-l-2 lg:border-l-2 border-primary">
                                        Emergency Contact/ Legal Guardian:
                                        {clientInfo.legal_guardian}
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/4 lg:w-1/4 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5  md:border-l-2 lg:border-l-2 border-primary">
                                    Phone Number:
                                    {clientInfo.cell_phone_guardian}
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/4 lg:w-1/4 place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5  md:border-l-2 lg:border-l-2 border-primary">
                                    Relationship:
                                    {clientInfo.relationship}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>MENTAL HEALTH DIAGNOSIS</b>
                </div>

                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-b-0 border-primary">
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
                        <div className="flex w-full border-2 border-primary md:border-b-0 lg:border-b-0 place-items-center">
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
                    <b className='border-b-2 border-primary'>SOURCES OF INFORMATION</b>
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-primary">
                        <div className="flex w-full md:w-1/5 lg:w-1/5 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                Client:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <Checkbox
                                        className='mr-2'
                                        checked={false}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    Yes
                                    <Checkbox
                                        className='pl-5 mr-2'
                                        checked={false}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    No
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/5 lg:w-1/5 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                            <div className="flex w-full place-items-center">
                                <div className="grid flex-grow w-1/4 pl-5">
                                    DCF:
                                </div>
                                <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                    <div className="p-inputgroup flex-1">
                                        <Checkbox
                                            className='mr-2'
                                            checked={false}
                                        // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                        />
                                        Yes
                                        <Checkbox
                                            className='pl-5 mr-2'
                                            checked={false}
                                        // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                        />
                                        No
                                        <Checkbox
                                            className='pl-5 mr-2'
                                            checked={false}
                                        // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                        />
                                        N/A
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full md:w-3/5 lg:w-3/5 place-items-center">
                            <div className="flex w-full pl-5">
                                Biological Family &Friends (with appropriate consent):

                                <Checkbox
                                    className='ml-2 mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Yes
                                <Checkbox
                                    className='pl-5 mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                No
                                <Checkbox
                                    className='pl-5 mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                N/A


                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-2/6 lg:w-2/6 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-2/4 pl-5">
                                Current Provider/Agency:
                            </div>
                            <div className="grid w-2/4 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <Checkbox
                                        className='mr-2'
                                        checked={false}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    Yes
                                    <Checkbox
                                        className='pl-5 mr-2'
                                        checked={false}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    No
                                    <Checkbox
                                        className='pl-5 mr-2'
                                        checked={false}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    N/A
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full md:w-2/6 lg:w-2/6 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-2/4 pl-5  md:border-l-2 lg:border-l-2 border-primary">
                                School <br />
                                District/Personnel:
                            </div>
                            <div className="grid w-2/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <Checkbox
                                        className='mr-2'
                                        checked={false}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    Yes
                                    <Checkbox
                                        className='pl-5 mr-2'
                                        checked={false}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    No
                                    <Checkbox
                                        className='pl-5 mr-2'
                                        checked={false}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    N/A
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full md:w-2/6 lg:w-2/6 place-items-center">
                            <div className="flex w-full pl-5 md:border-l-2 lg:border-l-2 border-primary">
                                Previous Providers <br />(inpatient and/or outpatient):

                                <Checkbox
                                    className='ml-2 mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Yes
                                <Checkbox
                                    className='pl-5 mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                No
                                <Checkbox
                                    className='pl-5 mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                N/A
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-2/6 lg:w-2/6 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-2/4 pl-5">
                                Foster Family:
                            </div>
                            <div className="grid w-2/4 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <Checkbox
                                        className='mr-2'
                                        checked={false}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    Yes
                                    <Checkbox
                                        className='pl-5 mr-2'
                                        checked={false}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    No
                                    <Checkbox
                                        className='pl-5 mr-2'
                                        checked={false}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    N/A
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full md:w-4/6 lg:w-4/6 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5  md:border-l-2 lg:border-l-2 border-primary">
                                List documents/reports <br />
                                used to satisfy informant source:
                            </div>
                            <div className="grid w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputTextarea
                                        // value={personalInformation.details_questions_in_yes}
                                        // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                        rows={2}
                                        cols={30}
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>PRESENTING PROBLEM(S) and history – Home, School, Community or Work (all that apply).</b>
                </div>
                <div className="w-full bg-gray-100 border-2 border-primary">
                    <InputTextarea
                        // value={personalInformation.details_questions_in_yes}
                        // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                        rows={4}
                        className='w-full'
                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                    />
                </div>

                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>
                        Client’s, Legal Representative’s and Family’s Assessment of Client’s Situation (with appropriate consent):
                    </b>
                </div>
                <div className="w-full bg-gray-100 border-2 border-primary">
                    <InputTextarea
                        // value={personalInformation.details_questions_in_yes}
                        // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                        rows={4}
                        className='w-full'
                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                    />
                </div>
                <div className="md:flex lg:flex w-full mt-5">
                    <div className="md:flex lg:md:flex w-full border-2 border-primary">
                        <div className="flex w-full md:w-3/6 lg:w-3/6 border-b-2 border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-2/4">
                                <div className='w-full border-b-2 border-primary bg-gray-200 pl-5'>List recipient’s strengths, current and potential:</div>
                                <div className='w-full'>
                                    <InputTextarea
                                        // value={personalInformation.details_questions_in_yes}
                                        // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                        rows={5}
                                        className='w-full'
                                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full md:w-3/6 lg:w-3/6 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-1/4 md:border-l-2 lg:border-l-2 border-primary">
                                <div className='w-full border-b-2 border-primary bg-gray-200 pl-5'>List recipient’s weakness:</div>
                                <div className='w-full'>
                                    <InputTextarea
                                        // value={personalInformation.details_questions_in_yes}
                                        // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                        rows={5}
                                        className='w-full'
                                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <br />
                <hr />
                <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                    TCM INITIAL ASSESSMENT
                </div>

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
                            <div className="grid flex-grow w-full pl-5">
                                Date of Admission: date

                            </div>
                        </div>
                    </div>

                </div>
                {/* row 2 */}
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-3/5 lg:w-3/5 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                TCM:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    {clientInfo?.first_name} {clientInfo?.last_name}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/5 lg:w-2/5 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                            <div className="flex w-full place-items-center">
                                <div className="grid flex-grow w-full pl-5">
                                    Initial Assessment Development Date: 12/12/2023
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>List resources that are available to recipient through his/her natural support system:</b>
                    <br />(Support comes from family, friends, pets, neighbors, clergy and others.)
                </div>
                <div className="w-full bg-gray-100 border-2 border-primary">
                    <InputTextarea
                        // value={personalInformation.details_questions_in_yes}
                        // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                        rows={4}
                        placeholder='REMEMBER…. Describe here why you state that client has LACK of Natural Support'
                        className='w-full'
                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                    />
                </div>
                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>PSYCHOSOCIAL/FAMILY HISTORY:</b>
                </div>
                <div className="w-full border-2 border-primary p-5">
                    <b>1 -Living arrangement:</b><br />
                    <div className='pl-10'>
                        A)
                        <RadioButton className='ml-2' inputId="ingredient2" name="radio2" value="opt1" onChange={(e) => setRadio2(e.value)} checked={radio2 === 'opt1'} /> House
                        <RadioButton className='ml-2' inputId="ingredient2" name="radio2" value="opt2" onChange={(e) => setRadio2(e.value)} checked={radio2 === 'opt2'} /> Apartment
                        <RadioButton className='ml-2' inputId="ingredient2" name="radio2" value="opt3" onChange={(e) => setRadio2(e.value)} checked={radio2 === 'opt3'} /> Townhouse
                        <RadioButton className='ml-2' inputId="ingredient2" name="radio2" value="opt4" onChange={(e) => setRadio2(e.value)} checked={radio2 === 'opt4'} /> Trailer
                        <RadioButton className='ml-2' inputId="ingredient2" name="radio2" value="opt5" onChange={(e) => setRadio2(e.value)} checked={radio2 === 'opt5'} /> Other
                        <b className='pl-5'>Type:</b>
                        <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Room
                        <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> Bath

                        <br />
                        B) How many persons live with client/relationship:
                        <InputText
                            type="number"
                            name='b'
                            value="2"
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0, height: 12 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />

                        <br />
                        <div className='flex'>
                            <div className='w-1/6'>
                                C) Shares room
                            </div>
                            <div className='w-1/6'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>

                            <b className='pl-5'>How many persons live with client/relationship:</b>
                            <InputText
                                type="number"
                                name='b'
                                value="2"
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="text-center"
                                style={{ backgroundColor: "#e5ecfc", border: 0, height: 12 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        </div>

                        <div className='flex'>
                            <div className='w-1/6'>
                                D) Shares bed
                            </div>
                            <div className='w-1/6'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>

                            <b className='pl-5'>How many person shares bed:</b>
                            <InputText
                                type="number"
                                name='b'
                                value="2"
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="text-center"
                                style={{ backgroundColor: "#e5ecfc", border: 0, height: 12 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        </div>
                        <div className='flex'>
                            <div className='w-1/6'>
                                E) Transportation
                            </div>
                            <div className='w-1/6'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>

                            <b className='pl-5'>If yes, type:</b>
                            <InputText
                                type="text"
                                name='b'
                                value="2"
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="text-center"
                                style={{ backgroundColor: "#e5ecfc", border: 0, height: 12 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        </div>
                    </div>
                    <b>2- Income:</b><br />
                    <div className='pl-10'>
                        A) Main sources of income for client and/or family/how much?
                        <InputText
                            type="text"
                            name='b'
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="text-center w-2/4"
                            style={{ backgroundColor: "#e5ecfc", border: 0, height: 14 }}
                            onFocus={(e) => e.currentTarget.select()}
                        /><br />
                        B) Are the client and/or family currently having financial difficulties?
                        <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                        <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                    </div>
                    <b>3- Employed:</b>
                    <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                    <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                    <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> N/A
                    <b className='pl-5'> If yes, describe:</b>
                    <InputText
                        type="text"
                        name='b'
                        value=""
                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                        className="text-center w-2/4"
                        style={{ backgroundColor: "#e5ecfc", border: 0, height: 14 }}
                        onFocus={(e) => e.currentTarget.select()}
                    />
                    <br />
                    <b>4- Marital Status:</b>
                    <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Single
                    <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> Married
                    <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt3" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt3'} /> Separete
                    <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt4" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt4'} /> Divorced
                    <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt5" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt5'} /> Widiwed
                    <br />
                    <b>5- Psychological stressors:</b>
                    <div className='w-full md:flex lg:flex'>
                        <div className='w-1/4'>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Lack of Family Support
                            </div>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Divorce
                            </div>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Financial Problems
                            </div>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Legal Problems
                            </div>
                        </div>
                        <div className='w-1/4'>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Homelessness
                            </div>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Marital Conflict
                            </div>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Losses
                            </div>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Sexual Abuse
                            </div>
                        </div>
                        <div className='w-1/4'>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Traumatic Stress
                            </div>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Domestic Violence
                            </div>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Unemployment
                            </div>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Medical problems
                            </div>
                        </div>
                        <div className='w-1/5'>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Housing Issues
                            </div>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Transportation
                            </div>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Grief
                            </div>
                            <div className="flex w-full place-items-center">
                                <Checkbox
                                    className='mr-2'
                                    checked={false}
                                // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                />
                                Sexuality
                            </div>
                        </div>
                    </div>
                </div>
                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>PSYCHIATRIC/MEDICAL HISTORY (including Medications and Side Effects):</b>
                </div>
                <div className="w-full border-2 border-primary p-2">
                    Client:
                    <div className='w-full border-2 border-primary'>
                        <div className='flex w-full'>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>In other country:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>Onset of Problem:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'></div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>In USA:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>Onset of Problem:</div>
                            <div className='w-1/6'></div>
                        </div>
                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'><b>Has had Mental Health Problems:</b></div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'><b>Has had Mental health Problems:</b></div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-2/6 border-r-2 border-primary'>
                                Which one:
                                <InputTextarea
                                    // value={personalInformation.details_questions_in_yes}
                                    // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                    rows={2}
                                    cols={30}
                                    className='w-full'
                                    style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                                />
                            </div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>

                            </div>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>
                                Which one:
                                <InputTextarea
                                    // value={personalInformation.details_questions_in_yes}
                                    // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                    rows={2}
                                    cols={30}
                                    className='w-full'
                                    style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                                />
                            </div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>

                            </div>
                        </div>

                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has taken medications:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has taken medications:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>

                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has had Psychiatric follow up:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has had Psychiatric follow up:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>

                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has had hospitalization:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has had hospitalization:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>

                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has had meds side effects:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has had meds side effects:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className='flex w-full border-t-2 border-primary bg-gray-200 p-3'>
                        </div>
                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'><b>Has had Medical Problems:</b></div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'><b>Has had Medical Health Problems</b></div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-2/6 border-r-2 border-primary'>
                                Which one:
                                <InputTextarea
                                    // value={personalInformation.details_questions_in_yes}
                                    // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                    rows={2}
                                    cols={30}
                                    className='w-full'
                                    style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                                />
                            </div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>

                            </div>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>
                                Which one:
                                <InputTextarea
                                    // value={personalInformation.details_questions_in_yes}
                                    // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                    rows={2}
                                    cols={30}
                                    className='w-full'
                                    style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                                />
                            </div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>

                            </div>
                        </div>
                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has taken medications:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has taken medications:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has had Medical/PCP follow up:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has had Medical/PCP follow up:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has had hospitalization:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has had hospitalization:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has had meds side effects:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                            <div className='w-2/6 border-r-2 border-primary place-items-center text-center'>Has had meds side effects:</div>
                            <div className='w-1/6 border-r-2 border-primary place-items-center text-center'>
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                    </div>
                    Family:
                    <div className='w-full border-2 border-primary'>
                        <div className='flex w-full'>
                            <div className='w-1/5 border-r-2 border-primary place-items-center text-center'><b>Family Member</b></div>
                            <div className='w-2/5 border-r-2 border-primary place-items-center text-center'><b>Mental Problems</b></div>
                            <div className='w-2/5 border-r-2 border-primary place-items-center text-center'><b>Medical Problems</b></div>
                        </div>
                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-1/5 border-r-2 border-primary place-items-center text-center'>Mother:</div>
                            <div className='w-2/5 border-r-2 border-primary place-items-center text-center'>
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                            <div className='w-2/5 border-r-2 border-primary place-items-center text-center'>
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-1/5 border-r-2 border-primary place-items-center text-center'>Father:</div>
                            <div className='w-2/5 border-r-2 border-primary place-items-center text-center'>
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                            <div className='w-2/5 border-r-2 border-primary place-items-center text-center'>
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-1/5 border-r-2 border-primary place-items-center text-center'>Siblings:</div>
                            <div className='w-2/5 border-r-2 border-primary place-items-center text-center'>
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                            <div className='w-2/5 border-r-2 border-primary place-items-center text-center'>
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className='flex w-full border-t-2 border-primary'>
                            <div className='w-1/5 border-r-2 border-primary place-items-center text-center'>Other Relatives:</div>
                            <div className='w-2/5 border-r-2 border-primary place-items-center text-center'>
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                            <div className='w-2/5 border-r-2 border-primary place-items-center text-center'>
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
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
                <br />
                <hr />
                <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                    TCM INITIAL ASSESSMENT
                </div>
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
                            <div className="grid flex-grow w-full pl-5">
                                Date of Admission: date

                            </div>
                        </div>
                    </div>

                </div>
                {/* row 2 */}
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-3/5 lg:w-3/5 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                TCM:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    {clientInfo?.first_name} {clientInfo?.last_name}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/5 lg:w-2/5 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                            <div className="flex w-full place-items-center">
                                <div className="grid flex-grow w-full pl-5">
                                    Initial Assessment Development Date: 12/12/2023
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <br /><br />
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-primary">
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full pl-5 place-items-center text-center">
                                CURRENT MEDICATION(S):
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full pl-5 place-items-center text-center">
                                DOSAGE/FREQUENCY
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                            <div className="grid flex-grow w-full pl-5 place-items-center text-center">
                                PRESCRIBING PHYSICIAN:
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
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
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
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
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
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
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
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
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
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
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
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
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
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
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
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
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
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
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost w-full text-center"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/3 lg:w-1/3 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
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

                <div className="md:flex lg:flex w-full bg-gray-300 p-2 pl-5 border-2 border-t-0 border-primary">
                    SUBSTANCE ABUSE HISTORY:
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full w-2/6 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Substance
                            </div>
                        </div>

                        <div className="flex w-full w-2/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Substance
                            </div>
                        </div>

                        <div className="flex w-full w-2/6 place-items-center border-r-2 border-primary">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Substance
                            </div>
                        </div>

                    </div>
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-2/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Alcohol (Beer, wine, liquors)
                            </div>
                        </div>
                        <div className="flex border-r-2 border-primary">
                            <div className="flex place-items-center text-center">
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className="flex w-2/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Methadone, Heroin
                            </div>
                        </div>
                        <div className="flex place-items-center border-r-2 border-primary">
                            <div className="flex place-items-center text-center">
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className="flex w-2/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Stimulants (Caffeine, Speed)
                            </div>
                        </div>
                        <div className="flex place-items-center">
                            <div className="flex place-items-center text-center">
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-2/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Hallucinogens (LSD, PCP)
                            </div>
                        </div>
                        <div className="flex place-items-center border-r-2 border-primary">
                            <div className="flex place-items-center text-center">
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className="flex w-2/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Narcotics (i.e. Codeine)
                            </div>
                        </div>
                        <div className="flex place-items-center border-r-2 border-primary">
                            <div className="flex place-items-center text-center">
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className="flex w-2/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Tranquilizers (i.e. Valium)
                            </div>
                        </div>
                        <div className="flex place-items-center">
                            <div className="flex place-items-center text-center">
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-2/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Inhalants (glue, butane)
                            </div>
                        </div>
                        <div className="flex place-items-center border-r-2 border-primary">
                            <div className="flex place-items-center text-center">
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className="flex w-2/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Pain Killer Pills (Darvon, Talwin)
                            </div>
                        </div>
                        <div className="flex place-items-center border-r-2 border-primary">
                            <div className="flex place-items-center text-center">
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className="flex w-2/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Other
                            </div>
                        </div>
                        <div className="flex place-items-center">
                            <div className="flex place-items-center text-center">
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-2/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Marijuana, hashish
                            </div>
                        </div>
                        <div className="flex place-items-center border-r-2 border-primary">
                            <div className="flex place-items-center text-center">
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className="flex w-2/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Sleeping Pills
                            </div>
                        </div>
                        <div className="flex place-items-center border-r-2 border-primary">
                            <div className="flex place-items-center text-center">
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className="flex w-2/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Other
                            </div>
                        </div>
                        <div className="flex place-items-center">
                            <div className="flex place-items-center text-center">
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-1/6 place-items-center">
                            <div className="grid flex-grow w-full place-items-center text-center">
                                Family:
                            </div>
                        </div>
                        <div className="flex w-5/6 place-items-center">
                            <div className="flex w-full place-items-center text-center">
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
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
                <br />
                <div className="md:flex lg:flex w-full bg-gray-300 p-2 pl-5 border-2 border-primary">
                    EDUCATIONAL ASSESSMENT (to include adjustment and progress, if applicable):
                </div>
                <div className="md:flex lg:flex w-full pl-5 border-2 border-t-0 border-primary">
                    <div className='border-r-2 border-primary w-1/2 flex place-items-center'>
                        <div className='w-2/6'>Primary Language Spoken:</div>
                        <div className='w-4/6'>
                            <InputText
                                type="text"
                                name='fullname'
                                placeholder="Type"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost text-center w-full"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        </div>
                    </div>
                    <div className='w-1/2 flex place-items-center'>
                        <div className='w-2/6 pl-5'>Other Languages Spoken:</div>
                        <div className='w-4/6'>
                            <InputText
                                type="text"
                                name='fullname'
                                placeholder="Type"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost text-center w-full"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full pl-5 border-2 border-t-0 border-primary">
                    <div className='border-r-2 border-primary w-1/3 flex place-items-center'>
                        <div className='w-2/6'>Current School:</div>
                        <div className='w-4/6'>
                            <InputText
                                type="text"
                                name='fullname'
                                placeholder="Type"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost text-center w-full"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        </div>
                    </div>
                    <div className='border-r-2 border-primar w-1/3 flex place-items-center'>
                        <div className='w-2/6 pl-5'>Grade Level:</div>
                        <div className='w-4/6 border-r-2 border-primary'>
                            <InputText
                                type="text"
                                name='fullname'
                                placeholder="Type"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost text-center w-full"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        </div>
                    </div>
                    <div className='w-1/3 flex place-items-center'>
                        <div className='w-2/6 pl-5'>Special Ed?</div>
                        <div className='w-4/6'>
                            <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                            <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> SED
                            <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt3'} /> Eh
                            <RadioButton className='ml-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt4'} /> L
                        </div>
                    </div>
                </div>
                <div className="w-full border-2 border-t-0 border-primary">
                    <p className='pl-5'>List grades repeated, history/dates of suspensions & expulsions (include adjustment and progress, if applicable):</p>
                    <InputTextarea
                        // value={personalInformation.details_questions_in_yes}
                        // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                        rows={3}
                        className='w-full'
                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                    />
                </div>
                <div className="md:flex lg:flex w-full bg-gray-300 p-2 pl-5 border-2 border-t-0 border-primary">
                    WORK ASSESSMENT (to include adjustment and progress, if applicable):
                </div>
                <div className="md:flex lg:flex w-full pl-5 border-2 border-t-0 border-primary">
                    <div className='border-r-2 border-primary w-1/3 flex place-items-center'>
                        <div className='w-2/6'>Current Work:</div>
                        <div className='w-4/6'>
                            <InputText
                                type="text"
                                name='fullname'
                                placeholder="Type"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost text-center w-full"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        </div>
                    </div>
                    <div className='border-r-2 border-primar w-1/3 flex place-items-center'>
                        <div className='w-2/6 pl-5'>Position:</div>
                        <div className='w-4/6 border-r-2 border-primary'>
                            <InputText
                                type="text"
                                name='fullname'
                                placeholder="Type"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost text-center w-full"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        </div>
                    </div>
                    <div className='w-1/3 flex place-items-center'>
                        <div className='w-2/6 pl-5'>Time on work</div>
                        <div className='w-4/6'>
                            <InputText
                                type="text"
                                name='fullname'
                                placeholder="Type"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost text-center w-full"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full border-2 border-t-0 border-primary">
                    <p className='pl-5'>List history/dates of job problems or success (include adjustment and progress, if applicable):</p>
                    <InputTextarea
                        // value={personalInformation.details_questions_in_yes}
                        // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                        rows={3}
                        className='w-full'
                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                    />
                </div>
                <br />
                <div className="md:flex lg:flex w-full bg-gray-300 p-2 pl-5 border-2 border-primary">
                    Services being provided through the following agencies/programs:
                </div>
                <div className="md:flex lg:flex w-full pl-5 border-2 border-t-0 border-primary place-items-center">
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> AA/NA
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> SSA
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> CHARLEE
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> Children’s Home Society
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> Other:
                    <InputText
                        type="text"
                        name='fullname'
                        placeholder="Type"
                        value=""
                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                        className="input input-ghost text-center w-full"
                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                        onFocus={(e) => e.currentTarget.select()}
                    />
                </div>
                <div className="md:flex lg:flex w-full pl-5 border-2 border-t-0 border-primary place-items-center">
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> DCF
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> Section 8
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> CHURCH
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> Foster Care
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> Juvenile Justice
                </div>
                <br />
                <div className="md:flex lg:flex w-full bg-gray-300 p-2 pl-5 border-2 border-primary">
                    DESCRIBE CLIENT’S RELATIONSHIP WITH FAMILY AND SIGNIFICANT OTHERS
                </div>
                <div className="md:flex lg:flex w-full pl-5 border-2 border-t-0 border-primary">
                    <div className='border-r-2 border-primary w-2/4 place-items-center'>
                        <div className='w-full'>Does client seek friendships with peers/others?</div>
                        <div className='w-4/6 flex '>
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                        </div>
                    </div>

                    <div className='w-2/4 place-items-center'>
                        <div className='w-2/6 pl-5'>Is the client considered:</div>
                        <div className='w-4/6 flex'>
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> a leader
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> a follower
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full pl-5 border-2 border-t-0 border-primary">
                    <div className='border-r-2 border-primary w-2/4 place-items-center'>
                        <div className='w-full'>Do peers/others seek client out for friendships?</div>
                        <div className='w-4/6 flex '>
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                        </div>
                    </div>

                    <div className='w-2/4 place-items-center'>
                        <div className='pl-5'>Has client had any gang involvement, past or present?</div>
                        <div className='w-4/6 flex'>
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes, indicate
                            <InputText
                                type="text"
                                name='fullname'
                                placeholder="past or present"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full pl-5 border-2 border-t-0 border-primary">
                    Client associates/plays primarily with children/adults that are:
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Chronological Age
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Younger
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Older
                </div>
                <div className="md:flex lg:flex w-full pl-5 border-2 border-t-0 border-primary">
                    Does client have at least one close friendship/relationship?
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                    <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> No
                    <p className='pl-5'>If so, how many?</p>
                    <InputText
                        type="text"
                        name='fullname'
                        placeholder=""
                        value=""
                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                        className="input input-ghost text-center h-6"
                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                        onFocus={(e) => e.currentTarget.select()}
                    />
                </div>
                <div className="w-full border-2 border-t-0 border-primary">
                    <p className='pl-5'>Describe a little about client:</p>
                    <InputTextarea
                        // value={personalInformation.details_questions_in_yes}
                        // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                        placeholder='DONT LET THIS SPACE IN BLANC'
                        rows={3}
                        className='w-full'
                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                    />
                </div>

                <br />
                <hr />
                <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                    TCM INITIAL ASSESSMENT
                </div>

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
                            <div className="grid flex-grow w-full pl-5">
                                Date of Admission: date
                            </div>
                        </div>
                    </div>
                </div>
                {/* row 2 */}
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                        <div className="flex w-full md:w-3/5 lg:w-3/5 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">
                                TCM:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    {clientInfo?.first_name} {clientInfo?.last_name}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/5 lg:w-2/5 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                            <div className="flex w-full place-items-center">
                                <div className="grid flex-grow w-full pl-5">
                                    Initial Assessment Development Date: 12/12/2023
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="md:flex lg:flex w-full bg-gray-300 p-2 pl-5 border-2 border-primary">
                    ASSESSMENT OF THE RECIPIENT’S & FAMILY’S NEEDS FOR SERVICES:
                </div>
                <div className="md:flex lg:flex w-full border-2 border-t-0 border-primary">
                    <div className='flex border-r-2 border-primary w-2/4 place-items-center'>
                        <div className='w-1/2 pl-5 place-items-center'>
                            Therapy:
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                        </div>
                        <div className='w-1/2 flex justify-end pr-5 place-items-center'>
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Individual
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> Family
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> Group
                        </div>
                    </div>

                    <div className='flex w-2/4 place-items-center'>
                        <div className='w-2/3 pl-5'>
                            Psychotropic Medication Management:
                        </div>
                        <div className='w-1/3 flex justify-end pr-5 place-items-center'>
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full border-2 border-t-0 border-primary">
                    <div className='flex border-r-2 border-primary w-2/4 place-items-center'>
                        <div className='w-2/3 pl-5'>
                            Substance Abuse Treatment:
                        </div>
                        <div className='w-1/3 flex justify-end pr-5 place-items-center'>
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                        </div>
                    </div>

                    <div className='flex w-2/4 place-items-center'>
                        <div className='w-2/3 pl-5'>
                            Family Support & Family Education:
                        </div>
                        <div className='w-1/3 flex justify-end pr-5 place-items-center'>
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full border-2 border-t-0 border-primary">
                    <div className='flex border-r-2 border-primary w-2/4 place-items-center'>
                        <div className='w-2/3 pl-5'>
                            Medical & Dental Services:
                        </div>
                        <div className='w-1/3 flex justify-end pr-5 place-items-center'>
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                        </div>
                    </div>

                    <div className='flex w-2/4 place-items-center'>
                        <div className='w-2/3 pl-5'>
                            Housing/Food/Clothing/Transportation:
                        </div>
                        <div className='w-1/3 flex justify-end pr-5 place-items-center'>
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full border-2 border-t-0 border-primary">
                    <div className='flex border-r-2 border-primary w-2/4 place-items-center'>
                        <div className='w-2/3 pl-5'>
                            Educational/Vocational/Job Training:
                        </div>
                        <div className='w-1/3 flex justify-end pr-5 place-items-center'>
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                        </div>
                    </div>

                    <div className='flex w-2/4 place-items-center'>
                        <div className='w-2/3 pl-5'>
                            Legal Assistance:
                        </div>
                        <div className='w-1/3 flex justify-end pr-5 place-items-center'>
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:flex w-full border-2 border-t-0 border-primary">
                    <div className='flex border-r-2 border-primary w-2/4 place-items-center'>
                        <div className='w-2/3 pl-5'>
                            Development of Environmental Supports:
                            <i>
                                (i.e. support groups, peer groups, activities, community services, friends, landlords, employers)
                            </i>
                        </div>
                        <div className='w-1/3 flex justify-end pr-5 place-items-center'>
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                            <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                        </div>
                    </div>

                    <div className='w-2/4 place-items-center'>
                        <div className='flex w-full place-items-center border-b-2 border-primary'>
                            <div className='w-2/3 pl-5'>
                                Assistance in Establishing Financial Resources:
                            </div>
                            <div className='w-1/3 flex justify-end pr-5 place-items-center'>
                                <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                        <div className='flex w-full place-items-center'>
                            <div className='w-2/3 pl-5'>
                                Assistance in Establishing Financial Resources:
                            </div>
                            <div className='w-1/3 flex justify-end pr-5 place-items-center'>
                                <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} /> Yes
                                <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} /> No
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="md:flex lg:flex w-full bg-gray-300 p-2 pl-5 border-2 border-primary">
                    Discussion of Assessment of the Client’s Needs and Functioning Abilities:
                </div>
                <div className="md:flex lg:flex w-full border-2 border-t-0 border-primary">
                    <InputTextarea
                        // value={personalInformation.details_questions_in_yes}
                        // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                        // placeholder='DONT LET THIS SPACE IN BLANC'
                        rows={3}
                        className='w-full'
                        style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                    />
                </div>
                <div className="md:flex lg:flex w-full bg-gray-300 p-2 pl-5 border-2 border-t-0 border-primary">
                    Describe the services currently being provided and the effectiveness of the services:
                </div>
                <div className="md:flex lg:flex w-full border-2 border-t-0 border-primary  place-items-center">
                    <div className='w-1/6 pl-5 place-items-center'>1-Psychiatrist:</div>
                    <div className='w-5/6'>
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder="Type"
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost text-center w-full"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                <div className="md:flex lg:flex w-full border-2 border-t-0 border-primary  place-items-center">
                    <div className='w-1/6 pl-5 place-items-center'>2-PCP:</div>
                    <div className='w-5/6'>
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder="Type"
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost text-center w-full"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                <div className="md:flex lg:flex w-full border-2 border-t-0 border-primary  place-items-center">
                    <div className='w-1/6 pl-5 place-items-center'>3-PSR/IT/GT:</div>
                    <div className='w-5/6'>
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder="Type"
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost text-center w-full"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                <div className="md:flex lg:flex w-full border-2 border-t-0 border-primary  place-items-center">
                    <div className='w-1/6 pl-5 place-items-center'>4-Other:</div>
                    <div className='w-5/6'>
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder="Type"
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost text-center w-full"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>INITIAL ASSESSMENT SIGNATURES</b>
                </div>
                <div className="md:flex lg:flex w-full border-2 border-primary  place-items-center">
                    <div className='place-items-center'>
                        <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt1" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt1'} />
                    </div>
                    <div className='w-full flex place-items-center border-l-2 border-primary'>
                        <div className='w-full place-items-center'>
                            <div className='w-full place-items-center flex'>
                                <p className='w-3/4 pl-5'>
                                    Case Manager was unable to complete home visit due to:
                                </p>
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost text-center w-1/4"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                OR
                <div className="md:flex lg:flex w-full border-2 border-primary  place-items-center">
                    <div className='place-items-center'>
                        <RadioButton className='ml-2 mr-2' inputId="ingredient" name="radio1" value="opt2" onChange={(e) => setRadio1(e.value)} checked={radio1 === 'opt2'} />
                    </div>
                    <div className='w-full flex place-items-center border-l-2 border-primary'>
                        <div className='w-full place-items-center'>
                            <div className='w-full border-b-2 border-primary place-items-center flex'>
                                <p className='w-2/4 pl-5'>
                                    Case Manager was unable to complete home visit due to:
                                </p>
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Type"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost text-center w-2/4"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                            <div className='w-full flex place-items-center'>
                                <p className='w-3/4 pl-5'>
                                    However, a face to face interview was conducted on:
                                </p>
                                <InputText
                                    type="text"
                                    name='fullname'
                                    placeholder="Date"
                                    value=""
                                    // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                    className="input input-ghost text-center w-1/4"
                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                    onFocus={(e) => e.currentTarget.select()}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <br />
                <div className="flex w-full mt-5">
                    <div className="w-1/5 text-center place-items-center">
                        Signature
                    </div>
                    <div className="w-2/5 text-center ml-5 place-items-center">
                        name
                    </div>
                    <div className="w-1/5 text-center ml-5 place-items-center">
                        CBHCM
                    </div>

                    <div className="w-1/5 ml-5 place-items-center">
                        <div className='text-center'>
                            2121
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 text-center place-items-center border-t-2 border-primary">
                        Signature
                    </div>
                    <div className="w-2/5 text-center place-items-center ml-5 border-t-2 border-primary">
                        Case Manager
                    </div>
                    <div className="w-1/5 text-center place-items-center ml-5  border-t-2 border-primary">

                    </div>

                    <div className="w-1/5 place-items-center border-t-2 ml-5 border-primary">
                        <div className='text-center'>
                            Date
                        </div>
                    </div>
                </div>

                <div className="flex w-full mt-5">
                    <div className="w-1/5 text-center place-items-center">
                        Signature
                    </div>
                    <div className="w-2/5 text-center ml-5 place-items-center">
                        name
                    </div>
                    <div className="w-1/5 text-center ml-5 place-items-center">
                        CBHCMS
                    </div>

                    <div className="w-1/5 ml-5 place-items-center">
                        <div className='text-center'>
                            2121
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 text-center place-items-center border-t-2 border-primary">
                        Signature
                    </div>
                    <div className="w-2/5 text-center place-items-center ml-5 border-t-2 border-primary">
                        Case Manager Supervisor
                    </div>
                    <div className="w-1/5 text-center place-items-center ml-5  border-t-2 border-primary">

                    </div>

                    <div className="w-1/5 place-items-center border-t-2 ml-5 border-primary">
                        <div className='text-center'>
                            Date
                        </div>
                    </div>
                </div>

                <br />
            </div>
            <ScrollTop target="parent" />
        </div>
    );

}
type Props = {
    relad(): void;
    clientInfo;
}
export { Assessment };