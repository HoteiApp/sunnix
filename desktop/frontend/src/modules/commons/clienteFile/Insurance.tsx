import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { classNames } from "primereact/utils";
import { FormRequestEditClient, ServiceCM } from "../../../models";


const InsuranceInformation = ({ onChangeFormrequestEditClient, scm }: Props) => {
    return (
        <div className="w-full p-0">
            <div className='p-3' style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                <div className='text-2xl tracking-tight place-items-center'>Insurance Information</div>
            </div>

            <div className="flex-wrap md:flex lg:flex w-full">

                <div className="flex-wrap md:flex lg:flex w-full">


                    <div className="flex w-full md:w-1/3 lg:w-1/3 md:border-r lg:border-r border-r border-b p-1 border-primary place-items-center">
                        <div className="flex lg:flex md:flex w-full place-items-center p-0 m-0">

                            <div className="grid w-2/4 pl-4">
                                *Medicaid:
                            </div>


                            <div className="grid w-full">
                                <div className="p-inputgroup flex-1">
                                    <InputMask
                                        id="medicaid"
                                        value={scm?.Demografic.medicaid}
                                        onChange={(e: InputMaskChangeEvent) => onChangeFormrequestEditClient("medicalid", e.target.value ?? "")}
                                        mask="9999999999"
                                        placeholder="Type number"
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex w-full md:w-1/3 lg:w-1/3 border-r border-b border-primary p-1 place-items-center">
                        <div className="flex lg:flex md:flex w-full place-items-center p-0 m-0">
                            <div className="flex w-full place-items-center">
                                <div className="grid w-2/4 pl-4">
                                    *Gold Card Number:
                                </div>
                                <div className="grid w-full">
                                    <div className="p-inputgroup flex-1">
                                        <InputMask
                                            id="gold"
                                            value={scm?.Demografic.gold_card_number}
                                            onChange={(e: InputMaskChangeEvent) => onChangeFormrequestEditClient("gold_card_number", e.target.value ?? "")}
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


                    <div className="flex w-full md:w-1/3 lg:w-1/3 border-b p-1 border-primary place-items-center">
                        <div className="flex w-full place-items-center p-0 m-0">

                            <div className="grid w-2/4 pl-4">
                                Medicare:
                            </div>

                            <div className="grid w-full">
                                <div className="p-inputgroup flex-1">
                                    <InputMask
                                        id="medicare"
                                        value={scm?.Demografic.medicare}
                                        onChange={(e: InputMaskChangeEvent) => onChangeFormrequestEditClient("medicare", e.target.value ?? "")}
                                        mask="***********"
                                        placeholder="Type number"
                                        className="input input-ghost border-0 w-full text-center"
                                        style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --------------------------- */}
                <div className="w-full ">
                    <div className="w-full flex" style={{ backgroundColor: "#3f5b9e", color: "#ffffff" }}>
                        <div className="w-1/6 pt-3 pb-3 border-black border-r text-center">Insurance Plan Name</div>
                        <div className="w-1/6 pt-3 pb-3 border-black border-r text-center">Insurance Plan ID</div>
                        <div className="w-1/6 pt-3 pb-3 border-black border-r text-center">Start Date</div>
                        <div className="w-1/6 pt-3 pb-3 border-black border-r text-center">End Date</div>
                        <div className="w-1/6 pt-3 pb-3 border-black border-r text-center">Units</div>
                        <div className="w-1/6 pt-3 pb-3 text-center">Active</div>
                    </div>
                    {(scm?.sure.length || 0) > 0 ? (
                        scm?.sure.map((insurance) => {
                            return (
                                <div className="w-full flex border-t border-black items-center">
                                    <div className="w-1/6 border-black border-r text-center">

                                        <input
                                            type="text"
                                            value={insurance.plan_name}
                                            className="input input-ghost border-0 w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0 }}
                                        />

                                    </div>
                                    <div className="w-1/6 border-black border-r text-center">
                                        <InputMask
                                            id="gold"
                                            // BUG: Arreglar aqui llega un array
                                            value={insurance.plan_id}
                                            // onChange={(e: InputMaskChangeEvent) => onChangeFormRequestEditSure("plan_id", e.target.value ?? "")}
                                            mask="99999"
                                            placeholder="Type number"
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                        />
                                    </div>
                                    <div className="w-1/6 border-black border-r text-center">
                                        <input
                                            id="start_date"
                                            placeholder="Start Date"
                                            value={insurance.auth_date_start}
                                            className="input input-ghost border-0 w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                        />
                                    </div>
                                    <div className="w-1/6 border-black border-r text-center">
                                        <input
                                            id="end_date"
                                            placeholder="End Date"
                                            value={insurance.auth_date_end}
                                            className="input input-ghost border-0 w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                        />
                                    </div>
                                    <div className="w-1/6 border-black border-r text-center">
                                        <input
                                            id="units"
                                            value={insurance.unit}
                                            placeholder="Type number"
                                            className="input input-ghost w-full text-center"
                                            style={{ backgroundColor: "#e5ecfc", border: 0, borderRadius: 0 }}
                                        />
                                    </div>
                                    <div className="w-1/6 text-center flex">
                                        <div className="w-full">
                                            <i className={classNames(
                                                "pi mr-2 hover:text-secondary",
                                                insurance.active ? "pi-check-circle text-green-400" : "pi-times-circle text-red-500"
                                            )}></i>
                                        </div>
                                    </div>
                                </div>

                            );
                        })
                    ) : (
                        <div className="w-full text-center">
                            <b className="text-center">Not insurance insert</b>
                        </div>
                    )}

                </div>



            </div>

        </div>
    );
};

type Props = {
    onChangeFormrequestEditClient: <T extends string | number | boolean>(name: keyof FormRequestEditClient, value: T) => void;
    scm?: ServiceCM;
}

export { InsuranceInformation };

