import { useState } from 'react';
import { ScrollTop } from 'primereact/scrolltop';

import { Checkbox } from 'antd';
import { CalculateAge } from '../../../../commons';
const Certification = ({ clientInfo, relad }: Props) => {

    const [radio1, setRadio1] = useState('');
    const [radio2, setRadio2] = useState('');


    return (
        <div className="w-full p-0" style={{ height: '80vh', 'overflow': 'auto' }}>

            <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                APPENDIX J
            </div>
            <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                {CalculateAge({ dob: clientInfo.dob }) >= 18 ? "ADULT" : "CHILDREN"} CERTIFICATION
            </div>
            <div className='place-items-center text-center mb-2' style={{ fontSize: "24px" }}>
                {CalculateAge({ dob: clientInfo.dob }) >= 18 ? "ADULT" : "CHILDREN"} MENTAL HEALTH TARGETED CASE MANAGEMENT
            </div>

            <div className="m-0 p-0">
                {/* row 1 */}
                <div className="md:flex lg:flex w-full">
                    <div className="md:flex lg:md:flex w-full border-2 border-primary">
                        <div className="flex w-full md:w-3/5 lg:w-3/5 border-b-2  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                            <div className="grid flex-grow w-full pl-5">
                                Recipient's Name: {clientInfo?.first_name} {clientInfo?.last_name}

                            </div>
                        </div>
                        <div className="w-full md:w-1/5 lg:w-1/5 border-b-2  border-primary md:border-b-0 lg:border-b-0">
                            <div className="flex w-full place-items-center">
                                <div className="grid flex-grow w-full pl-5 md:border-l-2 lg:border-l-2 border-primary">
                                    Medicaid ID #: {clientInfo?.medicaid}
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/5 lg:w-1/5 place-items-center">
                            <div className="grid flex-grow w-full pl-5 md:border-l-2 lg:border-l-2 border-primary">
                                MR #: {clientInfo?.ID}
                            </div>
                        </div>
                    </div>

                </div>
                {/* row 2 */}
                <div className="mt-5 mb-5 p-0">
                    <div className='text-justify'>
                        Is hereby certified as meeting all of the following adult mental health targeted case management criteria.
                        <br /><br />
                        <div className="flex w-full place-items-center">
                            <Checkbox
                                className='mr-2'
                                checked={true}
                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                            />
                            1. Is enrolled in a Department of Children and Families adult mental health target population
                        </div>
                        <br />
                        <div className="flex w-full place-items-center">
                            <Checkbox
                                className='mr-2'
                                checked={true}
                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                            />
                            2. Has a mental health disability (i.e., severe and persistent mental illness) which requires advocacy
                            for and coordination of services to maintain or improve level of functioning;
                        </div>
                        <br />
                        <div className="flex w-full place-items-center">
                            <Checkbox
                                className='mr-2'
                                checked={true}
                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                            />
                            3. Requires services to assist in attaining self sufficiency and satisfaction in the living, learning, work
                            and social environments of choice;
                        </div>
                        <br />
                        <div className="flex w-full place-items-center">
                            <Checkbox
                                className='mr-2'
                                checked={true}
                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                            />
                            4. Lacks a natural support system with the ability to access needed medical, social, educational and
                            other services;
                        </div>
                        <br />
                        <div className="flex w-full place-items-center">
                            <Checkbox
                                className='mr-2'
                                checked={true}
                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                            />
                            5. Requires ongoing assistance to access or maintain needed care consistently within the service
                            delivery system;
                        </div>
                        <br />
                        <div className="flex w-full place-items-center">
                            <Checkbox
                                className='mr-2'
                                checked={true}
                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                            />
                            6. Has a mental health disability (i.e., severe and persistent mental illness) duration that, based upon
                            professional judgment, will last for a minimum of one year;
                        </div>
                        <br />
                        {CalculateAge({ dob: clientInfo.dob }) >= 18 ? (
                            <div>
                                <div className="flex w-full place-items-center">
                                    <Checkbox
                                        className='mr-2'
                                        checked={true}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    7. Is not receiving duplicate case management services from another provider;
                                </div>
                                <br />
                                <div className="flex w-full place-items-center">
                                    <Checkbox
                                        className='mr-2'
                                        checked={true}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    8. Meets at least one of the following requirements (check all that apply):
                                </div>
                                <div className='pl-12'>
                                    a. Is awaiting admission to or has been discharged from a state mental health treatment
                                    facility;
                                    <br />
                                    b. Has been discharged from a mental health residential treatment facility;
                                    <br />
                                    c. Has had more than one admission to a crisis stabilization unit (CSU), short-term
                                    residential facility (SRT), inpatient psychiatric unit, or any combination of these
                                    facilities in the past 12 months;
                                    <br />
                                    d. Is at risk of institutionalization for mental health reasons (provide explanation);
                                </div>
                                <br />
                                <div className="flex w-full place-items-center pl-5">
                                    <Checkbox
                                        className='mr-2'
                                        checked={true}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    e. Is experiencing long-term or acute episodes of mental impairment that may put him or
                                    her at risk of requiring more intensive services (provide explanation); or
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex w-full place-items-center">
                                    <Checkbox
                                        className='mr-2'
                                        checked={true}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    7. Is in out-of-home mental health placement or at documented risk of out-of-home mental health
                                    placement; and
                                </div>
                                <br />
                                <div className="flex w-full place-items-center">
                                    <Checkbox
                                        className='mr-2'
                                        checked={true}
                                    // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                                    />
                                    8. Is not receiving duplicate case management services from another provider; or
                                </div>
                            </div>
                        )}

                        <br />
                        <div className="flex w-full place-items-center">
                            <Checkbox
                                className='mr-2'
                                checked={true}
                            // onChange={(e: CheckboxChangeEvent) => handleChangeFormRequestnewClient("other", e.target.value ?? false)}
                            />
                            9. Has relocated from a Department of Children and Families district or region where he or she was
                            receiving mental health targeted case management services.
                        </div>
                        <br />
                        <div className="flex w-full mt-5">
                            <div className="w-2/5 text-center place-items-center">
                                name
                            </div>
                            <div className="w-1/5 text-center ml-5 place-items-center">
                                CBHCM
                            </div>
                            <div className="w-1/5">

                            </div>
                            <div className="w-1/5 place-items-center">
                                <div className='text-center'>
                                    2121
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <div className="w-2/5 text-center place-items-center border-t-2 border-primary">
                                Case Manager
                            </div>
                            <div className="w-1/5 text-center place-items-center ml-5  border-t-2 border-primary">

                            </div>
                            <div className="w-1/5">

                            </div>
                            <div className="w-1/5 place-items-center border-t-2 border-primary">
                                <div className='text-center'>
                                    Date
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="flex w-full mt-5">
                            <div className="w-2/5 text-center place-items-center">
                                name
                            </div>
                            <div className="w-1/5 text-center ml-5 place-items-center">
                                CBHCMS
                            </div>
                            <div className="w-1/5">

                            </div>
                            <div className="w-1/5 place-items-center">
                                <div className='text-center'>
                                    2121
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <div className="w-2/5 text-center place-items-center border-t-2 border-primary">
                                Case Manager Supervisor
                            </div>
                            <div className="w-1/5 text-center place-items-center ml-5  border-t-2 border-primary">

                            </div>
                            <div className="w-1/5">

                            </div>
                            <div className="w-1/5 place-items-center border-t-2 border-primary">
                                <div className='text-center'>
                                    Date
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
export { Certification };