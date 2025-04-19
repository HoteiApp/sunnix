import React, { useEffect, useState } from 'react';
// import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { InputTextarea } from "primereact/inputtextarea";
import { ScrollTop } from 'primereact/scrolltop';
import { InputText } from 'primereact/inputtext';
// import { ClientInfo } from '../../../../data-types';
import { Checkbox } from 'antd';
// import { CalculateAge } from '../../../../commons';

const Sp = ({ clientInfo, relad }: Props) => {

    const [radio1, setRadio1] = useState('');
    const [radio2, setRadio2] = useState('');
    const [select, setSelect] = useState(false);


    return (
        <div className="w-full p-0" style={{ height: '80vh', 'overflow': 'auto' }}>

            <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                TCM SERVICES
            </div>
            <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                INITIAL SERVICE PLAN
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
                                    Initial SP Development Date: 12/12/2023
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>SECTION I: DIAGNOSIS</b>
                </div>
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-primary">
                        <div className="flex w-full md:w-2/5 lg:w-2/5 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-2/4 pl-5">
                                ICD 10: Axis I Code:
                            </div>
                            <div className="grid  md:border-r-2 lg:border-r-2 border-primary w-2/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder="Type Code"
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-3/5 lg:w-3/5 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                            <div className="flex w-full place-items-center">
                                <div className="flex w-full place-items-center">
                                    <div className="grid flex-grow pl-5">
                                        Description:
                                    </div>
                                    <div className="grid w-full p-1 pl-0">
                                        <div className="p-inputgroup flex-1">
                                            <InputText
                                                type="text"
                                                name='fullname'
                                                placeholder="Type description"
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
                    </div>

                </div>
            </div>
            <div className='place-items-center text-center m-5'>
                <b className='border-b-2 border-primary'>SECTION II: SERVICE AREA NEEDS:</b>
            </div>
            <div className="md:flex lg:flex w-full">
                <div className="md:flex lg:md:flex w-full border-2 border-b-0 border-primary">
                    <div className='w-full md:w-1/4 lg:w-1/4 md:border-r-2 lg:border-r-2 border-primary'>
                        <div className='bg-gray-200 pl-5 border-b-2 border-primary'>
                            <b>1. Psychological</b>
                        </div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> A. Emotional, Behavior</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> B. Cognitive Difficulties</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> C. Psychiatric Needs</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> D. Substance Abuse</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> E. Psycho Sexual</div>
                        <div className='pl-5'><Checkbox className='mr-2' checked={false} /> F. Other</div>
                    </div>
                    <div className='w-full md:w-1/4 lg:w-1/4 md:border-r-2 lg:border-r-2 border-primary'>
                        <div className='bg-gray-200 pl-5 border-b-2 border-primary'>
                            <b>2. Medical/Dental</b>
                        </div>
                        <div className='pl-5 pr-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} />
                            A. Medical Needs
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                        <div className='pl-5 pr-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> B. Dental Needs</div>
                        <div className='pl-5 pr-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> C. Vision Needs</div>
                        <div className='pl-5 pr-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} /> D. Specialist Needs
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                        <div className='pl-5 pr-5'>
                            <Checkbox className='mr-2' checked={false} /> E. Other
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                    </div>
                    <div className='w-full md:w-1/4 lg:w-1/4 md:border-r-2 lg:border-r-2 border-primary'>
                        <div className='bg-gray-200 pl-5 border-b-2 border-primary'>
                            <b>3. Financial Resources</b>
                        </div>
                        <div className='pl-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} /> A. Housing
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                        <div className='pl-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} /> B. Utilities and Expenses
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                        <div className='pl-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} /> C. Economic Assistance
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                        <div className='pl-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} /> D. Transportation
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                        <div className='pl-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} /> E. Other/Daycare
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                        <div className='pl-5'>
                            <Checkbox className='mr-2' checked={false} /> F. Food/Clothing/Other
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                    </div>
                    <div className='w-full md:w-1/4 lg:w-1/4'>
                        <div className='bg-gray-200 pl-5 border-b-2 border-primary'>
                            <b>4. Environmental Supports</b>
                        </div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> A. Sports Programs</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> B. Afterschool Programs</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> C. Mentoring</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> D. Employment</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> E. Summer Camp</div>
                        <div className='pl-5'><Checkbox className='mr-2' checked={false} /> F. Tutoring</div>
                    </div>
                </div>
            </div>
            <div className="md:flex lg:flex w-full">
                <div className="md:flex lg:md:flex w-full border-2 border-primary">
                    <div className='w-full md:w-1/4 lg:w-1/4 md:border-r-2 lg:border-r-2 border-primary'>
                        <div className='bg-gray-200 pl-5 border-b-2 border-primary'>
                            <b>5. Permanency</b>
                        </div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> A. DCF Dependency Legal Services</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> B. Independent Living Needs</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> C. Therapeutic Supervise Family Visitation</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> D. Supervised Family Visitation and Contact</div>
                        <div className='pl-5 pr-5'><Checkbox className='mr-2' checked={false} /> E. Other
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                    </div>
                    <div className='w-full md:w-1/4 lg:w-1/4 md:border-r-2 lg:border-r-2 border-primary'>
                        <div className='bg-gray-200 pl-5 border-b-2 border-primary'>
                            <b>6. Educational Vocational</b>
                        </div>
                        <div className='pl-5 pr-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} />
                            A. General Education
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                        <div className='pl-5 pr-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> B. Academic Difficulties</div>
                        <div className='pl-5 pr-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> C. School Attendance Difficulties</div>
                        <div className='pl-5 pr-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} /> D. Peer Difficulties
                        </div>
                        <div className='pl-5 pr-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} /> E. Vocational Training
                        </div>
                        <div className='pl-5 pr-5'>
                            <Checkbox className='mr-2' checked={false} /> F. Placement Issues
                        </div>
                    </div>
                    <div className='w-full md:w-1/4 lg:w-1/4 md:border-r-2 lg:border-r-2 border-primary'>
                        <div className='bg-gray-200 pl-5 border-b-2 border-primary'>
                            <b>7. Legal Assistance</b>
                        </div>
                        <div className='pl-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} /> A. Eviction
                        </div>
                        <div className='pl-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} /> B. Immigration Issues
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                        <div className='pl-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} /> C. Custody
                        </div>
                        <div className='pl-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} /> D. Department of Juvenile Justice
                        </div>
                        <div className='pl-5 border-b-2 border-primary'>
                            <Checkbox className='mr-2' checked={false} /> E. Other
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                    </div>
                    <div className='w-full md:w-1/4 lg:w-1/4'>
                        <div className='bg-gray-200 pl-5 border-b-2 border-primary'>
                            <b>8. Family Supports</b>
                        </div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> A. Psychological and Psychiatric Needs</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> B. Employment Needs</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> C. Vocational Needs</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> D. Literacy Needs</div>
                        <div className='pl-5 border-b-2 border-primary'><Checkbox className='mr-2' checked={false} /> E. Other
                            {select && <InputText
                                type="text"
                                name='fullname'
                                // placeholder="Type description"
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-full text-center h-6"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <hr />
            <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                INITIAL SERVICE PLAN
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
                                    Initial SP Development Date: 12/12/2023
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>SECTION III: SHORT TERM GOALS-OBJECTIVES</b>
                </div>
                <div className="w-full text-justify">
                    The following objectives has been developed According with TCM Medicaid Handbook Section 2-15 and 2-17 to comply with Service Plan/Service Plan
                    Review/Addendums documentation polices. SUNISS UP determined that each individualized Long-Term Goal developed on this Service Plan
                    and corresponding Addendums will have implicit each of those Objectives described with corresponding tasks according the nature of
                    each Need and Goal. The Objectives showed wide range of activities which could be developed by TCM with the active participation of the
                    client during follow up process. Objectives described will have the same Start and Target Dates of each Goal from this Service Plan/Addendum.
                </div>
                <br />
                {/* Objetieve 1 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5 bg-gray-200">
                            <b>Objective 1</b><br />
                            <i>Task (who will do what)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary pl-5">
                            Advocating for the acquisition of services and resources necessary to implement the service plan by
                            representing or defending recipients through direct intervention. (TCM Handbook S-2-17)
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center pl-5">
                        <b>TCM will advocate related and specific services/programs as required by client by target date.</b>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary pl-5">
                    <div className="flex w-full place-items-center text-justify">
                        - TCM will update and gather information about specific service/program opened at community and the interventions will be
                        developed by phone calls, program personal visits and/or using online resources and tools.<br />
                        - Client/Legal Guardian will be educated regarding documentation and follow up during services last.<br />
                        - TCM will be able to advocate related services to accomplish the Objective and Goal; ex: DCF/SSA, Police Services, Bank
                        Statements, OTC, pharmacy services, medication management, transportation, lab test, X-Rays, Legal Services, Social Services,
                        and any other service required during follow up
                    </div>
                </div>
                {/* Objetieve 2 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-t-0 border-primary">
                        <div className="w-1/5 place-items-center pl-5 bg-gray-200">
                            <b>Objective 2</b><br />
                            <i>Task (who will do what)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary pl-5">
                            Linking and facilitating the recipient with appropriate services and resources identified in the
                            service plan through referrals to reach desired goals. (TCM Handbook S-2-17)
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center pl-5">
                        <b>TCM will link the client with any services/programs advocated previously by TCM by target date.</b>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary pl-5">
                    <div className="flex w-full place-items-center text-justify">
                        - TCM will complete linking process by contacting client/service/programs as required by phone calls, personal visits and
                        using Internet resources.<br />
                        - TCM will be able to link the client with any related services/program advocated previously to accomplish the Objective and
                        Goal; ex: DCF/SSA, Police Services, Bank Statements, OTC, pharmacy services, medication management, transportation, lab
                        test, X-Rays, Legal Services, Social Services, and any other service required during follow up.
                    </div>
                </div>
                {/* Objetieve 3 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-t-0 border-primary">
                        <div className="w-1/5 place-items-center pl-5 bg-gray-200">
                            <b>Objective 3</b><br />
                            <i>Task (who will do what)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary pl-5">
                            Coordinating the delivery of services as specified in the service plan with the help of the recipient,
                            the recipient’s family, and the recipient’s natural support system. (TCM Handbook S-2-17)
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center pl-5">
                        <b>TCM will coordinate all required services/programs during entire follow up by target date.</b>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary pl-5">
                    <div className="flex w-full place-items-center text-justify">
                        - TCM will be able to coordinate activities on behalf of the client according to the specific nature of each goal through and
                        not limited to coordination of appointments/interviews/applications/recertification/hearings/meetings/follow ups/discharge, etc.,
                        based on contact by phone calls/personal visit and using internet tool developed in conjunction with the client/Legal
                        Gurdian and specific service/program
                    </div>
                </div>
                {/* Objetieve 4 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-t-0 border-primary">
                        <div className="w-1/5 place-items-center pl-5 bg-gray-200">
                            <b>Objective 4</b><br />
                            <i>Task (who will do what)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary pl-5">
                            Monitoring service delivery to evaluate the recipient’s progress. (TCM Handbook S-2-17)
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center pl-5">
                        <b>TCM will monitor progress, compliance, and ability of the client to be independent to manage each
                            need by self by target date.</b>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary pl-5">
                    <div className="flex w-full place-items-center text-justify">
                        - TCM will be able to develop monitoring of the progress of the client by contacting Client/Programs as required by phone calls,
                        personal visit or using web portals if necessary.<br />
                        - TCM will complete interviews, staffing, meetings, etc., with Client/Legal Guardian/Programs to assess effectiveness of the
                        services received by client and to evaluate compliance of client with the follow up and ability to be functional and
                        independent using community resources.<br />
                        - TCM will count pills with Client/Legal Guardian during home visits if necessary to monitor compliance with medication
                        management.
                    </div>
                </div>
                {/* Objetieve 5 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-t-0 border-primary">
                        <div className="w-1/5 place-items-center pl-5 bg-gray-200">
                            <b>Objective 5</b><br />
                            <i>Task (who will do what)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary pl-5">
                            Documenting mental health targeted case management activities in accordance with the
                            documentation requirements in this chapter. (TCM Handbook S-2-17)
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center pl-5">
                        <b>TCM will complete and save on client’s record all required documentation during follow up by
                            target date.</b>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary pl-5">
                    <div className="flex w-full place-items-center text-justify">
                        - TCM will generate required documentation to comply with follow up and Medicaid Rules by target date.<br />
                        - TCM will be able to develop Assessment/Service Plans/Addendums and Daily Progress Notes to detail the nature of
                        services provided. On Daily Progress Notes TCM will focus on genuine intervention on behalf of the client and related with the
                        goals described on this Service Plan.
                    </div>
                </div>


            </div>
            <br />
            <hr />
            <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                INITIAL SERVICE PLAN
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
                                    Initial SP Development Date: 12/12/2023
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>SECTION IV: LONG TERM GOALS:</b>
                    <br />
                    <i>(Expectations of the individual, where does the individual see himself/herself in the future. It is written in the first person by the individual or family, with help and support from the case manager.)</i>
                </div>

                {/* Goal 1 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                {/* Goal 2 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                {/* Goal 3 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                {/* Goal 4 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                {/* Goal 5 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                {/* Goal 6 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                {/* Goal 7 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                {/* Goal 8 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                {/* Goal 9 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>



                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>SECTION V: SERVICE PLAN SIGNATURES:</b>
                    <br />
                    <i>(Expectations of the individual, where does the individual see himself/herself in the future. It is written in the first person by the individual or family, with help and support from the case manager.)</i>
                </div>

                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-full place-items-center text-justify p-2" style={{ fontSize: "12px" }}>
                            We members of the Case Management Team hereby certified that this client is eligible for case management services, which will be rendered through SUNISS UP The signatures
                            below indicate that the goals and objectives as outlined in the service plan have been developed in partnership with the client/and or legal guardian and are valid for a period of 6 months. This
                            Initial Service Plan will be reviewed by:
                            <InputText
                                type="text"
                                name='fullname'
                                placeholder=""
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost h-6 text-center"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="w-full place-items-center text-center">
                        <b>We the undersigned have reviewed and received a copy of the service plan and agree with the goals and objectives as written.</b>
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary">
                    <div className="w-2/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-2/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-2/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Client or Legal Guardian’s Signature
                    </div>
                    <div className="w-2/5 border-r-2 border-primary place-items-center text-center">
                        Print Name
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Date
                    </div>
                </div>

                <div className="flex w-full border-2 border-t-0 border-primary">
                    <div className="w-2/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-2/5 border-r-2 border-primary place-items-center text-justify">
                        <div className='w-full flex'>
                            <InputText
                                type="text"
                                name='fullname'
                                placeholder=""
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-3/4 text-center"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            <InputText
                                type="text"
                                name='fullname'
                                placeholder=""
                                value="CBHCM"
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-1/4 text-center"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        </div>
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-2/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Case Manager Signature
                    </div>
                    <div className="w-2/5 border-r-2 border-primary place-items-center text-center">
                        Print Name and Credentials
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Date
                    </div>
                </div>

                <div className="flex w-full border-2 border-t-0 border-primary">
                    <div className="w-2/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-2/5 border-r-2 border-primary place-items-center text-justify">
                        <div className='w-full flex'>
                            <InputText
                                type="text"
                                name='fullname'
                                placeholder=""
                                value=""
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-3/4 text-center"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            <InputText
                                type="text"
                                name='fullname'
                                placeholder=""
                                value="CBHCM"
                                // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                className="input input-ghost w-1/4 text-center"
                                style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        </div>
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-2/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Case Manager Supervisor Signature
                    </div>
                    <div className="w-2/5 border-r-2 border-primary place-items-center text-center">
                        Print Name and Credentials
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Date
                    </div>
                </div>




            </div>



            <br />
            <hr />
            <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                INITIAL SERVICE PLAN/ADDENDUMS SECTION
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
                                    Initial SP Development Date: 12/12/2023
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className='place-items-center text-center m-5'>
                    <b className='border-b-2 border-primary'>SECTION VI: ADDENDUMS LONG TERM GOALS:</b>
                    <br />
                    <i>(Expectations of the individual, where does the individual see himself/herself in the future. It is written in the first person by the individual or family, with help and support from the case manager.)</i>
                </div>

                {/* Goal 1 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                {/* Goal 2 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                {/* Goal 3 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                {/* Goal 4 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                {/* Goal 5 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
                {/* Goal 6 */}
                <div className="flex w-full">
                    <div className="flex w-full border-2 border-primary">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Identified Service Need</b><br />
                            <i>(from Section II/Use client words)</i>
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <InputTextarea
                                // value={personalInformation.details_questions_in_yes}
                                // onChange={(e) => handleChangeFormValues("details_questions_in_yes", e.target.value)}
                                rows={2}
                                className='w-full'
                                style={{ backgroundColor: "#e5ecfc", borderColor: "#fff", border: 0, borderRadius: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:flex lg:md:flex w-full border-2 border-t-0 border-primary">
                    <div className="flex w-full place-items-center">
                        <div className="w-1/5 place-items-center pl-5">
                            <b>Long Term Goal:</b><br />
                        </div>
                        <div className="w-4/5 border-l-2 border-primary">
                            <div className="flex w-full">
                                <div className="flex w-1/6">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
                                        value=""
                                        // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                                        className="input input-ghost w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                </div>
                                <div className="flex w-5/6 border-l-2 border-primary">
                                    <InputText
                                        type="text"
                                        name='fullname'
                                        placeholder=""
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
                <div className="flex w-full border-2 border-t-0 border-primary bg-gray-200">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-center pl-5">
                        Responsible Individuals/Providers
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-center">
                        Start Date
                    </div>
                    <div className="w-1/5 place-items-center text-center">
                        Target Date
                    </div>
                </div>
                <div className="flex w-full border-2 border-t-0 border-primary mb-5">
                    <div className="w-3/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 border-r-2 border-primary place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                    <div className="w-1/5 place-items-center text-justify">
                        <InputText
                            type="text"
                            name='fullname'
                            placeholder=""
                            value=""
                            // onChange={(e) => handleChangeFormValues("fullName", e.target.value)}
                            className="input input-ghost w-full text-center"
                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                            onFocus={(e) => e.currentTarget.select()}
                        />
                    </div>
                </div>
            </div>



            <br />
            <ScrollTop target="parent" />
        </div>
    );

}
type Props = {
    relad(): void;
    clientInfo;
}
export { Sp };