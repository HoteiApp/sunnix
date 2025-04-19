import { InputText } from "primereact/inputtext";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { classNames } from "primereact/utils";
import { Demografic } from "../../../models";
import { CalculateAge } from "../../commons";
import { Block } from '../../commons/component/block';

const DemograficView = ({ demografic }: Props) => {
    const age = CalculateAge({ dob: demografic?.dob ?? "00/00/0000" });
    return (
        <Block
            active={true}
            copy
        >
            <div className="border-primary border border-b-0">
                <div className="m-0 p-0">
                    {/* row 1 */}
                    <div className="md:flex lg:flex w-full">
                        <div className="flex w-full md:w-2/4 lg:w-2/4 border-b border-primary place-items-center">
                            <div className="grid flex-grow w-1/4 pl-5">Last Name:</div>
                            <div className="grid  md:border-r lg:border-r border-primary w-3/4 p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    {demografic?.last_name}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/4 lg:w-2/4 border-b border-primary">
                            <div className="flex w-full place-items-center">
                                <div className="flex border-r border-primary w-2/4 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">
                                        <div className="grid w-2/4 pl-4">First Name:</div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                                {demografic?.first_name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-2/4 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-2/5">DOB:</div>
                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    {demografic?.dob}
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
                        <div className="md:flex lg:md:flex w-full border-b border-primary">
                            <div className="flex w-full md:w-2/4 lg:w-2/4 border-b  border-primary md:border-b-0 lg:border-b-0 place-items-center">
                                <div className="flex w-full place-items-center">
                                    <div className="flex border-r border-primary w-2/4 p-1">
                                        <div className="flex w-full place-items-center p-0 m-0">
                                            <div className="grid w-2/4 pl-4">Age:</div>
                                            <div className="grid w-2/4">
                                                <div className="p-inputgroup flex-1">
                                                    {age.toString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex md:border-r lg:border-r border-primary w-2/4 p-1">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid w-2/4 pl-1">SS #:</div>
                                                <div className="grid w-3/4">
                                                    {demografic?.ss}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full md:w-2/4 lg:w-2/4 place-items-center">
                                <div className="flex w-full place-items-center">
                                    <div className="flex border-r border-primary w-2/4 p-1">
                                        <div className="flex w-full place-items-center p-0 m-0">
                                            <div className="grid w-2/4 pl-4">Sex:</div>
                                            <div className="grid w-2/4">
                                                <div className="p-inputgroup flex-1">
                                                    {demografic?.sexo ?? "Female"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-2/4 p-1">
                                        <div className="flex w-full place-items-center">
                                            <div className="flex w-full place-items-center">
                                                <div className="grid w-2/5">Race:</div>
                                                <div className="grid w-3/5">
                                                    <div className="p-inputgroup flex-1">
                                                        {demografic?.race ?? "white"}
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
                        <div className="flex w-full md:w-2/4 lg:w-2/4 border-b border-primary place-items-center">
                            <div className="grid flex-grow w-2/4 pl-5">Address:</div>
                            <div className="grid  md:border-r lg:border-r border-primary w-full p-1 pl-0">
                                <div className="p-inputgroup flex-1">
                                    {demografic?.address}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/4 lg:w-2/4 border-b border-primary">
                            <div className="flex w-full place-items-center">
                                <div className="flex border-r border-primary w-2/4 p-1">
                                    <div className="flex w-full place-items-center p-0 m-0">
                                        <div className="grid w-2/4 pl-4">City/State:</div>

                                        <div className="grid w-2/4">
                                            <div className="p-inputgroup flex-1">
                                               {demografic?.state}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-2/4 p-1">
                                    <div className="flex w-full place-items-center">
                                        <div className="flex w-full place-items-center">
                                            <div className="grid w-2/5">Zip Code:</div>
                                            <div className="grid w-3/5">
                                                <div className="p-inputgroup flex-1">
                                                    {demografic?.zip_code}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* row 4 */}
                    <div className="md:flex lg:flex w-full border-b-1 border-primary place-items-center">
                        <div className="flex w-full md:w-2/4 lg:w-2/4 border-b place-items-center lg:border-r md:border-r border-primary p-1">
                            <div className="flex w-full place-items-center p-0 m-0">
                                <div className="flex w-2/4 pl-4 ">Phone:</div>
                                <div className="flex w-4/5">
                                    <div className="p-inputgroup flex-1">
                                        {demografic?.phone}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full md:w-2/4 lg:w-2/4 border-b place-items-center lg:border-r md:border-r border-primary p-1">
                            <div className="flex w-full place-items-center p-0 m-0">
                                <div className="grid w-2/4 pl-4">School/Work:</div>
                                <div className="grid w-4/5">
                                    <div className="p-inputgroup flex-1">
                                        {demografic?.school}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full md:w-2/4 lg:w-2/4 border-b place-items-center border-primary p-1">
                            <div className="flex w-full place-items-center">
                                <div className="flex w-full place-items-center">
                                    <div className="grid w-2/5 pl-4">Language:</div>

                                    <div className="grid w-3/5">
                                        <div className="p-inputgroup flex-1">
                                            {demografic?.lenguage}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* row 5 */}
                    <div className="md:flex lg:flex w-full  border-primary place-items-center">
                        <div className="flex w-full md:w-2/4 lg:w-2/4 border-b lg:border-r md:border-r place-items-center border-primary p-1">
                            <div className="flex w-full place-items-center">
                                <div className="flex w-full place-items-center m-0 border-primary">
                                    <div className="flex w-2/5 pl-4">Legal Guardian:</div>
                                    <div className="grid w-3/5">
                                        <div className="p-inputgroup flex-1">
                                            {demografic?.legal_guardian}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full md:w-2/4 lg:w-2/4 border-b lg:border-r md:border-r place-items-center border-r border-primary p-1">
                            <div className="flex w-full place-items-center p-0 m-0">
                                <div className="grid w-2/4 pl-4">Relationship:</div>
                                <div className="grid w-3/4">
                                    <div className="p-inputgroup flex-1">
                                        {demografic?.relationship}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full md:w-2/4 lg:w-2/4 border-b place-items-center border-primary p-1">
                            <div className="flex w-full place-items-center">
                                <div className="flex w-full place-items-center">
                                    <div className="grid w-2/5 pl-4">Phone:</div>

                                    <div className="grid w-3/5">
                                        <div className="p-inputgroup flex-1">
                                            {demografic?.cell_phone_guardian}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Block>
    );
};

type Props = {
    demografic?: Demografic;
}

export { DemograficView };

