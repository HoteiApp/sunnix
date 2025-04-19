import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";

import { FormEditMedical, ServiceCM } from "../../../models";


const MedicalInformations = ({ onChangeFormRequestEditMedical, scm, data }: Props) => {    
    return (
        <div className="w-full p-0">
            <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                    <div className='text-2xl tracking-tight place-items-center'>Medical Information</div>
                </div>
                <div className="flex flex-wrap m-0 p-0">
                    <div className="md:flex lg:flex w-full">
                        <div className="border-b border-primary md:flex lg:flex w-full">
                            <div className="flex flex-wrap w-full place-items-center">
                                <div className="flex md:w-1/3 lg:w-1/3 border-r p-1 border-primary place-items-center">
                                    <div className="flex w-full place-items-center p-0 m-0">
                                        <div className="grid w-2/4 pl-4">
                                            PCP:
                                        </div>
                                        <div className="grid w-full">
                                            <div className="p-inputgroup flex-1">
                                                <InputText
                                                    type="text"
                                                    name='medical_pcp'
                                                    placeholder="Type PCP"
                                                    value={data?.medical_pcp}
                                                    onChange={(e) => onChangeFormRequestEditMedical("medical_pcp", e.target.value)}
                                                    className="input input-ghost w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                    onFocus={(e) => e.currentTarget.select()}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full md:w-1/3 lg:w-1/3 border-r border-primary p-1 place-items-center">
                                    <div className="flex w-full place-items-center p-0 m-0">
                                        <div className="grid w-2/4 pl-4">
                                            Address:
                                        </div>
                                        <div className="grid w-full">
                                            <div className="p-inputgroup flex-1">
                                                <InputText
                                                    type="text"
                                                    placeholder="Type Address PCP"
                                                    value={data?.medical_pcp_address}
                                                    onChange={(e) => onChangeFormRequestEditMedical("medical_pcp_address", e.target.value ?? "")}
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex  md:w-1/3 lg:w-1/3 p-1 border-primary place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">
                                            <div className="pl-4 grid w-2/4">
                                                Phone:
                                            </div>

                                            <div className="grid w-full">
                                                <div className="p-inputgroup flex-1">
                                                    <InputMask
                                                        id="HomePhone"
                                                        mask="(999) 999-9999"
                                                        placeholder="Type Number"
                                                        value={data?.medical_pcp_phone}
                                                        onChange={(e) => onChangeFormRequestEditMedical("medical_pcp_phone", e.target.value ?? "")}
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

                    <div className="md:flex lg:flex w-full">
                        <div className="w-full border-b border-primary">
                            
                            <div className="flex flex-wrap md:flex lg:flex w-full place-items-center">


                                <div className="flex md:w-1/3 lg:w-1/3 border-r p-1 border-primary place-items-center">
                                    <div className="flex w-full place-items-center p-0 m-0">
                                        <div className="grid w-2/4 pl-4">
                                            Psychiatrist:
                                        </div>
                                        <div className="grid w-full">
                                            <div className="p-inputgroup flex-1">
                                                <InputText
                                                    type="text"
                                                    name='lenguage'
                                                    placeholder="Type PSYCHIATRISY"
                                                    value={data?.medical_psychiatrisy}
                                                    onChange={(e) => onChangeFormRequestEditMedical("medical_psychiatrisy", e.target.value)}
                                                    className="input input-ghost w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                                    onFocus={(e) => e.currentTarget.select()}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex md:w-1/3 lg:w-1/3 border-r border-primary p-1 place-items-center">
                                    <div className="flex w-full place-items-center p-0 m-0">
                                        <div className="grid w-2/4 pl-4">
                                            Address:
                                        </div>
                                        <div className="grid w-full">
                                            <div className="p-inputgroup flex-1">
                                                <InputText
                                                    type="text"
                                                    placeholder="Type Address"
                                                    value={data?.medical_psychiatrisy_address}
                                                    onChange={(e) => onChangeFormRequestEditMedical("medical_psychiatrisy_address", e.target.value ?? "")}
                                                    className="input input-ghost border-0 w-full text-center"
                                                    style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div> 

                                <div className="flex md:w-1/3 lg:w-1/3 p-1 border-primary place-items-center">
                                    <div className="flex w-full place-items-center">
                                        <div className="pl-4 flex w-full place-items-center">
                                            <div className="grid w-2/4">
                                                Phone:
                                            </div>

                                            <div className="grid w-full">
                                                <div className="p-inputgroup flex-1">
                                                    <InputMask
                                                        id="HomePhone"
                                                        mask="(999) 999-9999"
                                                        placeholder="Type Number"
                                                        value={data?.medical_psychiatrisy_phone}
                                                        onChange={(e) => onChangeFormRequestEditMedical("medical_psychiatrisy_phone", e.target.value ?? "")}
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
    );
};

type Props = {
    onChangeFormRequestEditMedical: <T extends string | number | boolean>(
        name: keyof FormEditMedical,
        value: T
      ) => void;
    scm?: ServiceCM;
    data?: FormEditMedical;
}

export { MedicalInformations };

